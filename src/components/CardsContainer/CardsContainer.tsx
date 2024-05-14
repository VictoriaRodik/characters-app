import React, { useState, useCallback } from 'react';
import Card from '../Card/Card';
import FilterSortBar from '../FilterSortBar/FilterSortBAr';
import { useQuery } from '@tanstack/react-query';
import { fetchCharacters } from '../../api';

const CardsContainer: React.FC = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['characters'],
        queryFn: fetchCharacters,
        staleTime: Infinity,
    });

    const [filter, setFilter] = useState('');
    const [sortBy, setSortBy] = useState('');

    const handleFilterChange = useCallback((newFilter: string) => {
        setFilter(newFilter);
    }, []);

    const handleSortChange = useCallback((newSortBy: string) => {
        setSortBy(newSortBy);
    }, []);

    if (isLoading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center">Error: {error.message}</div>;
    }

    if (!data) {
        return <div className="text-center">No characters</div>;
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
            <FilterSortBar
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
            />

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 bg-slate-800 w-full p-8 md:p-12">
                {filteredData.map((character) => (
                    <Card key={character.id} character={character} />
                ))}
            </div>
        </>
    );
};

export default CardsContainer;
