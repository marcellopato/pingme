<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Comment;
use App\Models\Post;

class CommentController extends Controller
{
    public function store(Request $request, $postId)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required|string|max:280',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $post = Post::findOrFail($postId);

        $comment = Comment::create([
            'post_id' => $postId,
            'user_id' => $request->user()->id,
            'content' => $request->content,
        ]);

        $post->increment('comments_count');

        $comment->load('user');

        return response()->json([
            'message' => 'Comment created successfully',
            'comment' => $comment,
        ], 201);
    }

    public function index($postId)
    {
        $comments = Comment::where('post_id', $postId)
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json($comments);
    }
}