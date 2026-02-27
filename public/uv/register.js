// Nova Hub — Ultraviolet SW Registration
(async function () {
  if (!navigator.serviceWorker) {
    console.warn("[Nova] Service workers not supported");
    window.__novaSwReady = false;
    window.dispatchEvent(new CustomEvent("nova:sw", { detail: { ready: false } }));
    return;
  }

  try {
    const reg = await navigator.serviceWorker.register("/uv/uv.sw.js", {
      scope: "/uv/service/",
    });
    await navigator.serviceWorker.ready;
    window.__novaSwReady = true;
    console.log("[Nova] UV Service Worker registered ✅");
    window.dispatchEvent(new CustomEvent("nova:sw", { detail: { ready: true } }));
  } catch (e) {
    window.__novaSwReady = false;
    console.warn("[Nova] SW failed:", e);
    window.dispatchEvent(new CustomEvent("nova:sw", { detail: { ready: false, error: e.message } }));
  }
})();
