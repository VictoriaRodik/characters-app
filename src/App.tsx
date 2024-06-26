import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CardsContainer from './components/CardsContainer/CardsContainer';

import './App.css';

const App: React.FC = () => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<CardsContainer />
		</QueryClientProvider>
	);
};

export default App;
