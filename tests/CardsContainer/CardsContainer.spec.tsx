import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import CardsContainer from '../../src/components/CardsContainer/CardsContainer';
import { useQuery } from '@tanstack/react-query';

const mockedData = [
	{
		id: 1,
		name: 'Rick Sanchez',
		image: 'rick.png',
		url: 'https://example.com/rick',
		gender: 'Male',
		status: 'Alive',
		type: 'Human',
		species: 'Human',
		origin: { name: 'Origin', url: '' },
		location: { name: 'Location', url: '' },
		episode: [''],
		created: new Date(Date.now()),
	},
];

vi.mock('@tanstack/react-query', () => ({
	useQuery: () => ({
		data: mockedData,
		isLoading: false,
		error: null,
	}),
}));

vi.mock('../../src/components/Card/Card', () => ({
	__esModule: true,
	default: function Card({ character }) {
		return (
			<div data-testid="card" onClick={() => {}}>
				<p>{character.name}</p>
                <p>{character.status}</p>
			</div>
		);
	},
}));


describe('CardsContainer Component', () => {
	beforeEach(() => {
		render(<CardsContainer />);
	});

	//   it('should render loading text while data is loading', () => {
	//     useQuery.mockReturnValueOnce({
	//       isLoading: true,
	//     });

	//     expect(screen.getByText('Loading...')).toBeInTheDocument();
	//   });

	//   it('renders error message if there is an error', () => {
	//     useQuery.mockReturnValueOnce({
	//       error: { message: 'Failed to fetch data' },
	//     });

	//     expect(screen.getByText('Error: Failed to fetch data')).toBeInTheDocument();
	//   });

	it('renders characters correctly', () => {
		expect(screen.getByText('Rick and Morty')).toBeInTheDocument();
		expect(screen.getAllByTestId('card')).toHaveLength(mockedData.length);
	});

	it('filters characters correctly', () => {
		fireEvent.change(screen.getByPlaceholderText('Filter by name'), {
			target: { value: 'Rick' },
		});
		expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
		expect(screen.queryByText('Location')).not.toBeInTheDocument();
	});

	it('sorts characters correctly', () => {
		fireEvent.change(screen.getByRole('combobox'), {
			target: { value: 'status' },
		});
		expect(screen.getByText('Alive')).toBeInTheDocument();
	});
});
