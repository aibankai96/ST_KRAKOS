# 🔧 Naprawa Problemu Render - Backend

## Problem
```
ModuleNotFoundError: No module named 'backend'
```

## Przyczyna
Aplikacja jest uruchamiana z katalogu `backend/`, ale importy używają `from backend.config`, co wymaga uruchomienia z głównego katalogu projektu.

## Rozwiązanie

W ustawieniach Render (Settings → General):

### ✅ OPCJA 1: Root Directory + Start Command (ZALECANA)

1. **Root Directory:** Usuń `backend` (zostaw **PUSTE**)

2. **Build Command:**
   ```
   pip install -r backend/requirements.txt
   ```

3. **Start Command:**
   ```
   python -m backend.app
   ```

---

### ✅ OPCJA 2: Root Directory = backend + zmiana importów

1. **Root Directory:** `backend`

2. **Build Command:**
   ```
   pip install -r requirements.txt
   ```

3. **Start Command:**
   ```
   python app.py
   ```

**ALE:** Wymaga zmiany wszystkich importów w `backend/app.py` z `from backend.config` na relatywne importy.

---

## 💡 REKOMENDACJA

**Użyj OPCJI 1** - jest prostsza i nie wymaga zmian w kodzie!

Po zmianach w Render, zapisz i ponownie wdróż.

