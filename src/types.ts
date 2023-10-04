declare global {
  type PostType = {
    author: AuthorType;
    id: string;
    text: string;
    createdAt: Date;
    authorId: string;
  };

  type AuthorType = {
    name: string;
    lastUsedAt: Date;
  };
}

export {};
