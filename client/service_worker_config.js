'use strict'

ServiceWorkerContainer.register('./service_worker.js')
  .then((ServiceWorkerRegistration) => {
    console.log(ServiceWorkerRegistration);
  });
