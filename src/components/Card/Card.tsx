import { Character } from '../../entities/Character';

interface Props {
	character: Character;
}

const Card = ({ character }: Props) => {
	return (
		<div className="flex flex-wrap items-center bg-gradient-to-r from-zinc-700 to-sky-950 text-white rounded-lg">
			<img
				src={character.image}
				alt={character.name}
				className="w-full object-cover rounded-t-lg md:w-1/3 md:rounded-l-lg md:h-full"
			/>
			<div className="p-4 w-full md:w-2/3">
				<p>
					<a href={character.url} className="text-lg font-semibold">
						{character.name}
					</a>
				</p>
				<p>Gender: {character.gender}</p>
				<p>Status: {character.status}</p>
				<p>Type: {character.type}</p>
				<p>Species: {character.species}</p>
				<p>Episodes: {character.episode.length}</p>
				<p>
					Origin:
					<a href={character.origin.url} className="ml-1 text-blue-300">
						{character.origin.name}
					</a>
				</p>
				<p>
					Location:
					<a href={character.location.url} className="ml-1 text-blue-300">
						{character.location.name}
					</a>
				</p>
			</div>
		</div>
	);
};

export default Card;
