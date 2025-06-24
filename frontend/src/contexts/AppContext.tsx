import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Post, AuthState } from '@/types';

interface AppContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  authState: AuthState;
  posts: Post[];
  handleLogin: (user: User) => void;
  handleLogout: () => void;
  handleCreatePost: (postData: Omit<Post, 'id' | 'createdAt'>) => void;
}

const defaultAppContext: AppContextType = {
  sidebarOpen: false,
  toggleSidebar: () => {},
  authState: { user: null, isAuthenticated: false },
  posts: [],
  handleLogin: () => {},
  handleLogout: () => {},
  handleCreatePost: () => {},
};

const AppContext = createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false
  });
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('socialnet_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setAuthState({ user, isAuthenticated: true });
    }

    const savedPosts = localStorage.getItem('socialnet_posts');
    if (savedPosts) {
      const parsedPosts = JSON.parse(savedPosts).map((post: any) => ({
        ...post,
        createdAt: new Date(post.createdAt)
      }));
      setPosts(parsedPosts);
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const handleLogin = (user: User) => {
    setAuthState({ user, isAuthenticated: true });
    localStorage.setItem('socialnet_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setAuthState({ user: null, isAuthenticated: false });
    localStorage.removeItem('socialnet_user');
  };

  const handleCreatePost = (postData: Omit<Post, 'id' | 'createdAt'>) => {
    const newPost: Post = {
      ...postData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('socialnet_posts', JSON.stringify(updatedPosts));
  };

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        authState,
        posts,
        handleLogin,
        handleLogout,
        handleCreatePost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};