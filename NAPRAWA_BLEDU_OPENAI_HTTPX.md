# 🔧 Naprawa błędu: TypeError: Client.__init__() got an unexpected keyword argument 'proxies'

## ❌ Problem

Błąd występuje z powodu niezgodności wersji:
- `openai==1.3.0` nie jest kompatybilne z `httpx==0.28.1`
- Błąd: `TypeError: Client.__init() got an unexpected keyword argument 'proxies'`

## ✅ Rozwiązanie

Zaktualizowałem plik `backend/requirements.txt`:
- Zaktualizowano `openai` do wersji `>=1.12.0` (kompatybilna z nowszymi wersjami)
- Zablokowano `httpx==0.27.2` (kompatybilna z openai 1.3.0+)

## 📋 Co dalej?

### Krok 1: Commit i push zmian

```bash
git add backend/requirements.txt
git commit -m "Fix: Update openai and httpx versions for compatibility"
git push origin cleanup/safe-2025
```

### Krok 2: Render automatycznie zredeployuje

Po pushu, Render automatycznie:
1. Wykryje zmianę w requirements.txt
2. Zainstaluje nowe wersje bibliotek
3. Zredeployuje backend

**Czas oczekiwania:** 2-5 minut

### Krok 3: Sprawdź logi

1. Przejdź do: **Render Dashboard** → **st-krakos-backend** → **Logs**
2. Sprawdź, czy:
   - ✅ Build się powiódł
   - ✅ Wszystkie pakiety zostały zainstalowane
   - ✅ Backend się uruchomił bez błędów

### Krok 4: Test backendu

Otwórz w przeglądarce:
```
https://st-krakos-backend.onrender.com/api/health
```

**Oczekiwany wynik:**
```json
{"status": "ok"}
```

## 🔍 Szczegóły zmian

### Przed:
```txt
openai==1.3.0
```

### Po:
```txt
openai>=1.12.0
httpx==0.27.2
```

## ⚠️ Uwagi

1. **httpx 0.27.2** jest kompatybilne z openai 1.3.0+
2. **httpx 0.28.0+** usunęło argument `proxies`, co powoduje błąd
3. **openai >=1.12.0** jest kompatybilne z httpx 0.27.2

## 🚨 Jeśli nadal występuje błąd

1. Sprawdź logi w Render (dokładny komunikat błędu)
2. Sprawdź, czy wszystkie zmienne środowiskowe są ustawione:
   - `SECRET_KEY` ✅
   - `CORS_ORIGINS` ✅
   - `FLASK_ENV` ✅
   - `PORT` ✅
   - `AI_API_KEY` ✅

## 📝 Status

- [x] Zaktualizowano requirements.txt
- [ ] Commit i push zmian (do wykonania przez Ciebie)
- [ ] Render redeploy (automatycznie po pushu)
- [ ] Test backendu (po redeploy)

---

**Następny krok:** Wykonaj commit i push zmian, a Render automatycznie zredeployuje backend z poprawionymi wersjami bibliotek.

