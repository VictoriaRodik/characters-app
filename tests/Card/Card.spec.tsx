import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Card from '../../src/components/Card/Card';

const character = {
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
};

vi.mock("../../src/components/Modal/Modal", () => ({
    __esModule: true,
    default: function Modal({ children }) {
      return <div data-testid="modal">{children}</div>;
    },
  }));

describe('Card Component', () => {
	beforeEach(() => {
		render(<Card character={character} />);
	});

	it('should render character details correctly', () => {
		expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
		expect(screen.getByText('Gender: Male')).toBeInTheDocument();
		expect(screen.getByText('Status: Alive')).toBeInTheDocument();
		expect(screen.getByText('Type: Human')).toBeInTheDocument();
		expect(screen.getByText('Species: Human')).toBeInTheDocument();
	});

	it('should open modal when clicked', () => {
		expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
		fireEvent.click(screen.getByText('Rick Sanchez'));
		expect(screen.getByTestId('modal')).toBeInTheDocument();
	});

	it('should close modal when onClose is called', () => {
		fireEvent.click(screen.getByText('Rick Sanchez'));
		fireEvent.click(screen.getByText('Rick Sanchez')); 
		expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
	});
});
