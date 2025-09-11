# Backend – PingMe

This directory contains the API server, built with [Laravel](https://laravel.com/).

## Getting Started

1. Make sure you have PHP 8.1+, Composer, and Docker installed.
2. Install dependencies:
   ```bash
   composer install
   ```
3. Copy the example environment file and set your variables:
   ```bash
   cp .env.example .env
   ```
4. Generate the application key:
   ```bash
   php artisan key:generate
   ```
5. Start the server (or use Docker Compose from the project root):
   ```bash
   php artisan serve
   ```

Alternatively, use Docker Compose from the root to run both frontend and backend together.

## Running Tests

```bash
php artisan test
```

## Useful commands

- Migrate database: `php artisan migrate`
- Seed database: `php artisan db:seed`

## License

This project is licensed under the MIT License.
