/* ==========================================================
   YUELLA BILL TRACKER
   SERVICE WORKER
========================================================== */

const CACHE_NAME =
    "yuella-bill-tracker-v1";


const APP_SHELL = [

    "./",

    "./index.html",

    "./manifest.json",

    "./css/style.css",

    "./assets/yuella-background.png",

    "./assets/yuella-logo.png",

    "./assets/icon-192.png",

    "./assets/icon-512.png"

];


/* ==========================================================
   INSTALL
========================================================== */

self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches
                .open(
                    CACHE_NAME
                )
                .then(
                    cache => {

                        return cache.addAll(
                            APP_SHELL
                        );

                    }
                )

        );


        self.skipWaiting();

    }
);


/* ==========================================================
   ACTIVATE
========================================================== */

self.addEventListener(
    "activate",
    event => {

        event.waitUntil(

            caches
                .keys()
                .then(
                    cacheNames => {

                        return Promise.all(

                            cacheNames
                                .filter(
                                    cacheName =>
                                        cacheName !==
                                        CACHE_NAME
                                )
                                .map(
                                    cacheName =>
                                        caches.delete(
                                            cacheName
                                        )
                                )

                        );

                    }
                )

        );


        self.clients.claim();

    }
);


/* ==========================================================
   FETCH
========================================================== */

self.addEventListener(
    "fetch",
    event => {

        if(
            event.request.method !==
            "GET"
        ){

            return;

        }


        event.respondWith(

            fetch(
                event.request
            )
            .then(
                response => {

                    return response;

                }
            )
            .catch(
                () => {

                    return caches.match(
                        event.request
                    );

                }
            )

        );

    }
);