// Dynatrace Watch: só para o Chrome no Android aceitar instalar esta página como app.
// Não guarda nada em cache: cada pedido vai à rede, como se este ficheiro não existisse.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{e.respondWith(fetch(e.request));});
