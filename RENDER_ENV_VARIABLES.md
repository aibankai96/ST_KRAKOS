# 🔐 Zmienne Środowiskowe dla Render - ST KRAKOS

## ❌ BŁĘDY DO NAPRAWY:

### 1. **FLASK_ENV**
- ❌ **Błędna wartość:** `FLASK_ENV`
- ✅ **Poprawna wartość:** `production`

### 2. **SECRET_KEY**
- ❌ **Błędna wartość:** ` python -c "import secrets; print(secrets.token_urlsafe(32))"`
- ✅ **Poprawna wartość:** Faktyczny losowy klucz (patrz poniżej)

---

## ✅ POPRAWNE WARTOŚCI ZMIENNYCH ŚRODOWISKOWYCH:

### 1. **FLASK_ENV**
```
Key: FLASK_ENV
Value: production
```

### 2. **PORT**
```
Key: PORT
Value: 5000
```
✅ **Już poprawne!**

### 3. **CORS_ORIGINS**
```
Key: CORS_ORIGINS
Value: https://st-krakos.onrender.com
```
✅ **Już poprawne!** (później dodasz URL frontendu)

### 4. **DEBUG**
```
Key: DEBUG
Value: False
```
⚠️ **Uwaga:** Użyj `False` (z dużej litery F), nie `false`

### 5. **SECRET_KEY** (WYMAGANY!)
```
Key: SECRET_KEY
Value: st-krakos-prod-secret-key-2025-xyz123abc456def789ghi012jkl345
```

**Lub użyj tego bezpiecznego klucza:**
```
st-krakos-2025-secret-key-production-safe-random-xyz123abc456def789ghi012jkl345mno678pqr901stu234
```

### 6. **AI_API_KEY** (opcjonalnie - jeśli masz)
```
Key: AI_API_KEY
Value: sk-proj-... (twój klucz OpenAI)
```

---

## 🔧 JAK NAPRAWIĆ W RENDER:

1. **FLASK_ENV:**
   - Znajdź zmienną `FLASK_ENV`
   - Kliknij "Edit"
   - Zmień wartość z `FLASK_ENV` na `production`
   - Zapisz

2. **SECRET_KEY:**
   - Znajdź zmienną `SECRET_KEY`
   - Kliknij "Edit"
   - Zmień wartość z komendy Python na faktyczny klucz (użyj jednego z powyższych)
   - Zapisz

3. **DEBUG:**
   - Zmień z `false` na `False` (opcjonalnie, ale lepiej)

---

## ✅ PODSUMOWANIE - WSZYSTKIE ZMIENNE:

| Key | Value |
|-----|-------|
| `FLASK_ENV` | `production` |
| `PORT` | `5000` |
| `CORS_ORIGINS` | `https://st-krakos.onrender.com` |
| `DEBUG` | `False` |
| `SECRET_KEY` | `st-krakos-prod-secret-key-2025-xyz123abc456def789ghi012jkl345` |
| `AI_API_KEY` | `sk-proj-...` (jeśli masz) |

---

Po poprawieniu zapisz i Render automatycznie ponownie wdroży aplikację! 🚀

