<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Models\Post;
use App\Models\PostLike;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with(['user'])
            ->withCount(['likes', 'comments'])
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json($posts);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required|string|max:500',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120', // 5MB max
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Processo de análise do conteúdo para hashtags, mentions e links
        $content = $request->content;
        $hashtags = $this->extractHashtags($content);
        $mentions = $this->extractMentions($content);
        $links = $this->extractLinks($content);

        $imageUrl = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('posts', 'public');
            $imageUrl = Storage::url($imagePath);
        }

        $post = Post::create([
            'user_id' => $request->user()->id,
            'content' => $content,
            'image_url' => $imageUrl,
            'hashtags' => $hashtags,
            'mentions' => $mentions,
            'links' => $links,
        ]);

        $post->load('user');

        return response()->json([
            'message' => 'Post created successfully',
            'post' => $post,
        ], 201);
    }

    public function show($id)
    {
        $post = Post::with(['user', 'comments.user'])
            ->withCount(['likes', 'comments'])
            ->findOrFail($id);

        return response()->json($post);
    }

    public function like(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        $userId = $request->user()->id;

        $existingLike = PostLike::where('post_id', $id)
            ->where('user_id', $userId)
            ->first();

        if ($existingLike) {
            $existingLike->delete();
            $post->decrement('likes_count');
            $liked = false;
        } else {
            PostLike::create([
                'post_id' => $id,
                'user_id' => $userId,
            ]);
            $post->increment('likes_count');
            $liked = true;
        }

        return response()->json([
            'liked' => $liked,
            'likes_count' => $post->fresh()->likes_count,
        ]);
    }

    private function extractHashtags($content)
    {
        preg_match_all('/#([a-zA-Z0-9_]+)/', $content, $matches);
        return $matches[1] ?? [];
    }

    private function extractMentions($content)
    {
        preg_match_all('/@([a-zA-Z0-9_]+)/', $content, $matches);
        return $matches[1] ?? [];
    }

    private function extractLinks($content)
    {
        preg_match_all('/https?:\/\/[^\s]+/', $content, $matches);
        return $matches[0] ?? [];
    }
}