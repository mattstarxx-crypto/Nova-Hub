// Nova Hub — UV Service Worker Registration
(async function () {
  if (!navigator.serviceWorker) {
    window.__novaSwReady = false;
    window.dispatchEvent(new CustomEvent("nova:sw", { detail: { ready: false } }));
    return;
  }
  try {
    await navigator.serviceWorker.register("/uv/uv.sw.js", { scope: "/uv/service/" });
    await navigator.serviceWorker.ready;
    window.__novaSwReady = true;
    window.dispatchEvent(new CustomEvent("nova:sw", { detail: { ready: true } }));
  } catch (e) {
    window.__novaSwReady = false;
    window.dispatchEvent(new CustomEvent("nova:sw", { detail: { ready: false } }));
  }
})();
