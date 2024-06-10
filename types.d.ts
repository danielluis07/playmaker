type Post = {
  data: Array<{
    post: {
      id: string;
      title: string;
      description: string;
      imageUrl: string;
      content: string;
      published: boolean;
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
