# SamayaInteractive || Transaction Management

sedikit informasi tentang projek ini yang dibuat secara terpisah frontend dan backendnya. dimana frontend menggunakan ReactJS dan backend Laravel.

## Front-End

-   jalankan `cd front-end`
-   jalankan `npm install`
-   jalankan `npm run dev`

Jika di laptop hanya menjalankan project backend ini maka tidak perlu mengganti baseURL yang ada di `src/services/api.js` tetapi jika running di port yang berbeda, silahkan ganti di path ini untuk baseURLnya `src/services/api.js`

## Back-End

-   jalankan `cd backend`
-   jalankan `cp .env.example .env`
-   jalankan `composer install`
-   jalankan `php artisan key:generate`
-   jalankan `php artisan migrate`

    ## Agar redisnya berjalan dengan baik

    -   pastikan sudah meginstall extention php8.3-redis
    -   pastikan sudah meginstall redis-server di laptop
    -   sesuaikan settingan config di env sesuai redis di laptop

-   jalankan project backendnya `php artisan serve`
