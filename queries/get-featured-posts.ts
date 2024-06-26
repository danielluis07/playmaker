const URL = `${process.env.NEXT_PUBLIC_APP_URL}/api/public/posts/featured`;

type Post = {
  data: Array<{
    post: {
      id: string;
      title: string;
      shortDescription: string | null;
      description: string;
      imageUrl: string | null;
      content: string;
      isPublished: boolean;
      isFeatured: boolean;
      league: string;
      postType: string;
      likes: number;
      userId: string;
      createdAt: Date;
      updatedAt: Date;
    };
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
      role: string;
      emailVerified: boolean;
      createdAt: Date;
      updatedAt: Date;
    };
  }>;
};

export const getFeaturedPosts = async (): Promise<Post> => {
  try {
    const res = await fetch(`${URL}`, { cache: "no-cache" });

    if (!res.ok) {
      throw new Error("Failed to fetch featured posts");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
