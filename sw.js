let versionCache = 'pwa-cache-v1';
let listaUrlsCache = [
	'./',
	'./style.css',
	'./script.js',
	'./manifest.json',
	'./assets/Fondo_JS.png',
	'./assets/programming.ico',
	'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300&display=swap',
	'https://fonts.googleapis.com/icon?family=Material+Icons',
]



self.addEventListener('install', e=>{
	e.waitUntil(
		caches.open(versionCache)
		.then(cache=>{
			cache.addAll(listaUrlsCache)
			.then(res => {
				console.log('archivos cacheados correctamente');
				self.skipWaiting();
			})
 		.catch(err => console.warn('Fallo cacheo', err))

		})
		)
	console.log('sw Instalado')
})



self.addEventListener('activate', e=>{
	const listaCache = [versionCache];
	e.waitUntil(
		caches.keys().then(listaCaches =>{
			listaCaches.map(cacheNombre =>{

				if(listaCache.indexOf(cacheNombre) === -1){
					caches.delete(cacheNombre);
				}
			})
		})
		.then(()=> self.clients.claim())
		)
})


self.addEventListener('fetch', e=>{
	//evalua si hay respuesta en cache y si existe la responde
	e.respondWith(
		caches.match(e.request)
		.then(res =>{
			if(res) {
				console.log('se respondio de cache el file:', e.request.url)
				return res
			}
			//si no hay respuesta en cache consulta en internet

			console.log('se respondio de internet el file:', e.request.url)
			return fetch(e.request);
		})
		.catch(err => console.log('Fallo consulta cache en file:', e.request.url))
		)
	// caches.open(versionCache).then(cache =>{

	// 	fetch(e.request).then(response =>{

	// 		cache.add(response.url)
	// 		.catch(err => console.warn('fallo', err));
	// 	})
	// })
})

