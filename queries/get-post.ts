const URL = `${process.env.NEXT_PUBLIC_APP_URL}/api/public/posts`;

type Post = {
  data: {
    post: {
      id: string;
      title: string;
      shortDescription: string | null;
      description: string;
      imageUrl: string | null;
      content: string;
      isPublished: boolean;
      isFeatured: boolean;
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
  };
};

export const getPost = async (id: string): Promise<Post> => {
  try {
    const res = await fetch(`${URL}/${id}`, { cache: "no-cache" });

    if (!res.ok) {
      throw new Error(`Failed to fetch post with id: ${id}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
