import React from 'react';
import CreatePost from '@/components/Post/CreatePost';
import Feed from '@/components/Feed/Feed';
import { Toaster } from '@/components/ui/toaster';

const Index: React.FC = () => {
  const [refreshKey, setRefreshKey] = React.useState(0);

  const handlePostCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Feed Social</h1>
        <CreatePost onPostCreated={handlePostCreated} />
        <Feed key={refreshKey} />
      </div>
      <Toaster />
    </div>
  );
};

export default Index;