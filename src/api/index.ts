import { Character } from "../entities/Character";

export async function fetchCharacters(): Promise<Character[]> {
  try {
    const url = "https://rickandmortyapi.com/api/character";

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Something went wrong`);
    }
    const data = await response.json();
    console.log(data);
    return data.results;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}
