# 303 Apparel (Express + MongoDB Atlas)

Site files are in `public/`. API and database code: `server.js`, `models.js`, `seed.js`.

## Run locally (PowerShell)
```powershell
cd "C:\path\to\303Apparel-V8-db"      # the folder that contains server.js
copy .env.example .env                # then edit .env: MONGODB_URI and ADMIN_KEY
npm install
npm start                             # http://localhost:3000
```

## Collections
products, customers, orders, messages, promos (seeded from `public/assets/js/data.js` when empty).

## Deploy (Render)
Web Service, Build: `npm install`, Start: `npm start`, env vars `MONGODB_URI` and `ADMIN_KEY`.
In Atlas > Network Access, allow `0.0.0.0/0` so Render can connect.
