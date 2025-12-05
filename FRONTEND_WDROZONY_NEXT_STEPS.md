# ✅ Frontend Wdrożony - Następne Kroki

**Frontend URL:** `https://st-krakos-frontend.onrender.com` ✅

---

## ✅ KROK 1: Sprawdź Czy Frontend Działa

Otwórz w przeglądarce:
```
https://st-krakos-frontend.onrender.com
```

**Powinieneś zobaczyć:**
- Puzzle loader (czerwone puzzle + "ST KRAKOS")
- Po ~3 sekundach strona główna
- Sekcje: Home, AI Stats, About, Services, Portfolio, Contact

**Jeśli widzisz błąd lub pustą stronę:**
- Sprawdź konsolę przeglądarki (F12)
- Sprawdź logi w Render (Build Logs)

---

## ✅ KROK 2: Zaktualizuj CORS w Backendzie

**To jest WAŻNE!** Bez tego frontend nie będzie mógł komunikować się z backendem.

### W Render Dashboard:

1. Przejdź do **Backend Service** (`ST_KRAKOS`)
2. Kliknij **Settings**
3. Kliknij **Environment Variables**
4. Znajdź `CORS_ORIGINS`
5. Kliknij **"Edit"**

### Ustaw wartość:

**Jeśli `CORS_ORIGINS` już istnieje:**
- Dodaj URL frontendu oddzielony przecinkiem:
  ```
  https://st-krakos-frontend.onrender.com,https://st-krakos.onrender.com
  ```

**Jeśli `CORS_ORIGINS` nie istnieje:**
- Dodaj nową zmienną:
  - Key: `CORS_ORIGINS`
  - Value: `https://st-krakos-frontend.onrender.com`

6. Kliknij **"Save Changes"**
7. Backend automatycznie się zrestartuje (~1-2 minuty)

---

## ✅ KROK 3: Sprawdź Komunikację Frontend-Backend

1. Otwórz frontend: `https://st-krakos-frontend.onrender.com`
2. Naciśnij **F12** (konsola przeglądarki)
3. Przejdź do zakładki **"Console"**
4. Sprawdź czy nie ma błędów

**Jeśli widzisz błędy:**
- `CORS policy` → Sprawdź `CORS_ORIGINS` w backendzie
- `404` → Sprawdź `VITE_API_URL` w frontendzie
- `Failed to fetch` → Sprawdź czy backend działa

---

## ✅ KROK 4: Sprawdź Environment Variables Frontendu

W Render Dashboard → Frontend (`st-krakos-frontend`) → Settings → Environment Variables:

**Sprawdź czy masz:**

| Key | Value | Status |
|-----|-------|--------|
| `NODE_ENV` | `production` | ✅/❌ |
| `RENDER` | `true` | ✅/❌ |
| `VITE_API_URL` | `https://st-krakos.onrender.com/api` | ✅/❌ |

**Jeśli `VITE_API_URL` nie jest ustawione:**
1. Kliknij **"Add Environment Variable"**
2. Key: `VITE_API_URL`
3. Value: `https://st-krakos.onrender.com/api`
4. Zapisz
5. Frontend automatycznie się zredeployuje

---

## ✅ KROK 5: Testy

### Test 1: Backend
```
https://st-krakos.onrender.com/api/health
```
Powinno zwrócić: `{"status":"ok","service":"ST KRAKOS Backend","version":"1.0.0"}`

### Test 2: Frontend
```
https://st-krakos-frontend.onrender.com
```
Powinna wyświetlić się strona z puzzle loaderem

### Test 3: Konsola Przeglądarki
- Otwórz frontend
- F12 → Console
- Sprawdź czy nie ma błędów

---

## 🎉 Jeśli Wszystko Działa

**Gratulacje! Aplikacja jest w pełni wdrożona! 🚀**

Masz teraz:
- ✅ Backend: `https://st-krakos.onrender.com`
- ✅ Frontend: `https://st-krakos-frontend.onrender.com`

---

## 📋 Checklista

- [ ] Frontend działa (widzę stronę)
- [ ] `CORS_ORIGINS` w backendzie zawiera URL frontendu
- [ ] `VITE_API_URL` w frontendzie jest ustawione
- [ ] Backend odpowiada na `/api/health`
- [ ] Nie ma błędów w konsoli przeglądarki
- [ ] Puzzle loader działa
- [ ] Wszystkie sekcje strony się wyświetlają

---

**Daj znać czy wszystko działa, czy są jakieś problemy! 🚀**

