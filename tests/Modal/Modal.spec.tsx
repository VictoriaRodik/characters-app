import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Modal from '../../src/components/Modal/Modal';

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

const onClose = vi.fn();

describe('Modal Component', () => {
	beforeEach(() => {
		render(<Modal character={character} onClose={onClose} />);
	});

	it('should render character details correctly', () => {
		expect(screen.getByText('Location')).toBeInTheDocument();
		expect(screen.getByText('Episodes: 1')).toBeInTheDocument();
		expect(screen.getByText('Location')).toBeInTheDocument();
	});

	it('should close modal when onClose is called', () => {
		fireEvent.mouseDown(document.body);
		expect(onClose).toHaveBeenCalled();
	});
});
