# 🚀 Instrukcja Wdrożenia Frontendu na Render - ST KRAKOS

**Data:** 2025-01-27  
**Status:** Gotowe do wdrożenia

---

## 📋 Krok po Kroku - Wdrożenie Frontendu

### 1. W Render Dashboard

1. Kliknij **"New +"** (w prawym górnym rogu)
2. Wybierz **"Static Site"** (nie Web Service!)

---

### 2. Połączenie z Repozytorium

1. **Connect account** (jeśli jeszcze nie połączone):
   - Wybierz **GitHub**
   - Autoryzuj dostęp do repozytorium

2. **Select repository:**
   - Wybierz: `aibankai96 / ST_KRAKOS`
   - Lub użyj: `https://github.com/aibankai96/ST_KRAKOS`

---

### 3. Konfiguracja Static Site

Wypełnij formularz:

#### **Name:**
```
st-krakos-frontend
```

#### **Branch:**
```
cleanup/safe-2025
```

#### **Root Directory:**
```
frontend
```

#### **Build Command:**
```
npm install && RENDER=true npm run build
```

#### **Publish Directory:**
```
dist
```

---

### 4. Environment Variables

Kliknij **"Add Environment Variable"** i dodaj:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `RENDER` | `true` |

---

### 5. Advanced Settings (Opcjonalnie)

- **Auto-Deploy:** Włączone (domyślnie)
- **Pull Request Previews:** Wyłączone (lub włączone jeśli chcesz)

---

### 6. Create Static Site

Kliknij **"Create Static Site"** i poczekaj na wdrożenie.

---

## ⏱️ Czas Wdrożenia

- Build: ~2-5 minut
- Deploy: ~1-2 minuty
- **Razem:** ~3-7 minut

---

## ✅ Po Wdrożeniu

### 1. Sprawdź URL Frontendu

Render wygeneruje URL typu:
```
https://st-krakos-frontend.onrender.com
```

### 2. Zaktualizuj CORS w Backendzie

W Render Dashboard → Backend (`ST_KRAKOS`) → Environment Variables:

1. Znajdź `CORS_ORIGINS`
2. Kliknij **"Edit"**
3. Zmień na:
   ```
   https://st-krakos-frontend.onrender.com
   ```
   (lub dodaj oba URL-e oddzielone przecinkiem jeśli chcesz)

4. Zapisz

### 3. Przetestuj Aplikację

1. Otwórz URL frontendu w przeglądarce
2. Sprawdź czy strona się ładuje
3. Sprawdź czy puzzle loader działa
4. Sprawdź czy nawigacja działa
5. Sprawdź czy wszystkie sekcje się wyświetlają

---

## 🔍 Troubleshooting

### Problem: Build się nie powodzi
- Sprawdź logi w Render
- Upewnij się, że `Root Directory` = `frontend`
- Sprawdź czy `package.json` jest poprawny

### Problem: Strona jest pusta
- Sprawdź czy `Publish Directory` = `dist`
- Sprawdź logi builda

### Problem: Błędy CORS
- Zaktualizuj `CORS_ORIGINS` w backendzie na URL frontendu

---

## 📝 Notatki

- **Backend URL:** `https://st-krakos.onrender.com`
- **Frontend URL:** (będzie po wdrożeniu)
- **API Endpoint:** `https://st-krakos.onrender.com/api`

---

**Powodzenia! 🚀**

