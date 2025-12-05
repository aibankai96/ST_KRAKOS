# 📋 Następne Kroki Po Utworzeniu Frontendu

---

## ✅ KROK 1: Sprawdź Czy Frontend Jest Wdrożony

W Render Dashboard sprawdź:

1. Czy widzisz serwis `st-krakos-frontend`?
2. Czy status to **"Live"** (zielony)?
3. Jaki jest URL frontendu? (np. `https://st-krakos-frontend.onrender.com`)

**Jeśli frontend jest w trakcie wdrażania:**
- Poczekaj ~3-7 minut
- Sprawdź logi builda (Build Logs)
- Upewnij się, że build się powiódł

---

## ✅ KROK 2: Zaktualizuj CORS w Backendzie

**To jest WAŻNE!** Bez tego frontend nie będzie mógł komunikować się z backendem.

### W Render Dashboard:

1. Przejdź do **Backend Service** (`ST_KRAKOS`)
2. Kliknij **Settings**
3. Kliknij **Environment Variables**
4. Znajdź `CORS_ORIGINS`
5. Kliknij **"Edit"** (lub **"Add"** jeśli nie istnieje)

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

⚠️ **WAŻNE:** Zastąp `st-krakos-frontend.onrender.com` swoim rzeczywistym URL frontendu!

6. Kliknij **"Save Changes"**
7. Backend automatycznie się zrestartuje (~1-2 minuty)

---

## ✅ KROK 3: Sprawdź Czy Wszystko Działa

### Test 1: Backend

Otwórz w przeglądarce:
```
https://st-krakos.onrender.com/api/health
```

**Powinieneś zobaczyć:**
```json
{"status":"ok","service":"ST KRAKOS Backend","version":"1.0.0"}
```

✅ Jeśli widzisz to - backend działa!

### Test 2: Frontend

Otwórz w przeglądarce:
```
https://st-krakos-frontend.onrender.com
```

**Powinieneś zobaczyć:**
- Puzzle loader (czerwone puzzle + "ST KRAKOS")
- Po ~3 sekundach strona główna
- Sekcje: Home, AI Stats, About, Services, Portfolio, Contact

✅ Jeśli widzisz to - frontend działa!

### Test 3: Komunikacja Frontend-Backend

1. Otwórz frontend w przeglądarce
2. Naciśnij **F12** (konsola przeglądarki)
3. Przejdź do zakładki **"Console"**
4. Sprawdź czy nie ma błędów CORS lub 404

**Jeśli widzisz błędy:**
- `CORS policy` → Sprawdź `CORS_ORIGINS` w backendzie
- `404` → Sprawdź `VITE_API_URL` w frontendzie
- `Failed to fetch` → Sprawdź czy backend działa

---

## ✅ KROK 4: Sprawdź Environment Variables

### Frontend (`st-krakos-frontend`):

| Key | Value | Status |
|-----|-------|--------|
| `NODE_ENV` | `production` | ✅/❌ |
| `RENDER` | `true` | ✅/❌ |
| `VITE_API_URL` | `https://st-krakos.onrender.com/api` | ✅/❌ |

### Backend (`ST_KRAKOS`):

| Key | Value | Status |
|-----|-------|--------|
| `CORS_ORIGINS` | `https://st-krakos-frontend.onrender.com` | ✅/❌ |
| `SECRET_KEY` | (ustawione) | ✅/❌ |
| `FLASK_ENV` | `production` | ✅/❌ |

---

## ✅ KROK 5: Finalne Sprawdzenie

### Checklista:

- [ ] Frontend jest wdrożony i działa (status "Live")
- [ ] Masz URL frontendu
- [ ] `CORS_ORIGINS` w backendzie zawiera URL frontendu
- [ ] Backend odpowiada na `/api/health`
- [ ] Frontend ładuje się poprawnie
- [ ] Nie ma błędów w konsoli przeglądarki
- [ ] Puzzle loader działa
- [ ] Wszystkie sekcje strony się wyświetlają

---

## 🎉 Jeśli Wszystko Działa

**Gratulacje! Aplikacja jest wdrożona! 🚀**

Masz teraz:
- ✅ Backend: `https://st-krakos.onrender.com`
- ✅ Frontend: `https://st-krakos-frontend.onrender.com`

---

## 🚨 Jeśli Coś Nie Działa

### Problem: Frontend nie ładuje się
- Sprawdź logi builda w Render
- Sprawdź czy `Publish Directory` = `dist`
- Sprawdź konsolę przeglądarki (F12)

### Problem: Błędy CORS
- Sprawdź `CORS_ORIGINS` w backendzie
- Upewnij się, że zawiera URL frontendu
- Zrestartuj backend

### Problem: Błędy 404 w API
- Sprawdź `VITE_API_URL` w frontendzie
- Upewnij się, że kończy się na `/api`
- Zredeploy frontend

---

## 📞 Co Dalej?

**Odpowiedz na te pytania:**

1. **Czy frontend został utworzony w Render?**
   - [ ] TAK - widzę serwis `st-krakos-frontend`
   - [ ] NIE - jeszcze nie utworzyłem
   - [ ] W TRAKCIE - czekam na wdrożenie

2. **Jaki jest URL frontendu?**
   - `https://________________.onrender.com`

3. **Czy frontend się ładuje?**
   - [ ] TAK - widzę stronę
   - [ ] NIE - błąd
   - [ ] NIE SPRAWDZAŁEM

4. **Czy zaktualizowałeś CORS w backendzie?**
   - [ ] TAK
   - [ ] NIE
   - [ ] NIE WIEM JAK

---

**Daj znać na którym kroku jesteś, a pomogę Ci dalej! 🚀**

