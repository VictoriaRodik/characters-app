import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { Character } from '../../entities/Character';

interface Props {
	character: Character;
}

const Card: React.FC<Props> = ({ character }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	return (
		<>
			<div
				onClick={toggleModal}
				className="relative flex flex-wrap items-center bg-gradient-to-r from-zinc-700 to-sky-900 text-white rounded-lg md:min-w-96 md:max-h-80"
			>
				<img
					src={character.image}
					alt={character.name}
					className="w-full object-cover rounded-t-lg md:w-1/2 md:rounded-l-lg md:h-full"
				/>
				<div className="p-4 w-full md:w-1/2">
					<p>
						<a href={character.url} className="text-lg font-semibold">
							{character.name}
						</a>
					</p>
					<p>Gender: {character.gender}</p>
					<p>Status: {character.status}</p>
					<p>Type: {character.type}</p>
					<p>Species: {character.species}</p>
				</div>
			</div>
			{isModalOpen && (
				<>
					<div
						className="fixed inset-0 bg-black opacity-50 z-40"
						onClick={toggleModal}
					></div>
					<Modal character={character} onClose={toggleModal} />
				</>
			)}
		</>
	);
};

export default Card;
