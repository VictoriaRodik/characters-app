import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import CardsContainer from '../../src/components/CardsContainer/CardsContainer';
import { useQuery } from '@tanstack/react-query';

vi.mock('@tanstack/react-query');

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
			<div data-testid="card" onClick={vi.fn}>
				<p>{character.id}</p>
				<p>{character.name}</p>
				<p>{character.status}</p>
				<p>{character.gender}</p>
			</div>
		);
	},
}));

describe('CardsContainer Component', () => {
	afterEach(() => {
		vi.clearAllMocks();
		vi.resetAllMocks();
	});

	it('should render loading text while data is loading', async () => {
		useQuery.mockReturnValue({
			data: null,
			isLoading: true,
			error: null,
		});
		render(<CardsContainer />);
		await waitFor(() => {
			expect(screen.getByText('Loading...')).toBeInTheDocument();
		});
	});

	it('should render error message if there is an error', async () => {
		useQuery.mockReturnValue({
			data: null,
			isLoading: false,
			error: { message: 'Failed' },
		});
		render(<CardsContainer />);
		await waitFor(() => {
			expect(screen.getByText('Error: Failed')).toBeInTheDocument();
		});
	});

	it('should render message if there is no data', async () => {
		useQuery.mockReturnValue({
			data: null,
			isLoading: false,
			error: null,
		});
		render(<CardsContainer />);
		await waitFor(() => {
			expect(screen.getByText('No characters')).toBeInTheDocument();
		});
	});

	it('should render characters correctly', () => {
		useQuery.mockReturnValue({
			data: mockedData,
			isLoading: false,
			error: null,
		});
		render(<CardsContainer />);
		expect(screen.getByText('Rick and Morty')).toBeInTheDocument();
		expect(screen.getAllByTestId('card')).toHaveLength(mockedData.length);
	});

	it('should filter characters correctly', () => {
		useQuery.mockReturnValue({
			data: mockedData,
			isLoading: false,
			error: null,
		});
		render(<CardsContainer />);
		fireEvent.change(screen.getByPlaceholderText('Filter by name'), {
			target: { value: 'Rick' },
		});
		expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
		expect(screen.queryByText('Location')).not.toBeInTheDocument();
	});

	it('should sort characters correctly', () => {
		useQuery.mockReturnValue({
			data: mockedData,
			isLoading: false,
			error: null,
		});
		render(<CardsContainer />);

		const combobox = screen.getByRole('combobox');
		fireEvent.change(combobox, {
			target: { value: 'name' },
		});

		expect(combobox.value).toBe('name');
		expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();

		fireEvent.change(combobox, {
			target: { value: 'status' },
		});

        expect(combobox.value).toBe('status');
		expect(screen.getByText('Alive')).toBeInTheDocument();

		fireEvent.change(combobox, {
			target: { value: 'gender' },
		});

        expect(combobox.value).toBe('gender');
		expect(screen.getByText('Male')).toBeInTheDocument();

		fireEvent.change(combobox, {
			target: { value: 'initial' },
		});

        expect(combobox.value).toBe('initial');
		expect(screen.getByText('1')).toBeInTheDocument();
	});

    it('handleNextPage updates page state correctly', () => {
        useQuery.mockReturnValue({
			data: mockedData,
			isLoading: false,
			error: null,
		});
		render(<CardsContainer />);
        const nextButton = screen.getByText('Next');
        fireEvent.click(nextButton);
        expect(nextButton.disabled).toBe(false);
      });
});
