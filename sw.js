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
                    {% for page in site.pages %}
                    "{{ page.url }}",{% endfor %}
                    "/assets/img/generic-icons/network.png",
                    "/assets/img/generic-icons/support.png",
                    "/assets/img/generic-icons/team.png",
                    // "/assets/img/generic-images/agriculture-animal-black-and-white-cows-325257.jpg",
                    // "/assets/img/generic-images/agriculture-animal-close-up-1007809.jpg",
                    // "/assets/img/generic-images/agriculture-barn-clouds-462136.jpg",
                    // "/assets/img/generic-images/agriculture-bridge-clouds-1368231.jpg",
                    // "/assets/img/generic-images/agriculture-country-countryside-810893.jpg",
                    // "/assets/img/generic-images/architecture-backyard-boating-534171.jpg",
                    // "/assets/img/generic-images/bridge-cold-daytime-1559117.jpg",
                    // "/assets/img/generic-images/cold-december-environment-760971.jpg",
                    // "/assets/img/generic-images/dutch-farmland-green-141978.jpg",
                    "/assets/img/logo-sm-black.jpg",
                    "/assets/img/logo-sm-black.png",
                    "/assets/img/logo-sm-white.jpg",
                    "/assets/img/logo-sm-white.png",
                    "/assets/img/logo.png",
                    "/assets/img/profile.jpg",
                    "/assets/js/main.js",
                    "/assets/minima-social-icons.svg",
                    "/assets/vendor/aos/aos.css",
                    "/assets/vendor/aos/aos.js",
                    "/assets/vendor/bootstrap-native.min.js",
                    "/assets/vendor/bootstrap/css/bootstrap-theme.min.css",
                    "/assets/vendor/bootstrap/css/bootstrap.min.css",
                    "/assets/vendor/bootstrap/fonts/glyphicons-halflings-regular.woff2",
                    "/assets/vendor/bootstrap/js/bootstrap.min.js",
                    "/assets/vendor/fontawesome/css/font-awesome.min.css",
                    "/assets/vendor/fontawesome/fonts/fontawesome-webfont.woff2?v=4.7.0",
                    "/assets/vendor/masonry.pkgd.min.js",
                    "/favicon.ico",

                    // external
                    "https://fonts.googleapis.com/css?family=Saira+Extra+Condensed:500,700",
                    "https://fonts.googleapis.com/css?family=Muli:400,400i,800,800i",
                    "https://fonts.gstatic.com/s/sairaextracondensed/v4/-nFvOHYr-vcC7h8MklGBkrvmUG9rbpkisrTrU23h2wph.woff2",
                    "https://fonts.gstatic.com/s/muli/v12/7Auwp_0qiz-afTLGLQ.woff2",

                ]
            );
        })
    );
});

self.addEventListener('push', ev => {
    const data = ev.data.json();
    console.log('Got push', data);
    data.badge = 'https://esstudio.site/assets/img/meta-icons/mstile-144x144.png';
    data.icon = 'https://esstudio.site/assets/img/meta-icons/apple-touch-icon-180x180.png';
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

