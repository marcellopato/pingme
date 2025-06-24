import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import PostItem from '@/components/Post/PostItem';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';

const PostPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [comment, setComment] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      setLoading(true);
      const { data: postData } = await supabase.from('posts').select('*').eq('id', id).single();
      setPost(postData);
      const { data: commentsData } = await supabase.from('comments').select('*').eq('post_id', id).order('created_at', { ascending: true });
      setComments(commentsData || []);
      setLoading(false);
    };
    fetchPostAndComments();
  }, [id]);

  const handleComment = async () => {
    if (!comment.trim()) return;
    setIsCommenting(true);
    const { error } = await supabase.from('comments').insert({
      id: uuidv4(),
      post_id: id,
      user_id: 'usuario',
      author_name: 'Usuário',
      author_username: 'usuario',
      author_avatar: post?.author_avatar || '',
      content: comment.trim(),
      created_at: new Date().toISOString(),
    });
    if (!error) {
      setComment('');
      // Atualiza lista de comentários
      const { data: commentsData } = await supabase.from('comments').select('*').eq('post_id', id).order('created_at', { ascending: true });
      setComments(commentsData || []);
    }
    setIsCommenting(false);
  };

  if (loading) return <div className="p-8 text-center">Carregando...</div>;
  if (!post) return <div className="p-8 text-center">Post não encontrado.</div>;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">Voltar</Button>
      <PostItem post={post} />
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Comentários</h2>
        <textarea
          className="w-full border rounded p-2 text-sm mb-2"
          placeholder="Digite seu comentário..."
          value={comment}
          onChange={e => setComment(e.target.value)}
          rows={2}
          maxLength={280}
        />
        <div className="flex justify-end mb-6">
          <Button size="sm" onClick={handleComment} disabled={isCommenting || !comment.trim()}>
            {isCommenting ? 'Enviando...' : 'Comentar'}
          </Button>
        </div>
        <div className="space-y-4">
          {comments.length === 0 && <div className="text-gray-500">Nenhum comentário ainda.</div>}
          {comments.map((c) => (
            <div key={c.id} className="border rounded p-3 bg-white">
              <div className="flex items-center mb-1">
                <img src={c.author_avatar} alt="avatar" className="w-7 h-7 rounded-full mr-2" />
                <span className="font-medium mr-2">{c.author_name}</span>
                <span className="text-gray-500 text-xs">@{c.author_username}</span>
              </div>
              <div className="text-gray-800 text-sm whitespace-pre-wrap">{c.content}</div>
              <div className="text-gray-400 text-xs mt-1">{new Date(c.created_at).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostPage; 