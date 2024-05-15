import { fetchCharacters } from '../../src/api/index';
import { describe, expect, it, vi } from 'vitest';

describe('fetchCharacters', () => {
	it('should fetch characters from API', async () => {
		const characters = await fetchCharacters();

		expect(characters).toBeDefined();
		expect(Array.isArray(characters)).toBe(true);
		expect(characters.length).toBeGreaterThan(0);

		characters.forEach((character) => {
			expect(character).toHaveProperty('name');
			expect(character).toHaveProperty('species');
		});
	});

    it('should throw an error when API request fails', async () => {
        vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Some Error'));
    
        try {
          await fetchCharacters(1);
          expect(true).toBe(false);
        } catch (error) {
           expect(error).toBeInstanceOf(Error);
          expect(error.message).toBe('Some Error');
        }
      });
});
