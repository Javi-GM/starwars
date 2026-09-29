import React from "react";
import {
	useQuery,
	useQueryClient,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";


const fetchPeople = async () => {
	const res = await fetch("https://swapi.dev/api/people/");
	return res.json();
};

export default function Home() {
	const queryClient = useQueryClient();

	const { data, isError, isLoading } = useQuery({ queryKey: ["people"], queryFn: fetchPeople });

  if (isLoading) {
    return <div>...loading</div>
  }

  if (isError) {
    return <div>There was an error trying to retrieve starwars characters</div>
  }

	return (
		<>

				<QueryClientProvider client={queryClient}>
				<h1>Starwars</h1>
        {
          data.map((character: any) => (<div key={character.name}>{character.name}</div>))
        }
  </QueryClientProvider>
		</>
	);
}
