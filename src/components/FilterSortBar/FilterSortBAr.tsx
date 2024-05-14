import React, { useState, ChangeEvent } from 'react';

interface FilterSortBarProps {
	onFilterChange: (filterValue: string) => void;
	onSortChange: (sortByValue: string) => void;
}

const FilterSortBar: React.FC<FilterSortBarProps> = ({
	onFilterChange,
	onSortChange,
}) => {
	const [filter, setFilter] = useState('');
	const [sortBy, setSortBy] = useState('');

	const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newFilter = e.target.value;
		setFilter(newFilter);
		onFilterChange(newFilter);
	};

	const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const newSortBy = e.target.value;
		setSortBy(newSortBy);
		onSortChange(newSortBy);
	};

	return (
		<div className="flex flex-wrap justify-center md:justify-end gap-4 m-8">
			<input
				type="text"
				placeholder="Filter by name..."
				value={filter}
				name="filter"
				onChange={handleFilterChange}
			/>

			<select value={sortBy} onChange={handleSortChange} name="sortBy">
				<option value="initial">Sorting</option>
				<option value="name">Sort by Name</option>
				<option value="status">Sort by Status</option>
				<option value="gender">Sort by Gender</option>
			</select>
		</div>
	);
};

export default FilterSortBar;
