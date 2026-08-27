import ItemLoadingIndividual from "./ItemLoadingIndividual";

const ItemsCompLoading = () => {
  return (
    <div className="flex md:px-[128px] flex-col gap-2 px-4 items-center nx:grid nx:place-items-center nx:grid-cols-2 w-full md:grid md:grid-cols-3 nx:place-content-start h-[90dvh] py-3">
      <ItemLoadingIndividual />
      <ItemLoadingIndividual />
      <ItemLoadingIndividual />
      <ItemLoadingIndividual />
      <ItemLoadingIndividual />
      <ItemLoadingIndividual />
    </div>
  );
};

export default ItemsCompLoading;
