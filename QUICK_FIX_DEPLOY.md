# ⚡ Szybkie Rozwiązanie Problemu z Deploy

## 🔧 Problem:
Deploy się nie robi / Build się nie powodzi

## ✅ ROZWIĄZANIE:

### W Render Dashboard → Settings → Build & Deploy:

**Zmień Build Command na:**
```
npm install && RENDER=true npm run build:prod
```

**LUB jeszcze prostsze:**
```
npm install && RENDER=true vite build
```

---

## 📋 Pełna Konfiguracja:

- **Name:** `st-krakos-frontend`
- **Root Directory:** `frontend`
- **Build Command:** `npm install && RENDER=true npm run build:prod`
- **Publish Directory:** `dist`
- **Environment Variables:**
  - `NODE_ENV` = `production`
  - `RENDER` = `true`

---

**Po zmianie Build Command zapisz i Render automatycznie ponownie wdroży! 🚀**

