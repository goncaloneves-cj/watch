// Dynatrace Watch: o Chrome no Android aceita instalar esta página como app por causa deste ficheiro.
// Não guarda nada em cache: cada pedido vai à rede, como se este ficheiro não existisse.
// v4.54.0 — e mostra as notificações que o Watch envia (Web Push): o texto chega cifrado para este telemóvel; tocar
// abre o painel nesse alerta.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{e.respondWith(fetch(e.request));});
self.addEventListener('push',e=>{
  let d={};try{d=e.data?e.data.json():{};}catch(x){d={b:e.data?e.data.text():''};}
  e.waitUntil(self.registration.showNotification(String(d.t||'Dynatrace Watch').slice(0,120),{body:String(d.b||'').slice(0,240),
    icon:'watch-192.png',tag:String(d.tag||'watch'),renotify:true,requireInteraction:d.r===1,data:{p:String(d.p||'')}}));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  const p=(e.notification.data&&e.notification.data.p)||'',url=self.registration.scope+(/^P-\d{4,12}$/.test(p)?'?p='+p:'');
  e.waitUntil(self.clients.openWindow(url));
});
