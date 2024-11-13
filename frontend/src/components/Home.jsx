import { lazy, memo, useCallback, Suspense } from "react";
import { fetchPets } from "../apis/pets";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const SearchResults = lazy(() => import("./SearchResult"));
const SearchForm = lazy(() => import("./SearchForm"));

const Home = () => {
  const {
    data: { pets = [], animalsAndBreeds = [] } = {
      pets: [],
      animalsAndBreeds: [],
    },
    error,
    isLoading,
  } = useQuery({
    queryKey: ["pets"],
    queryFn: fetchPets,
  });

  const queryClient = useQueryClient();

  const formSubmit = useCallback(
    async (location = "", animal = "", breed = "") => {
      try {
        const { pets: filteredPets, animalsAndBreeds } =
          await queryClient.fetchQuery({
            queryKey: ["pets", { location, animal, breed }],
            queryFn: () => fetchPets(location, animal, breed),
          });

        queryClient.setQueryData(["pets"], {
          pets: filteredPets,
          animalsAndBreeds,
        });
      } catch (error) {
        console.error("Error fetching pets:", error);
        queryClient.setQueryData(["pets"], { pets: [], animalsAndBreeds });
      }
    },
    [queryClient, animalsAndBreeds]
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="searchForm">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchForm pets={animalsAndBreeds} onSubmit={formSubmit} />
        <SearchResults pets={pets} />
      </Suspense>
    </div>
  );
};

export default memo(Home);
