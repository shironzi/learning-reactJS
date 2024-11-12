import { lazy, memo, useCallback, Suspense } from "react";
import { fetchPets } from "../apis/pets";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const SearchResults = lazy(() => import("./SearchResult"));
const SearchForm = lazy(() => import("./SearchForm"));

const Home = () => {
  const {
    data: pets,
    error,
    isLoading,
  } = useQuery({ queryKey: ["pets"], queryFn: fetchPets });

  const queryClient = useQueryClient();

  const formSubmit = useCallback(
    async (location = "", animal = "", breed = "") => {
      queryClient.fetchQuery(["pets", { location, animal, breed }], () =>
        fetchPets(location, animal, breed)
      );
    },
    [queryClient]
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="searchForm">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchForm pets={pets} onSubmit={formSubmit} />
        <SearchResults pets={pets} />
      </Suspense>
    </div>
  );
};

export default memo(Home);
