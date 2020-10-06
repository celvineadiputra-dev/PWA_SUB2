const CACHE_NAME = "FootBall-01";
const urlsToCache = [
    "/",
    "/manifest.json",
    "/css/Main.css",
    "/css/materialize.min.css",
    "/Js/Main.js",
    "/Js/materialize.min.js",
    "Images/Favicon/apple-icon-57x57.png",
    "Images/Favicon/apple-icon-60x60.png",
    "Images/Favicon/apple-icon-72x72.png",
    "Images/Favicon/apple-icon-76x76.png",
    "Images/Favicon/apple-icon-114x114.png",
    "Images/Favicon/apple-icon-120x120.png",
    "Images/Favicon/apple-icon-144x144.png",
    "Images/Favicon/apple-icon-152x152.png",
    "Images/Favicon/apple-icon-180x180.png",
    "Images/Favicon/android-icon-192x192.png",
    "Images/Favicon/favicon-32x32.png",
    "Images/Favicon/favicon-96x96.png",
    "Images/Favicon/favicon-16x16.png",
    "/Fonts/MA.woff2",
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});
self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(function (response) {
                if (response) {
                    console.log(
                        "ServiceWorker: Gunakan aset dari cache: ",
                        response.url
                    );
                    return response;
                }

                console.log(
                    "ServiceWorker: Memuat aset dari server: ",
                    event.request.url
                );
                return fetch(event.request);
            })
    );
});
self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log(
                            "ServiceWorker: cache " + cacheName + " dihapus"
                        );
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
