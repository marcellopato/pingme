import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Repeat2, Share, Upload } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface PostItemProps {
  post: {
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
  };
  onLikeUpdate?: () => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onLikeUpdate }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [isLiking, setIsLiking] = useState(false);
  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d`;
    }
  };

  const handleLike = async () => {
    if (isLiking) return;
    
    setIsLiking(true);
    const userId = 'user_' + Math.random().toString(36).substr(2, 9);
    
    try {
      if (isLiked) {
        const { error } = await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', post.id)
          .eq('user_id', userId);
        
        if (!error) {
          setIsLiked(false);
          setLikesCount(prev => prev - 1);
          await supabase
            .from('posts')
            .update({ likes_count: likesCount - 1 })
            .eq('id', post.id);
        }
      } else {
        const { error } = await supabase
          .from('post_likes')
          .insert({ post_id: post.id, user_id: userId });
        
        if (!error) {
          setIsLiked(true);
          setLikesCount(prev => prev + 1);
          await supabase
            .from('posts')
            .update({ likes_count: likesCount + 1 })
            .eq('id', post.id);
        }
      }
      onLikeUpdate?.();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível curtir o post",
        variant: "destructive"
      });
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <Card className="p-4 mb-4 hover:bg-gray-50 transition-colors">
      <div className="flex space-x-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={post.author_avatar} />
          <AvatarFallback>
            {post.author_name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-semibold">{post.author_name}</span>
            <span className="text-gray-500">@{post.author_username}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500 text-sm">
              {formatDate(post.created_at)}
            </span>
          </div>
          
          <div className="mb-3">
            <p className="text-gray-900 whitespace-pre-wrap">
              {post.content}
            </p>
            {post.image_url && (
              <img 
                src={post.image_url} 
                alt="Post image" 
                className="mt-3 rounded-lg max-w-full h-auto"
              />
            )}
          </div>
          
          <div className="flex justify-between max-w-md">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
              <MessageCircle className="w-4 h-4 mr-1" />
              <span className="text-sm">{post.comments_count}</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-green-500">
              <Repeat2 className="w-4 h-4 mr-1" />
              <span className="text-sm">{post.retweets_count}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
              onClick={handleLike}
              disabled={isLiking}
            >
              <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm">{likesCount}</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PostItem;