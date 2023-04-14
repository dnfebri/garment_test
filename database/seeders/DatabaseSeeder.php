<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

// use App\Models\Role;
// use App\Models\RoleUser;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('12345678')
        ]);

        \App\Models\Role::factory()->create([
            'name' => 'admin'
        ]);

        \App\Models\RoleUser::factory()->create([
            'user_id' => 1,
            'role_id' => 1
        ]);
    }
}
