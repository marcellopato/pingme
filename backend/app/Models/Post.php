<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'content',
        'image_url',
        'likes_count',
        'comments_count',
        'retweets_count',
        'has_extension',
        'extension_used',
        'hashtags',
        'mentions',
        'links',
    ];

    protected $casts = [
        'hashtags' => 'array',
        'mentions' => 'array',
        'links' => 'array',
        'has_extension' => 'boolean',
        'extension_used' => 'boolean',
    ];

    protected $with = ['user'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function likes()
    {
        return $this->hasMany(PostLike::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function isLikedBy($userId)
    {
        return $this->likes()->where('user_id', $userId)->exists();
    }
}