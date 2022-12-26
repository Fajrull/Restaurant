/* eslint-disable no-console */
/* eslint-disable no-useless-return */
import * as WorkboxWindow from 'workbox-window';

const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker not supported in this browser');
    return;
  }

  const wb = new WorkboxWindow.Workbox('./sw.bundle.js');

  try {
    await wb.register();
    console.log('Service Worker registered');
  } catch (err) {
    console.log('Failed to register Servive Worker', err);
  }
};

export default swRegister;
