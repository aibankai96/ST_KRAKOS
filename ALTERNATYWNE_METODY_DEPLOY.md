# 🔄 Alternatywne Metody Wdrożenia Frontendu

**Problem:** Render nie znajduje repozytorium "ST KRAKOS"

---

## ✅ METODA 1: Użyj Pełnego URL Repozytorium

### W Render Dashboard:

1. Kliknij **"New +"** → **"Static Site"**
2. Zamiast wyszukiwać, użyj **"Public Git Repository"**
3. Wklej pełny URL:
   ```
   https://github.com/aibankai96/ST_KRAKOS
   ```
4. Wybierz branch: `cleanup/safe-2025`
5. Kontynuuj konfigurację jak wcześniej

---

## ✅ METODA 2: Sprawdź Czy Repozytorium Jest Publiczne

1. Otwórz: https://github.com/aibankai96/ST_KRAKOS
2. Sprawdź czy repozytorium jest **publiczne** (nie prywatne)
3. Jeśli jest prywatne:
   - Render wymaga autoryzacji GitHub
   - Upewnij się, że połączyłeś konto GitHub w Render

---

## ✅ METODA 3: Ręczne Wdrożenie przez GitHub Actions

### Krok 1: Utwórz Plik GitHub Actions

Utwórz plik: `.github/workflows/deploy-frontend.yml`

```yaml
name: Deploy Frontend to Render

on:
  push:
    branches:
      - cleanup/safe-2025
    paths:
      - 'frontend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        working-directory: ./frontend
        run: npm install
      
      - name: Build
        working-directory: ./frontend
        env:
          RENDER: true
        run: npm run build:prod
      
      - name: Deploy to Render
        uses: johnbeynon/render-deploy@v1.0.0
        with:
          service-id: ${{ secrets.RENDER_SERVICE_ID }}
          api-key: ${{ secrets.RENDER_API_KEY }}
```

### Krok 2: Uzyskaj Render API Key

1. Render Dashboard → Account Settings → API Keys
2. Utwórz nowy API Key
3. Skopiuj klucz

### Krok 3: Dodaj Secrets w GitHub

1. GitHub → Repozytorium → Settings → Secrets → Actions
2. Dodaj:
   - `RENDER_SERVICE_ID` = ID serwisu frontendu (po utworzeniu)
   - `RENDER_API_KEY` = Twój API Key z Render

---

## ✅ METODA 4: Wdrożenie przez Netlify (Alternatywa)

### Krok 1: Utwórz Konto na Netlify

1. Przejdź do: https://www.netlify.com
2. Zaloguj się przez GitHub

### Krok 2: Nowy Site z Git

1. Kliknij **"Add new site"** → **"Import an existing project"**
2. Wybierz **GitHub** → `aibankai96 / ST_KRAKOS`
3. Wypełnij:
   - **Branch:** `cleanup/safe-2025`
   - **Base directory:** `frontend`
   - **Build command:** `npm install && RENDER=true npm run build:prod`
   - **Publish directory:** `frontend/dist`

### Krok 3: Environment Variables

Dodaj:
- `NODE_ENV` = `production`
- `RENDER` = `true`
- `VITE_API_URL` = `https://st-krakos.onrender.com/api`

---

## ✅ METODA 5: Wdrożenie przez Vercel (Alternatywa)

### Krok 1: Utwórz Konto na Vercel

1. Przejdź do: https://vercel.com
2. Zaloguj się przez GitHub

### Krok 2: Import Project

1. Kliknij **"Add New..."** → **"Project"**
2. Wybierz repozytorium: `aibankai96 / ST_KRAKOS`
3. Wypełnij:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build:prod`
   - **Output Directory:** `dist`

### Krok 3: Environment Variables

Dodaj:
- `NODE_ENV` = `production`
- `RENDER` = `true`
- `VITE_API_URL` = `https://st-krakos.onrender.com/api`

---

## ✅ METODA 6: Ręczne Wdrożenie (Build Lokalnie)

### Krok 1: Zbuduj Frontend Lokalnie

```bash
cd frontend
npm install
RENDER=true npm run build:prod
```

### Krok 2: Wgraj Pliki do Render

1. Render Dashboard → Utwórz **Static Site**
2. Wybierz **"Upload files"** zamiast Git
3. Wgraj zawartość folderu `frontend/dist`

---

## ✅ METODA 7: Użyj Innej Nazwy Repozytorium

Jeśli Render nie znajduje "ST KRAKOS", spróbuj:

1. W Render użyj **"Public Git Repository"**
2. Wklej URL: `https://github.com/aibankai96/ST_KRAKOS.git`
3. Lub użyj SSH: `git@github.com:aibankai96/ST_KRAKOS.git`

---

## 🎯 REKOMENDOWANA METODA

**Najprostsza:** **METODA 1** - użyj pełnego URL repozytorium

1. Render Dashboard → **"New +"** → **"Static Site"**
2. Wybierz **"Public Git Repository"**
3. Wklej: `https://github.com/aibankai96/ST_KRAKOS`
4. Wybierz branch: `cleanup/safe-2025`
5. Kontynuuj konfigurację

---

## 🔍 Troubleshooting

### Problem: Render nie znajduje repozytorium
- Sprawdź czy repozytorium jest publiczne
- Użyj pełnego URL zamiast wyszukiwania
- Sprawdź czy masz dostęp do repozytorium w GitHub

### Problem: Brak dostępu do repozytorium
- Upewnij się, że połączyłeś konto GitHub w Render
- Sprawdź uprawnienia w GitHub Settings → Applications

---

**Którą metodę chcesz wypróbować? Polecam METODĘ 1 - najprostsza! 🚀**

