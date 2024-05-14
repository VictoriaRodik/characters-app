import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi,  } from 'vitest';
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

	  it('should render loading text while data is loading', async () => {
        vi.mock('@tanstack/react-query', () => ({
            useQuery: () => ({
                data: null,
                isLoading: true,
                error: null,
            }),
        }));
        render(<CardsContainer />); 
        await waitFor(() => {
            expect(screen.getByText('Loading...')).toBeInTheDocument();
        });
	  });

	  it('should render error message if there is an error', async() => {
        vi.mock('@tanstack/react-query', () => ({
            useQuery: () => ({
              data: null,
              isLoading: false,
              error: { message: 'Failed' },
            }),
          }));
          render(<CardsContainer />);
          await waitFor(() => {
            expect(screen.getByText('Error: Failed')).toBeInTheDocument();
        });
	  });

	it('should render characters correctly', () => {
        vi.mock('@tanstack/react-query', () => ({
            useQuery: () => ({
                data: mockedData,
                isLoading: false,
                error: null,
            }),
        }));
        render(<CardsContainer />);
		expect(screen.getByText('Rick and Morty')).toBeInTheDocument();
		expect(screen.getAllByTestId('card')).toHaveLength(mockedData.length);
	});

	it('should filter characters correctly', () => {
        vi.mock('@tanstack/react-query', () => ({
            useQuery: () => ({
                data: mockedData,
                isLoading: false,
                error: null,
            }),
        }));
        render(<CardsContainer />);
		fireEvent.change(screen.getByPlaceholderText('Filter by name'), {
			target: { value: 'Rick' },
		});
		expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
		expect(screen.queryByText('Location')).not.toBeInTheDocument();
	});

	it('should sort characters correctly', () => {
        vi.mock('@tanstack/react-query', () => ({
            useQuery: () => ({
                data: mockedData,
                isLoading: false,
                error: null,
            }),
        }));
        render(<CardsContainer />);
		fireEvent.change(screen.getByRole('combobox'), {
			target: { value: 'status' },
		});
		expect(screen.getByText('Alive')).toBeInTheDocument();
	});
});
