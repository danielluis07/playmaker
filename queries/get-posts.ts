const URL = `${process.env.NEXT_PUBLIC_APP_URL}/api/posts`;

export const getPosts = async (): Promise<Post> => {
  try {
    const res = await fetch(`${URL}`, { cache: "no-cache" });

    if (!res.ok) {
      throw new Error(`Failed to fetch posts`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
