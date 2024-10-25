docker exec nicolas-test-dev-libre-laravel chmod -R 777 /var/www/html &&
    docker exec nicolas-test-dev-libre-laravel composer require inertiajs/inertia-laravel
    docker exec nicolas-test-dev-libre-laravel npm install @inertiajs/react
    docker exec nicolas-test-dev-libre-laravel php artisan migrate &&
    docker exec nicolas-test-dev-libre-laravel php artisan db:seed &&
    docker exec nicolas-test-dev-libre-laravel npm install &&
    docker exec nicolas-test-dev-libre-laravel npm run dev