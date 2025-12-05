# 🔍 Rozwiązanie Problemu - Pusta Strona na Domenie

**Problem:** Otwierasz `https://stkratos.com` i nic nie widzisz

---

## 🔍 KROK 1: Sprawdź Logi Builda w Render

### W Render Dashboard:

1. Przejdź do **Frontend Service** (`st-krakos-frontend`)
2. Kliknij zakładkę **"Logs"**
3. Sprawdź **Build Logs** (nie Runtime Logs!)

**Szukaj:**
- Czy build się powiódł? (szukaj `✓ built in XXXms` lub `Build successful`)
- Czy są błędy? (szukaj `ERROR`, `FAILED`)

**Jeśli build się nie powiódł:**
- Sprawdź błędy w logach
- Sprawdź czy `Build Command` jest poprawny
- Sprawdź czy `Publish Directory` jest poprawny

---

## 🔍 KROK 2: Sprawdź Konfigurację w Render

### W Render Dashboard → Frontend → Settings:

**Sprawdź:**

1. **Build Command:**
   ```
   npm install && RENDER=true npm run build:prod
   ```
   ✅ Powinno być dokładnie tak

2. **Publish Directory:**
   ```
   dist
   ```
   ✅ Powinno być `dist` (nie `frontend/dist`!)

3. **Root Directory:**
   ```
   frontend
   ```
   ✅ Powinno być `frontend`

---

## 🔍 KROK 3: Sprawdź Konsolę Przeglądarki

1. Otwórz `https://stkratos.com` w przeglądarce
2. Naciśnij **F12** (konsola przeglądarki)
3. Przejdź do zakładki **"Console"**
4. Sprawdź czy są błędy

**Szukaj błędów typu:**
- `Failed to load resource`
- `404 Not Found`
- `CORS policy`
- `Uncaught Error`

**Skopiuj wszystkie błędy i wyślij mi!**

---

## 🔍 KROK 4: Sprawdź Network Tab

1. W konsoli przeglądarki (F12) przejdź do zakładki **"Network"**
2. Odśwież stronę (F5)
3. Sprawdź wszystkie requesty

**Szukaj:**
- Czy `index.html` się ładuje? (status 200?)
- Czy pliki CSS/JS się ładują? (status 200?)
- Czy są błędy 404?

---

## 🔍 KROK 5: Sprawdź Environment Variables

### W Render Dashboard → Frontend → Settings → Environment Variables:

**Sprawdź czy masz:**

| Key | Value | Status |
|-----|-------|--------|
| `NODE_ENV` | `production` | ✅/❌ |
| `RENDER` | `true` | ✅/❌ |
| `VITE_API_URL` | `https://st-krakos.onrender.com/api` | ✅/❌ |

**Jeśli `VITE_API_URL` nie jest ustawione:**
- Dodaj je teraz
- Frontend automatycznie się zredeployuje

---

## 🚨 NAJCZĘSTSZE PROBLEMY

### Problem 1: Publish Directory jest nieprawidłowy

**Objaw:** Pusta strona, błędy 404 w Network tab

**Rozwiązanie:**
- W Render → Settings → Publish Directory
- Upewnij się, że jest: `dist` (nie `frontend/dist`!)

### Problem 2: Build się nie powiódł

**Objaw:** Błędy w Build Logs

**Rozwiązanie:**
- Sprawdź Build Logs w Render
- Sprawdź czy `Build Command` jest poprawny
- Sprawdź czy wszystkie zależności są zainstalowane

### Problem 3: Błędy JavaScript

**Objaw:** Błędy w konsoli przeglądarki

**Rozwiązanie:**
- Sprawdź konsolę (F12 → Console)
- Sprawdź czy wszystkie pliki się ładują
- Sprawdź czy `VITE_API_URL` jest ustawione

### Problem 4: Base Path Problem

**Objaw:** Pliki się nie ładują, błędy 404

**Rozwiązanie:**
- Sprawdź `vite.config.js` - `base` powinno być `/` dla Render
- Sprawdź czy `RENDER=true` jest w Environment Variables

---

## 📋 Checklista Diagnostyczna

- [ ] Build Logs sprawdzone - czy build się powiódł?
- [ ] Publish Directory = `dist` (sprawdzone)
- [ ] Build Command poprawny (sprawdzone)
- [ ] Environment Variables ustawione (sprawdzone)
- [ ] Konsola przeglądarki sprawdzona (F12 → Console)
- [ ] Network tab sprawdzony (F12 → Network)
- [ ] Błędy skopiowane i zapisane

---

## 💡 Szybkie Sprawdzenie

**Otwórz w przeglądarce:**
```
https://stkratos.com
```

**Naciśnij F12 i sprawdź:**
1. **Console** - jakie błędy?
2. **Network** - czy pliki się ładują?
3. **Elements** - czy HTML jest w DOM?

---

**Wyślij mi:**
1. Błędy z konsoli przeglądarki (F12 → Console)
2. Błędy z Build Logs w Render (jeśli są)
3. Co widzisz w Network tab (F12 → Network)

**Na podstawie tych informacji będę mógł dokładnie zdiagnozować problem! 🔍**

