import ListLoadingIndividual from "./ListLoadingIndividual";

const MainCompLoading = () => {
  return (
    <div className="grid animate-pulse grid-cols-2 min-h-[80vh] md:grid-cols-2 w-full gap-x-2 place-content-start place-items-start gap-y-2">
      <ListLoadingIndividual />
      <ListLoadingIndividual />
      <ListLoadingIndividual />
      <ListLoadingIndividual />
      <ListLoadingIndividual />
      <ListLoadingIndividual />
    </div>
  );
};

export default MainCompLoading;
