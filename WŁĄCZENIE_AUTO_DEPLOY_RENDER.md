# ✅ WŁĄCZENIE AUTO-DEPLOY W RENDER - INSTRUKCJA

## 🎯 Problem

**Auto-Deploy jest wyłączone (Off)** - dlatego Render nie wprowadza automatycznie zmian po pushu.

---

## ✅ Rozwiązanie - Włącz Auto-Deploy

### KROK 1: Włącz Auto-Deploy dla Frontendu

1. **Render Dashboard** → **st-krakos-frontend** → **Settings**
2. Przewiń do sekcji: **Build & Deploy**
3. Znajdź opcję: **Auto-Deploy**
   - Obecnie: `Off` ❌
   - Musi być: `On` ✅
4. **Kliknij: Edit** (obok Auto-Deploy)
5. **Przełącz z `Off` na `On`**
6. **Kliknij: Save Changes** lub **Update**

**Po zapisaniu, Render będzie automatycznie deployować przy każdym pushu do brancha `cleanup/safe-2025`!**

---

### KROK 2: Włącz Auto-Deploy dla Backendu (jeśli potrzebne)

1. **Render Dashboard** → **st-krakos-backend** → **Settings**
2. Przewiń do sekcji: **Build & Deploy**
3. Znajdź opcję: **Auto-Deploy**
4. **Kliknij: Edit**
5. **Przełącz z `Off` na `On`**
6. **Kliknij: Save Changes**

---

## 🔍 Weryfikacja

### Po włączeniu Auto-Deploy:

1. **Zrób test push** (lub użyj istniejącego commita):
   ```bash
   # Jeśli chcesz wymusić deploy teraz:
   git commit --allow-empty -m "Trigger auto-deploy test"
   git push origin cleanup/safe-2025
   ```

2. **Sprawdź w Render:**
   - Render Dashboard → **st-krakos-frontend** → **Events**
   - Powinieneś zobaczyć automatyczny deploy rozpoczęty w ciągu 1-2 minut

3. **Sprawdź logi:**
   - Render Dashboard → **st-krakos-frontend** → **Logs**
   - Powinno być: `Checking out commit...` (najnowszy commit)

---

## 📋 Sprawdzone ustawienia (już poprawne):

✅ **Repository:** https://github.com/aibankai96/ST_KRAKOS  
✅ **Branch:** cleanup/safe-2025  
✅ **Build Command:** `cd frontend && npm install && RENDER=true npm run build:prod`  
✅ **Publish Directory:** frontend/dist  
❌ **Auto-Deploy:** Off → **MUSI BYĆ: On**  

---

## 🚀 Po włączeniu Auto-Deploy

**Od teraz:**
- Każdy push do brancha `cleanup/safe-2025` automatycznie uruchomi deploy
- Nie będziesz musiał ręcznie klikać "Manual Deploy"
- Render wykryje zmiany w ciągu 1-2 minut i rozpocznie build

---

**WŁĄCZ Auto-Deploy w Settings i zapisz zmiany! 🎉**

