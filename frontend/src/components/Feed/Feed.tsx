import React, { useState, useEffect } from 'react';
import PostItem from '../Post/PostItem';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface Post {
  id: string;
  content: string;
  author_name: string;
  author_username: string;
  author_avatar?: string;
  image_url?: string;
  likes_count: number;
  comments_count: number;
  retweets_count: number;
  created_at: string;
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os posts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLikeUpdate = () => {
    fetchPosts();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {posts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>Nenhum post encontrado</p>
        </div>
      ) : (
        posts.map((post) => (
          <PostItem 
            key={post.id} 
            post={post} 
            onLikeUpdate={handleLikeUpdate}
          />
        ))
      )}
    </div>
  );
};

export default Feed;