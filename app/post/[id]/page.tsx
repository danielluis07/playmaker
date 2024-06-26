import { getPost } from "@/queries/get-post";
import { Post } from "./_components/post";

const PostPage = async ({ params }: { params: { id: string } }) => {
  const post = await getPost(params.id);
  return (
    <div className="max-w-[1200px] mx-auto mt-24 lg:mt-36">
      <Post data={post} />
    </div>
  );
};

export default PostPage;
