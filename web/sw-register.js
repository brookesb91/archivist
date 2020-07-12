if (navigator && 'serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./sw.js')
    .then(() => console.log('Service worker registered successfully.'))
    .catch((error) =>
      console.error('Failed to register the service worker.', error)
    );
}
