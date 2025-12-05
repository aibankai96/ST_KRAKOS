# 🔧 Szybka Naprawa Zmiennych Środowiskowych w Render

## ❌ Co jest źle:

1. **FLASK_ENV** = `FLASK_ENV` ❌ → powinno być `production`
2. **SECRET_KEY** = komenda Python ❌ → powinien być faktyczny klucz

---

## ✅ Co zmienić:

### 1. FLASK_ENV
- Kliknij **"Edit"** przy `FLASK_ENV`
- Zmień na: `production`

### 2. SECRET_KEY  
- Kliknij **"Edit"** przy `SECRET_KEY`
- Usuń: ` python -c "import secrets; print(secrets.token_urlsafe(32))"`
- Wstaw ten klucz:
```
st-krakos-prod-secret-key-2025-xyz123abc456def789ghi012jkl345mno678pqr901
```

---

## ✅ Gotowe wartości (skopiuj):

| Key | Value |
|-----|-------|
| FLASK_ENV | `production` |
| PORT | `5000` |
| CORS_ORIGINS | `https://st-krakos.onrender.com` |
| DEBUG | `False` |
| SECRET_KEY | `st-krakos-prod-secret-key-2025-xyz123abc456def789ghi012jkl345mno678pqr901` |

Po zmianach **zapisz** i Render automatycznie wdroży ponownie! 🚀

