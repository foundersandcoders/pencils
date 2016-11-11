'use strict'

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('service-worker.js', {scope: './'})
  .then( _ => {
    if (navigator.serviceWorker.controller) console.log('service worker success!')
  })
  .catch( console.log )
}
