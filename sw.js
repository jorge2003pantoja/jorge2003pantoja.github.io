//Asignar nombre y versión de la cache
const CACHE_NAME = 'jorgetlanepantlapantoja';

//ficheros a cachear en la aplicación
var urlsToCache = [
	'./',
	'./css/styles.css',
	'./img/favicon.png',
	'./img/1.png',
	'./img/2.png',
	'./img/3.png',
	'./img/4.png',
	'./img/5.png',
	'./img/6.png',
	'./img/facebook.png',
	'./img/instagram.png',
	'./img/twitter.png',
	'./img/img1024.png',
	'./img/img512.png',
	'./img/img384.png',
	'./img/img256.png',
	'./img/img192.png',
	'./img/img128.png',
	'./img/img96.png',
	'./img/img64.png',
	'./img/img32.png',
	'./img/img16.png'
	];

//Evento install
// Instalación del service Worker y guarda en cache los recursos estaticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
            	.then(() => {
            		self.skipWaiting();
            	});
            	
        })
        .catch(err => console.log('No se ha registrado el cache', err))
    );
});


//Evento activate
// Que la app funcione sin conexión
self.addEventListener('activate', e => {
	const cacheWhitelist =[CACHE_NAME];

	e.waitUntil(
		caches.keys()
			.then(cacheNames => {
				return Promise.all(
					cacheNames.map(cacheName => {

						if(cacheWhitelist.indexOf(cacheName) === -1){
							// Borrar elementos que no se necesitan
							return caches.delete(cacheName);
						}

					})
				);
			})
		.then(() => {
			//Activar cache
			self.clients.claim();
		})
	);
});

//Evento fetch
self.addEventListener('fetch', e => {

	e.respondWith(
		caches.match(e.request)
		.then(res =>{
			if(res){
				return res;
			}
			return fetch(e.request);
		})
	);
});