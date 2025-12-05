# 📋 Krok po Kroku - Deploy Frontendu na Render

**Jeśli nie widzisz deploy - wykonaj te kroki:**

---

## KROK 1: Sprawdź czy Static Site istnieje

1. Otwórz **Render Dashboard**: https://dashboard.render.com
2. Sprawdź czy widzisz serwis o nazwie `st-krakos-frontend`
   - Jeśli **TAK** → przejdź do KROK 2
   - Jeśli **NIE** → przejdź do KROK 1A

### KROK 1A: Utwórz nowy Static Site

1. Kliknij **"New +"** (w prawym górnym rogu)
2. Wybierz **"Static Site"** (nie Web Service!)
3. Wypełnij formularz:

#### **Connect Repository:**
- Wybierz **GitHub**
- Autoryzuj dostęp jeśli potrzebne
- Wybierz repozytorium: `aibankai96 / ST_KRAKOS`

#### **Configure Static Site:**

**Name:**
```
st-krakos-frontend
```

**Branch:**
```
cleanup/safe-2025
```

**Root Directory:**
```
frontend
```

**Build Command:**
```
npm install && RENDER=true npm run build:prod
```

**Publish Directory:**
```
dist
```

4. Kliknij **"Add Environment Variable"** i dodaj:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `RENDER` | `true` |

5. Kliknij **"Create Static Site"**

---

## KROK 2: Sprawdź konfigurację istniejącego serwisu

1. Kliknij na serwis `st-krakos-frontend`
2. Kliknij **Settings**
3. Sprawdź czy wszystkie pola są zgodne z KROK 1A
4. Jeśli coś jest nie tak - popraw i zapisz

---

## KROK 3: Sprawdź czy deploy się uruchamia

1. W widoku serwisu sprawdź zakładkę **"Events"** lub **"Deploys"**
2. Czy widzisz jakiekolwiek deployy?
   - Jeśli **TAK** → przejdź do KROK 4
   - Jeśli **NIE** → przejdź do KROK 3A

### KROK 3A: Ręczne uruchomienie deploy

1. Kliknij **"Manual Deploy"** (lub **"Deploy"**)
2. Wybierz **"Deploy latest commit"**
3. Poczekaj na wynik

---

## KROK 4: Sprawdź logi

1. Kliknij zakładkę **"Logs"**
2. Sprawdź **Build Logs** (nie Runtime Logs!)
3. Czy widzisz błędy?
   - Jeśli **TAK** → skopiuj błąd i wyślij mi
   - Jeśli **NIE** → przejdź do KROK 5

---

## KROK 5: Sprawdź czy build się powiódł

1. W zakładce **"Logs"** → **Build Logs**
2. Szukaj linii typu:
   ```
   ✓ built in XXXms
   ```
   lub
   ```
   Build successful 🎉
   ```
3. Czy widzisz taką linię?
   - Jeśli **TAK** → build się powiódł, sprawdź URL
   - Jeśli **NIE** → sprawdź błędy w logach

---

## KROK 6: Sprawdź URL

1. W widoku serwisu znajdź **URL** (np. `https://st-krakos-frontend.onrender.com`)
2. Kliknij na URL lub skopiuj go
3. Otwórz w przeglądarce
4. Czy strona się ładuje?
   - Jeśli **TAK** → ✅ Deploy działa!
   - Jeśli **NIE** → sprawdź błędy w konsoli przeglądarki

---

## 🚨 TYPOWE PROBLEMY I ROZWIĄZANIA

### Problem: "Build Command not found"
**Rozwiązanie:** Sprawdź czy Build Command jest dokładnie:
```
npm install && RENDER=true npm run build:prod
```

### Problem: "Root Directory not found"
**Rozwiązanie:** Sprawdź czy Root Directory = `frontend` (nie puste!)

### Problem: "Publish Directory not found"
**Rozwiązanie:** Sprawdź czy Publish Directory = `dist` (nie `frontend/dist`!)

### Problem: "Environment variable RENDER not set"
**Rozwiązanie:** Dodaj Environment Variable: `RENDER` = `true`

### Problem: "Build fails with npm errors"
**Rozwiązanie:** Spróbuj Build Command:
```
npm ci && RENDER=true vite build
```

---

## ✅ CHECKLISTA SUKCESU

- [ ] Static Site utworzony
- [ ] Konfiguracja zgodna z instrukcją
- [ ] Environment Variables ustawione
- [ ] Deploy się uruchomił
- [ ] Build się powiódł (widzę w logach)
- [ ] URL działa i strona się ładuje

---

**Jeśli wszystkie punkty są zaznaczone - deploy działa! 🎉**

