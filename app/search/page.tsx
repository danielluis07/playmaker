import { SearchedPosts } from "./_components/searched-posts";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <div className="max-w-[1200px] mx-auto mt-24 lg:mt-36">
      <SearchedPosts searchQuery={searchParams.q} />
    </div>
  );
};

export default SearchPage;
