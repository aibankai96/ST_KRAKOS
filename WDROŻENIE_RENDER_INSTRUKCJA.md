# 🚀 Instrukcja Wdrożenia na Render - ST KRAKOS

**Data:** 2025-01-27  
**Status:** ✅ Gotowe do wdrożenia

---

## 📋 Szybki Start

### 1. Sprawdzenie przed wdrożeniem

```bash
# Przejdź do folderu frontend
cd frontend

# Zbuduj aplikację lokalnie
npm run build

# Sprawdź czy build działa
npm run preview
```

Jeśli wszystko działa, możesz przystąpić do wdrożenia!

---

## 🎯 Wdrożenie na Render

### Krok 1: Przygotowanie kodu

1. **Upewnij się, że wszystko jest commitowane:**
   ```bash
   git status
   git add .
   git commit -m "Przygotowanie do wdrożenia na Render"
   git push origin main
   ```

### Krok 2: Konfiguracja Render

#### Opcja A: Automatyczna konfiguracja (zalecane)

1. Przejdź do [Render Dashboard](https://dashboard.render.com)
2. Kliknij **"New +"** → **"Static Site"**
3. Połącz swoje repozytorium GitHub/GitLab
4. Render automatycznie wykryje plik `render.yaml` w głównym folderze
5. Kliknij **"Create Static Site"**

#### Opcja B: Ręczna konfiguracja

Jeśli automatyczna konfiguracja nie działa:

1. W panelu Render ustaw:
   - **Name:** `st-krakos-frontend`
   - **Build Command:** `cd frontend && npm install && RENDER=true npm run build`
   - **Publish Directory:** `frontend/dist`
   - **Environment Variables:**
     - `NODE_ENV` = `production`
     - `RENDER` = `true`

### Krok 3: Czekanie na build

- Build trwa zwykle 2-5 minut
- Render pokazuje logi build w czasie rzeczywistym
- Po zakończeniu otrzymasz URL: `https://st-krakos-frontend.onrender.com`

---

## ⚙️ Konfiguracja

### Base Path

Aplikacja automatycznie używa:
- `/` dla Render (gdy `RENDER=true`)
- `/ST_KRAKOS/` dla GitHub Pages (domyślnie)

Nie musisz nic zmieniać - konfiguracja jest automatyczna!

### Service Worker

Service Worker automatycznie wykrywa base path i działa poprawnie zarówno na Render jak i GitHub Pages.

---

## ✅ Testowanie po wdrożeniu

### Sprawdź:

1. **Strona główna:**
   - [ ] Ładuje się poprawnie
   - [ ] Wszystkie sekcje są widoczne
   - [ ] Animacje działają (scroll reveal, hover effects)

2. **Nawigacja:**
   - [ ] Wszystkie linki działają
   - [ ] Smooth scrolling działa
   - [ ] Mobile menu działa

3. **Funkcjonalność:**
   - [ ] Przełącznik języka (PL/EN) działa
   - [ ] Animacje statystyk działają sekwencyjnie
   - [ ] Service Worker działa (PWA)

4. **Responsywność:**
   - [ ] Mobile (320px+)
   - [ ] Tablet (768px+)
   - [ ] Desktop (1024px+)

5. **Performance:**
   - [ ] Lighthouse score > 90
   - [ ] Szybkie ładowanie
   - [ ] Płynne animacje

---

## 🔧 Rozwiązywanie problemów

### Problem: Strona nie ładuje się

**Rozwiązanie:**
- Sprawdź logi build w Render Dashboard
- Upewnij się, że `RENDER=true` jest ustawione w Environment Variables
- Sprawdź czy wszystkie pliki są w `frontend/dist`

### Problem: Service Worker nie działa

**Rozwiązanie:**
- Sprawdź czy `sw.js` jest w `frontend/dist`
- Sprawdź konsole przeglądarki dla błędów
- Service Worker automatycznie dostosowuje base path

### Problem: Linki nie działają

**Rozwiązanie:**
- Render automatycznie obsługuje routing SPA
- Wszystkie linki powinny działać automatycznie
- Sprawdź czy base path jest ustawiony poprawnie

---

## 📝 Pliki konfiguracyjne

### render.yaml (główny folder)

```yaml
services:
  - type: web
    name: st-krakos-frontend
    env: static
    buildCommand: cd frontend && npm install && RENDER=true npm run build
    staticPublishPath: frontend/dist
    envVars:
      - key: NODE_ENV
        value: production
      - key: RENDER
        value: true
```

### vite.config.js

Konfiguracja automatycznie używa:
- Base path `/` dla Render
- Base path `/ST_KRAKOS/` dla lokalnego developmentu/GitHub Pages

---

## 🌍 Custom Domain (opcjonalnie)

1. W panelu Render wybierz `st-krakos-frontend`
2. Przejdź do **"Settings"**
3. W sekcji **"Custom Domain"** dodaj swoją domenę
4. Skonfiguruj DNS według instrukcji Render

---

## 💰 Koszty

### Free Tier:
- ✅ Static Sites są **DARMOWE**
- ✅ Brak limitów transferu
- ✅ Automatyczne HTTPS
- ⚠️ Sleep after 15 min nieaktywności (tylko dla Web Services, nie dla Static Sites)

---

## 🎉 Gotowe!

Po zakończeniu wdrożenia aplikacja będzie dostępna pod adresem:
**`https://st-krakos-frontend.onrender.com`**

**Powodzenia! 🚀**

---

## 📞 Wsparcie

Jeśli masz problemy:
1. Sprawdź logi build w Render Dashboard
2. Sprawdź konsole przeglądarki dla błędów
3. Przeczytaj dokumentację Render: https://render.com/docs

