import Card from '../Card/Card';
import { useQuery } from '@tanstack/react-query';
import { fetchCharacters } from '../../api';

const CardsContainer = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['characters'],
        queryFn: fetchCharacters,
        staleTime: Infinity,
    });

    if (isLoading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center">Error: {error.message}</div>;
    }

    return (
        <div className="flex flex-wrap justify-center gap-4">
            {data && data.map((character) => (
                <Card key={character.id} character={character} />
            ))}
        </div>
    );
};
export default CardsContainer;
