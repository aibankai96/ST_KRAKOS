# 🔧 Naprawa: vite not found

## ❌ Problem

Błąd: `sh: 1: vite: not found`

**Przyczyna:** `vite` jest w `devDependencies`, a gdy `NODE_ENV=production`, npm nie instaluje devDependencies. Vite jest potrzebny do builda, więc musi być w `dependencies`.

---

## ✅ Rozwiązanie

Zaktualizowałem `frontend/package.json`:
- Przeniosłem `vite` z `devDependencies` do `dependencies`

---

## 📋 Co dalej?

### Krok 1: Commit i push zmian

```bash
git add frontend/package.json
git commit -m "Fix: Move vite to dependencies for production build"
git push origin cleanup/safe-2025
```

### Krok 2: Render automatycznie zredeployuje

Po pushu, Render:
1. Wykryje zmianę w `package.json`
2. Zainstaluje `vite` jako dependency
3. Zredeployuje frontend

**Czas oczekiwania:** 2-5 minut

---

## ✅ Weryfikacja po naprawie

### Sprawdź logi
1. Render Dashboard → st-krakos-frontend → **Logs**
2. Powinno być:
   - ✅ `Installing vite` (jako dependency)
   - ✅ `npm run build:prod` działa
   - ✅ Build się powiódł
   - ✅ Frontend został wdrożony

### Test frontendu
Otwórz w przeglądarce:
```
https://st-krakos-frontend.onrender.com
```

**Sprawdź:**
- ✅ Strona się ładuje
- ✅ W konsoli przeglądarki (F12) nie ma błędów
- ✅ API działa (połączenie z backendem)

---

## 📝 Zmiany w package.json

### Przed:
```json
"devDependencies": {
  "vite": "^5.0.0",
  ...
}
```

### Po:
```json
"dependencies": {
  "vite": "^5.0.0"
},
"devDependencies": {
  ...
}
```

---

## 🚨 Alternatywne rozwiązanie (jeśli nie chcesz zmieniać package.json)

Możesz też zmienić build command w Render na:
```
cd frontend && npm install --include=dev && RENDER=true npm run build:prod
```

Ale lepiej przenieść vite do dependencies, bo jest potrzebny do builda w produkcji.

---

**Po commit i push, frontend powinien się zbudować bez błędów! 🎉**

