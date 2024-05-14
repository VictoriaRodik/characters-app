import React, { useEffect } from 'react';
import { Character } from '../../entities/Character';

interface Props {
    character: Character;
    onClose: () => void;
}

const Modal: React.FC<Props> = ({ character, onClose }) => {
    const handleClickOutside = (event: MouseEvent) => {
        const modalElement = event.target as HTMLElement;
        if (!modalElement.closest('.modal-content')) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="modal-content bg-gradient-to-r from-zinc-600 to-sky-900 opacity-90 text-white rounded-lg p-12 z-10">
                <p>Episodes: {character.episode.length}</p>
                <p>
                    Origin:
                    <a href={character.origin.url} className="ml-1 text-blue-300">
                        {character.origin.name}
                    </a>
                </p>
                <p>
                    Location:
                    <a href={character.location.url} className="ml-1 text-blue-300">
                        {character.location.name}
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Modal;
