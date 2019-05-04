---
---

var DYNAMIC_CACHE = 'ikverstaat-dynamic-cache-{{ site.time | date: "%s" }}';
var STATIC_CACHE = 'ikverstaat-static-cache-{{ site.time | date: "%s" }}';

// listen for outgoing network request
self.addEventListener('fetch', function (event) {
    // try to find response object in the cache
    // associated with current request
    event.respondWith(
        caches.open(STATIC_CACHE).then(function (cache) {
            return cache.match(event.request).then(function (response) {
                if (response) return response;

                return fetch(event.request).catch(console.warn).then(function (networkResponse) {
                    if (!networkResponse || (networkResponse.status !== 200 && !networkResponse.ok)) {
                        return caches.open(DYNAMIC_CACHE).then(function (dynCache) {
                            return dynCache.match(event.request);
                        }).then(function (dynResponse) {
                            if (dynResponse) return dynResponse;
                            else return networkResponse;
                        });
                    }
                    if (event.request.method === 'GET') {
                        var cachedResponse = networkResponse.clone();
                        caches.open(DYNAMIC_CACHE).then(function (dynCache) {
                            dynCache.put(event.request, cachedResponse);
                        });
                    }
                    return networkResponse;
                });
            });
        })
    );
});

self.addEventListener('activate', function (event) {
    console.log('service worker activate');
    var cacheWhitelist = [STATIC_CACHE, DYNAMIC_CACHE];

    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (cacheWhitelist.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(STATIC_CACHE).then(function (cache) {
            return cache.addAll(
                [
                    '/ervaring',
                    '/assets/vendor/bootstrap/css/bootstrap.min.css',
                    '/assets/vendor/fontawesome/css/font-awesome.min.css',
                    '/assets/css/style.css',
                    'https://fonts.gstatic.com/s/firasans/v9/va9E4kDNxMZdWfMOD5Vvl4jL.woff2',
                    '/assets/vendor/aos/aos.css',
                    'https://cdn.polyfill.io/v2/polyfill.min.js',
                    '/assets/vendor/bootstrap-native.min.js',
                    '/assets/vendor/aos/aos.js',
                    '/assets/js/main.js',
                    'https://fonts.googleapis.com/css?family=Fira+Sans:400',
                    '/uploads/Uitwijkse_Erick%20(3).JPG',
                    '/uploads/profile.jpg',
                    '/assets/img/white-text.png',
                    '/uploads/ikverstaat-cropped.png',
                    '/uploads/logo%20Eelerwoude-logo-2018.png',
                    '/uploads/logo%20cropped%20optifield-new.png',
                    '/uploads/logo%20BugelHajema.png',
                    '/uploads/zlto-logo.jpg',
                    '/uploads/logo%20gemeente%20Nijkerk.png',
                    '/uploads/Logo%20Altena%20Nieuwe%20Energie.png',
                    '/uploads/logo_with_shadow.png',
                    '/',
                    '/over',
                    '/projecten',
                    '/assets/minima-social-icons.svg',
                    '/assets/vendor/fontawesome/fonts/fontawesome-webfont.woff2?v=4.7.0',
                    '/assets/vendor/bootstrap/fonts/glyphicons-halflings-regular.woff2',
                    '/sw.js',
                    '/manifest.json',
                    '/assets/img/meta-icons/android-chrome-144x144.png',
                    '/uploads/agriculture-animal-black-and-white-cows-325257.jpg',
                    '/uploads/agriculture-animal-close-up-1007809.jpg',
                    '/uploads/agriculture-barn-clouds-462136.jpg',
                    '/uploads/agriculture-bridge-clouds-1368231.jpg',
                    '/uploads/agriculture-country-countryside-810893.jpg',
                    '/uploads/listen.png',
                    '/uploads/strategy.png',
                    '/uploads/team.png',
                    '/uploads/waaier_cropped.png',
                    '/uploads/IMG_1652.JPG',
                    '/uploads/Biesbosch_Drone-0331.jpg',
                    '/uploads/Biesbosch-9670.jpg',
                    '/uploads/waaier_cropped_shadow.png',
                    '/uploads/L1000152.JPG',
                    '/uploads/logo%20AmerkantOp.jpg',
                    '/uploads/Logo%20Brabant.png',
                    '/uploads/logo_barneveld.png',
                    '/privacy'
                ]
            );
        })
    );
});

self.addEventListener('push', ev => {
    const data = ev.data.json();
    console.log('Got push', data);
    data.badge = 'https://ikverstaat.nl/assets/img/meta-icons/mstile-144x144.png';
    data.icon = 'https://ikverstaat.nl/assets/img/meta-icons/apple-touch-icon-180x180.png';
    ev.waitUntil(
        self.registration.showNotification(data.title, data)
    );
});


self.addEventListener('notificationclick', function (event) {
    if (event.notification.data && event.notification.data.url) {
        event.notification.close();
        event.waitUntil(
            clients.openWindow(event.notification.data.url)
        );
    }
});

