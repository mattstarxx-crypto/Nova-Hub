# 🚀 NOVA HUB — Deploy Guide

## ⚠️ IMPORTANT: Vercel vs Render

| Platform | Works? | Notes |
|---|---|---|
| **Render** ✅ | **YES — RECOMMENDED** | Supports WebSockets (wisp), full UV |
| **Railway** ✅ | YES | Same as Render |
| Vercel ⚠️ | Partial | No WebSocket support — UV loads but games with WS may fail |

**Best free option: Deploy to [Render.com](https://render.com)** — it's free, supports WebSockets, and takes 3 minutes.

---

## Deploy to Render (Recommended ✅)

1. Push this folder to a **GitHub repo**
2. Go to [render.com](https://render.com) → **New** → **Web Service**
3. Connect your GitHub repo
4. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
5. Click **Deploy** 🎉

Free tier spins down after inactivity — first load may take ~30s.

---

## Deploy to Vercel (partial WebSocket support)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Click Deploy

UV will work for most sites. WebSocket-based games may not load — toggle to CroxyProxy if that happens.

---

## Local Development

```bash
npm install
npm start
# Open http://localhost:3000
```

---

## How it works

```
Browser
  └─ Service Worker (UV)
       └─ Intercepts fetch/XHR
            └─ XOR-encodes target URL
                 └─ Bare Server (/bare/) or Wisp (/wisp/)
                      └─ Proxies real HTTP/WS request
                           └─ Returns rewritten response
```

✅ Bypasses X-Frame-Options  
✅ No CORS errors  
✅ Works on restricted networks  
✅ WebSockets (games) — on Render  

---

## Package reference (exact npm names)

```json
"@titaniumnetwork-dev/ultraviolet": "^3.2.6",
"@tomphttp/bare-server-node": "^2.0.3",
"@mercuryworkshop/bare-mux": "^2.0.3",
"@mercuryworkshop/epoxy-transport": "^2.1.3",
"@mercuryworkshop/bare-as-module3": "^2.2.2",
"wisp-server-node": "^1.1.3",
"express": "^4.18.2"
```

---

## Add games/apps

In `public/index.html`, duplicate any card:

```html
<div class="card game-card" onclick="openSite('https://site.com','Name')">
  <div class="sweep"></div><span class="c-bl"></span><span class="c-br"></span>
  <span class="card-icon">🎮</span>
  <div class="card-title">Name</div>
  <div class="card-desc">Description.</div>
</div>
```
