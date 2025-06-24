import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Image, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface CreatePostProps {
  onPostCreated?: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Erro",
          description: "A imagem deve ter no máximo 5MB",
          variant: "destructive"
        });
        return;
      }
      
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast({
        title: "Erro",
        description: "O post não pode estar vazio",
        variant: "destructive"
      });
      return;
    }

    setIsPosting(true);
    
    try {
      let imageUrl = null;
      
      if (selectedImage) {
        // Test bucket access first
        try {
          const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
          console.log('Available buckets:', buckets);
          if (bucketError) {
            console.error('Bucket access error:', bucketError);
          }
        } catch (e) {
          console.error('Failed to list buckets:', e);
        }

        const fileExt = selectedImage.name.split('.').pop();
        const fileName = `public/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        console.log('Attempting upload:', fileName, 'Size:', selectedImage.size);
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('post-images')
          .upload(fileName, selectedImage, {
            cacheControl: '3600',
            upsert: true,
            contentType: selectedImage.type
          });
        
        if (uploadError) {
          console.error('Upload error:', uploadError);
          
          // Try alternative approach - create post without image
          toast({
            title: "Aviso",
            description: "Não foi possível fazer upload da imagem. Post será criado sem imagem.",
            variant: "default"
          });
        } else {
          console.log('Upload successful:', uploadData);
          
          const { data: { publicUrl } } = supabase.storage
            .from('post-images')
            .getPublicUrl(fileName);
          imageUrl = publicUrl;
          
          console.log('Public URL:', publicUrl);
        }
      }
      
      const { error } = await supabase
        .from('posts')
        .insert({
          content: content.trim(),
          author_name: 'Usuário',
          author_username: 'usuario',
          author_avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          image_url: imageUrl
        });
      
      if (error) {
        console.error('Database error:', error);
        throw error;
      }
      
      setContent('');
      removeImage();
      onPostCreated?.();
      
      toast({
        title: "Sucesso",
        description: "Post publicado com sucesso!"
      });
    } catch (error: any) {
      console.error('Error creating post:', error);
      toast({
        title: "Erro",
        description: error.message || "Não foi possível publicar o post",
        variant: "destructive"
      });
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Card className="p-4 mb-6">
      <div className="flex space-x-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <Textarea
            placeholder="O que está acontecendo?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] border-none resize-none focus-visible:ring-0 text-xl placeholder:text-gray-500"
            maxLength={280}
          />
          
          {imagePreview && (
            <div className="relative mt-3">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="rounded-lg max-w-full h-auto max-h-96 object-cover"
              />
              <Button
                variant="secondary"
                size="sm"
                className="absolute top-2 right-2 rounded-full w-8 h-8 p-0"
                onClick={removeImage}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
          
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
                ref={fileInputRef}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-500 hover:bg-blue-50"
              >
                <Image className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className={`text-sm ${content.length > 260 ? 'text-red-500' : 'text-gray-500'}`}>
                {280 - content.length}
              </span>
              <Button
                onClick={handleSubmit}
                disabled={!content.trim() || isPosting || content.length > 280}
                className="rounded-full px-6"
              >
                {isPosting ? 'Publicando...' : 'Postar'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CreatePost;