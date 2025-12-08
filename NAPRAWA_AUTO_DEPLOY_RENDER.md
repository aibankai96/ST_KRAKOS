# 🔧 Naprawa Auto-Deploy w Render - Krok po Kroku

## ❌ Problem

Render nie wprowadza automatycznie zmian po pushu do GitHub.

**Najnowszy commit:** `31ffdc8` - "Update Service Worker cache version to v1.0.3"

**PRZYCZYNA:** Auto-Deploy jest wyłączone (Off) w ustawieniach Render!

---

## ✅ Rozwiązanie - Krok po Kroku

### KROK 1: Włącz Auto-Deploy (KRYTYCZNE!)

#### Frontend (st-krakos-frontend):

1. Otwórz: **https://dashboard.render.com**
2. Kliknij na serwis: **st-krakos-frontend**
3. Kliknij: **Settings** (lewe menu)
4. Przewiń do sekcji: **Build & Deploy**
5. Znajdź opcję: **Auto-Deploy**
6. **Kliknij: Edit** (obok Auto-Deploy)
7. **Zmień z `Off` na `On`**
8. **Kliknij: Save Changes**

#### Backend (st-krakos-backend):

1. Otwórz: **https://dashboard.render.com**
2. Kliknij na serwis: **st-krakos-backend**
3. Kliknij: **Settings** (lewe menu)
4. Przewiń do sekcji: **Build & Deploy**
5. Sprawdź opcję: **Auto-Deploy**
   - ✅ **Powinno być:** `Yes` lub `Automatic`
   - ❌ **Jeśli jest:** `No` lub `Manual` → zmień na `Yes` i **Zapisz**

---

### KROK 2: Sprawdź ustawienie Branch

#### Frontend:

1. W **Settings** → **Build & Deploy**
2. Sprawdź pole: **Branch**
3. ✅ **Powinno być:** `cleanup/safe-2025`
4. ❌ **Jeśli jest inny branch** → zmień na `cleanup/safe-2025` i **Zapisz**

#### Backend:

1. W **Settings** → **Build & Deploy**
2. Sprawdź pole: **Branch**
3. ✅ **Powinno być:** `cleanup/safe-2025`
4. ❌ **Jeśli jest inny branch** → zmień na `cleanup/safe-2025` i **Zapisz**

---

### KROK 3: Wymuś Manual Deploy (Natychmiastowe rozwiązanie)

#### Frontend:

1. Render Dashboard → **st-krakos-frontend**
2. Kliknij: **Manual Deploy** (w górnym menu lub lewym menu)
3. Wybierz: **Deploy latest commit**
4. Render powinien wykryć commit: `31ffdc8`
5. Kliknij: **Deploy**
6. **Czas oczekiwania:** 2-5 minut

#### Backend:

1. Render Dashboard → **st-krakos-backend**
2. Kliknij: **Manual Deploy**
3. Wybierz: **Deploy latest commit**
4. Render powinien wykryć commit: `31ffdc8`
5. Kliknij: **Deploy**
6. **Czas oczekiwania:** 2-5 minut

---

### KROK 4: Sprawdź czy deploy się rozpoczął

1. W widoku serwisu sprawdź zakładkę: **Events** lub **Logs**
2. Powinieneś zobaczyć:
   - 🔄 **Status:** `Building...` lub `Deploying...`
   - 📝 **Commit:** `31ffdc8`
   - ⏱️ **Czas:** aktualny timestamp

---

## 🔍 Weryfikacja po naprawie

### Sprawdź logi Build:

1. Render Dashboard → **st-krakos-frontend** → **Logs**
2. Sprawdź **Build Logs** (nie Runtime Logs!)
3. Powinno być:
   - ✅ `Checking out commit 31ffdc8...`
   - ✅ `Installing dependencies...`
   - ✅ `npm run build:prod` działa
   - ✅ Build się powiódł

### Sprawdź status deploy:

1. Render Dashboard → **st-krakos-frontend** → **Events**
2. Najnowszy deploy powinien pokazywać:
   - ✅ **Status:** `Live` (zielony)
   - ✅ **Commit:** `31ffdc8`
   - ✅ **Time:** aktualna data i godzina

---

## 🚨 Jeśli Auto-Deploy nadal nie działa

### Problem: Render nie wykrywa pushów

**Rozwiązanie:**
1. Sprawdź, czy repozytorium jest poprawnie połączone:
   - Settings → **Repository**
   - Powinien być widoczny: `aibankai96/ST_KRAKOS`
2. Jeśli nie - ponownie połącz repozytorium:
   - Kliknij: **Connect different repository**
   - Wybierz: `aibankai96/ST_KRAKOS`
   - Wybierz branch: `cleanup/safe-2025`

### Problem: Auto-Deploy jest włączone, ale nie działa

**Rozwiązanie:**
1. Wyłącz Auto-Deploy
2. Zapisz
3. Włącz Auto-Deploy ponownie
4. Zapisz
5. Zrób test push (lub użyj Manual Deploy)

### Problem: Cache Render

**Rozwiązanie:**
1. Settings → **Build & Deploy**
2. Sprawdź, czy jest opcja: **Clear build cache**
3. Jeśli tak - kliknij i zapisz
4. Uruchom: **Manual Deploy** → **Deploy latest commit**

---

## 📋 Checklista naprawy

- [ ] Frontend: Auto-Deploy włączone w Settings
- [ ] Backend: Auto-Deploy włączone w Settings
- [ ] Frontend: Branch ustawiony na `cleanup/safe-2025`
- [ ] Backend: Branch ustawiony na `cleanup/safe-2025`
- [ ] Frontend: Manual Deploy uruchomiony z najnowszego commita
- [ ] Backend: Manual Deploy uruchomiony (opcjonalnie)
- [ ] Sprawdzone logi - deploy się powiódł
- [ ] Aplikacja działa na Renderze z najnowszymi zmianami

---

## 💡 Szybkie rozwiązanie (jeśli nie masz czasu sprawdzać)

**Wymuś Manual Deploy dla obu serwisów:**

1. **Frontend:**
   - Render Dashboard → **st-krakos-frontend** → **Manual Deploy** → **Deploy latest commit**

2. **Backend:**
   - Render Dashboard → **st-krakos-backend** → **Manual Deploy** → **Deploy latest commit**

To natychmiast wdroży najnowsze zmiany, niezależnie od ustawień Auto-Deploy.

---

**Po wykonaniu tych kroków, Render powinien automatycznie deployować przy każdym pushu! 🎉**

