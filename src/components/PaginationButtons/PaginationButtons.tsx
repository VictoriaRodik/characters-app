import React from 'react';

interface PaginationButtonsProps {
    onNextPage: () => void;
    onPrevPage: () => void;
    isPrevDisabled: boolean;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
    onNextPage,
    onPrevPage,
    isPrevDisabled,
}) => {
    return (
        <div className="flex justify-center mt-4">
            <button
                onClick={onPrevPage}
                disabled={isPrevDisabled}
                className="bg-slate-800 hover:bg-sky-700 text-white font-bold py-2 px-4 m-2 rounded w-28"
            >
                Previous
            </button>
            <button
                onClick={onNextPage}
                className="bg-slate-800 hover:bg-sky-700 text-white font-bold py-2 px-4 m-2 rounded w-28"
            >
                Next
            </button>
        </div>
    );
};

export default PaginationButtons;
