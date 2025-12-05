# ✅ Instrukcja Po Zmianie Repozytorium na Publiczne

**Status:** Zmieniasz repozytorium na publiczne ✅

---

## 📋 KROK PO KROKU - Po Zmianie na Publiczne

### KROK 1: Zmień Repozytorium na Publiczne w GitHub

1. Otwórz: https://github.com/aibankai96/ST_KRAKOS
2. Kliknij **Settings** (w górnym menu repozytorium)
3. Przewiń w dół do sekcji **"Danger Zone"**
4. Kliknij **"Change visibility"**
5. Wybierz **"Make public"**
6. Potwierdź zmianę

---

### KROK 2: Poczekaj na Synchronizację

- GitHub może potrzebować ~1-2 minut na synchronizację
- Odśwież stronę repozytorium i sprawdź czy jest publiczne

---

### KROK 3: W Render Dashboard - Utwórz Frontend

1. Przejdź do: https://dashboard.render.com
2. Kliknij **"New +"** → **"Static Site"**

---

### KROK 4: Połączenie z Repozytorium

**Opcja A - Wyszukiwanie:**
1. W polu wyszukiwania wpisz: `ST_KRAKOS`
2. Powinno teraz znaleźć repozytorium
3. Wybierz: `aibankai96 / ST_KRAKOS`

**Opcja B - Pełny URL (jeśli wyszukiwanie nie działa):**
1. Wybierz **"Public Git Repository"**
2. Wklej URL: `https://github.com/aibankai96/ST_KRAKOS`
3. Wybierz branch: `cleanup/safe-2025`

---

### KROK 5: Konfiguracja Static Site

Wypełnij formularz:

| Pole | Wartość |
|------|---------|
| **Name** | `st-krakos-frontend` |
| **Branch** | `cleanup/safe-2025` |
| **Root Directory** | `frontend` |
| **Build Command** | `npm install && RENDER=true npm run build:prod` |
| **Publish Directory** | `dist` |

---

### KROK 6: Environment Variables

Kliknij **"Add Environment Variable"** i dodaj:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `RENDER` | `true` |
| `VITE_API_URL` | `https://st-krakos.onrender.com/api` |

---

### KROK 7: Create Static Site

1. Sprawdź wszystkie pola
2. Kliknij **"Create Static Site"**
3. Poczekaj na wdrożenie (~3-7 minut)

---

## ✅ Po Wdrożeniu

### 1. Sprawdź URL Frontendu

Render wygeneruje URL typu:
```
https://st-krakos-frontend.onrender.com
```

### 2. Zaktualizuj CORS w Backendzie

W Render Dashboard → Backend (`ST_KRAKOS`) → Settings → Environment Variables:

1. Znajdź `CORS_ORIGINS`
2. Kliknij **"Edit"**
3. Zmień na:
   ```
   https://st-krakos-frontend.onrender.com
   ```
4. Zapisz

### 3. Przetestuj Aplikację

1. Otwórz URL frontendu w przeglądarce
2. Sprawdź czy strona się ładuje
3. Sprawdź czy puzzle loader działa

---

## 🔒 Bezpieczeństwo - Publiczne Repozytorium

**Czy to bezpieczne?**

✅ **TAK** - jeśli:
- Nie przechowujesz wrażliwych danych w kodzie
- Wszystkie klucze API są w Environment Variables (nie w kodzie)
- `.env` jest w `.gitignore`

⚠️ **Sprawdź:**
- Czy `.env` jest w `.gitignore`?
- Czy nie ma hardcoded API keys w kodzie?
- Czy wszystkie secrets są w Environment Variables?

---

## 📋 Checklista

- [ ] Repozytorium zmienione na publiczne w GitHub
- [ ] Render Dashboard otwarty
- [ ] Utworzenie Static Site rozpoczęte
- [ ] Repozytorium znalezione w Render
- [ ] Konfiguracja wypełniona
- [ ] Environment Variables dodane
- [ ] Static Site utworzony
- [ ] Frontend wdrożony
- [ ] CORS zaktualizowany w backendzie

---

**Po zmianie na publiczne, Render powinien łatwo znaleźć repozytorium! 🚀**

