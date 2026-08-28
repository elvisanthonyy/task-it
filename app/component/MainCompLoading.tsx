import ListLoadingIndividual from "./ListLoadingIndividual";

const MainCompLoading = () => {
  return (
    <div className="grid md:px-[128px] mt-4 md:grid-cols-3 grid-cols-2 md:rounded-[24px] min-h-[80vh]  w-full gap-x-2 place-content-start place-items-start gap-y-2">
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
