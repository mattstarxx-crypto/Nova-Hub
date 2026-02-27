# 🚀 NOVA HUB — Vercel Deploy Guide (Ultraviolet Proxy)

## What's inside
```
novahub/
├── public/
│   ├── index.html          ← Main Nova Hub UI
│   └── uv/
│       ├── register.js     ← SW registration
│       ├── uv.config.js    ← UV config
│       └── uv.sw.js        ← (copied by postinstall)
├── scripts/
│   └── copy-assets.js      ← Copies UV files after npm install
├── server.js               ← Express + Bare server
├── package.json
├── vercel.json
└── README.md
```

---

## Deploy to Vercel (2 ways)

### ✅ Option A — GitHub + Vercel (Recommended)
1. Push this folder to a **new GitHub repo**
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repo
4. Click **Deploy** — Vercel runs `npm install` automatically
5. Done! Your Nova Hub is live 🎉

The `postinstall` script automatically copies UV files after install.

### ✅ Option B — Vercel CLI
```bash
npm install -g vercel
cd novahub
vercel
```

---

## How Ultraviolet works

```
Browser → Service Worker (UV)
             ↓  intercepts fetch
         Encodes target URL (XOR)
             ↓
         Bare Server (/bare/)
             ↓  proxies real HTTP request
         Target site (YouTube, Discord, etc.)
             ↓
         SW rewrites response → renders in page
```

✅ Bypasses X-Frame-Options  
✅ Bypasses CORS  
✅ Works on school/work networks  
✅ WebSockets supported (games work)  
✅ No detectable proxy headers  

---

## Add your own games/apps

Find the cards section in `public/index.html` and add:

```html
<div class="card game-card" onclick="openSite('https://yoursite.com','Site Name')">
  <div class="sweep"></div><span class="c-bl"></span><span class="c-br"></span>
  <span class="card-icon">🎮</span>
  <div class="card-title">Site Name</div>
  <div class="card-desc">Short description.</div>
</div>
```

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Status dot red | Must be on HTTPS (Vercel gives you this free) |
| Site not loading | Toggle to CroxyProxy engine in Proxy tab |
| Build fails | Check Vercel build logs — bare-server-node v3 needs Node 18+ |
| SW not registering | Check `/uv/uv.sw.js` exists in your deploy |

