import React, { useState, useEffect } from 'react';
import { User, Post, AuthState } from '@/types';
import LoginForm from './Auth/LoginForm';
import RegisterForm from './Auth/RegisterForm';
import Header from './Layout/Header';
import Sidebar from './Layout/Sidebar';
import CreatePost from './Post/CreatePost';
import Feed from './Feed/Feed';

type AuthView = 'login' | 'register';

const SocialApp: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false
  });
  const [authView, setAuthView] = useState<AuthView>('login');
  const [posts, setPosts] = useState<Post[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('socialnet_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setAuthState({ user, isAuthenticated: true });
    }

    // Load saved posts
    const savedPosts = localStorage.getItem('socialnet_posts');
    if (savedPosts) {
      const parsedPosts = JSON.parse(savedPosts).map((post: any) => ({
        ...post,
        createdAt: new Date(post.createdAt)
      }));
      setPosts(parsedPosts);
    }
  }, []);

  const handleLogin = (user: User) => {
    setAuthState({ user, isAuthenticated: true });
    localStorage.setItem('socialnet_user', JSON.stringify(user));
  };

  const handleRegister = (user: User) => {
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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!authState.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        {authView === 'login' ? (
          <LoginForm 
            onLogin={handleLogin} 
            onShowRegister={() => setAuthView('register')}
          />
        ) : (
          <RegisterForm 
            onRegister={handleRegister}
            onBackToLogin={() => setAuthView('login')}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={authState.user} 
        onLogout={handleLogout} 
        onToggleSidebar={toggleSidebar}
      />
      
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 max-w-2xl mx-auto p-4">
          <CreatePost 
            user={authState.user!} 
            onCreatePost={handleCreatePost} 
          />
          <Feed posts={posts} />
        </main>
        
        <aside className="hidden lg:block w-80 p-4">
          <div className="sticky top-20">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-3">Sugestões para você</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>Conecte-se com pessoas interessantes</p>
                <p>Use hashtags para alcançar mais pessoas</p>
                <p>Seja criativo com suas palavras!</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SocialApp;