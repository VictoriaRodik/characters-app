import React, { useState, useCallback } from 'react';
import Card from '../Card/Card';
import FilterSortBar from '../FilterSortBar/FilterSortBar';
import PaginationButtons from '../PaginationButtons/PaginationButtons';
import { useQuery } from '@tanstack/react-query';
import { fetchCharacters } from '../../api';

const CardsContainer: React.FC = () => {
	const [filter, setFilter] = useState('');
	const [sortBy, setSortBy] = useState('');
	const [page, setPage] = useState(1);

	const { data, isLoading, error } = useQuery({
		queryKey: ['characters', page],
		queryFn: () => fetchCharacters(page),
		staleTime: Infinity,
	});

	const styledText = 'text-center font-bold text-7xl text-slate-800 mt-20 mb-20';

	const handleFilterChange = useCallback((newFilter: string) => {
		setFilter(newFilter);
	}, []);

	const handleSortChange = useCallback((newSortBy: string) => {
		setSortBy(newSortBy);
	}, []);

	const handleNextPage = () => {
		setPage((prevPage) => prevPage + 1);
	};

	const handlePrevPage = () => {
		setPage((prevPage) => Math.max(prevPage - 1, 1));
	};

	if (isLoading) {
		return <div className={styledText}>Loading...</div>;
	}

	if (error) {
		return <div className={styledText}>Error: {error.message}</div>;
	}

	if (!data) {
		return <div className={styledText}>No characters</div>;
	}

	let filteredData = data;
	if (filter) {
		filteredData = data.filter((character) =>
			character.name.toLowerCase().includes(filter.toLowerCase())
		);
	}

	switch (sortBy) {
		case 'status':
			filteredData.sort((a, b) => a.status.localeCompare(b.status));
			break;
		case 'name':
			filteredData.sort((a, b) => a.name.localeCompare(b.name));
			break;
		case 'gender':
			filteredData.sort((a, b) => a.gender.localeCompare(b.gender));
			break;
		case 'initial':
			filteredData.sort((a, b) => a.id - b.id);
			break;
		default:
			break;
	}

	return (
		<>
			<div className={styledText}>Rick and Morty</div>
			<FilterSortBar
				onFilterChange={handleFilterChange}
				onSortChange={handleSortChange}
			/>

			<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 bg-slate-800 w-full p-8 md:p-12">
				{filteredData.map((character) => (
					<Card key={character.id} character={character} />
				))}
			</div>
			<PaginationButtons
				onNextPage={handleNextPage}
				onPrevPage={handlePrevPage}
				isPrevDisabled={page === 1}
			/>
		</>
	);
};

export default CardsContainer;
