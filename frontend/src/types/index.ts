export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  username: string;
  isPrivate: boolean;
}

export interface Post {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  images?: string[];
  hashtags: string[];
  mentions: string[];
  links: string[];
  quotedPost?: Post;
  hasExtension: boolean;
  extensionUsed: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}