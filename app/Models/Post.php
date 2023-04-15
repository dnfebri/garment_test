<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'title',
        'subtitle',
        'description',
        'user_id',
        'category_id',
        'json',
        'is_delete'
    ];
}
