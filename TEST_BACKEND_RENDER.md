# 🧪 Testowanie Backendu na Render - ST KRAKOS

**Backend URL:** `https://st-krakos.onrender.com`  
**Data testów:** 2025-01-27

---

## ✅ Testy do wykonania:

### 1. Health Check (Podstawowy test)

**Endpoint:** `GET /api/health`

**Test w przeglądarce:**
```
https://st-krakos.onrender.com/api/health
```

**Oczekiwany wynik:**
```json
{
  "status": "ok",
  "service": "ST KRAKOS Backend",
  "version": "1.0.0"
}
```

**Test w PowerShell:**
```powershell
Invoke-RestMethod -Uri "https://st-krakos.onrender.com/api/health" -Method Get
```

**Test w curl:**
```bash
curl https://st-krakos.onrender.com/api/health
```

---

### 2. Metrics (Sprawdzenie metryk)

**Endpoint:** `GET /api/metrics`

**Test w przeglądarce:**
```
https://st-krakos.onrender.com/api/metrics
```

**Oczekiwany wynik:**
```json
{
  "status": "ok",
  "metrics": {
    "request_count": 0,
    "error_count": 0,
    "avg_response_time_ms": 0.0,
    "uptime_seconds": 0.0,
    "error_rate": 0.0
  }
}
```

---

### 3. CORS (Sprawdzenie CORS headers)

**Test w PowerShell:**
```powershell
$headers = @{
    "Origin" = "https://st-krakos.onrender.com"
}
Invoke-WebRequest -Uri "https://st-krakos.onrender.com/api/health" -Method Get -Headers $headers | Select-Object -ExpandProperty Headers
```

**Sprawdź czy w odpowiedzi jest:**
- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Methods`

---

### 4. Rate Limiting (Opcjonalnie)

**Test wielu requestów:**
```powershell
1..10 | ForEach-Object {
    Write-Host "Request $_"
    Invoke-RestMethod -Uri "https://st-krakos.onrender.com/api/health" -Method Get
    Start-Sleep -Milliseconds 100
}
```

---

## 🔍 Sprawdzenie logów w Render:

1. W Render Dashboard
2. Kliknij na serwis `ST_KRAKOS`
3. Przejdź do zakładki **"Logs"**
4. Sprawdź czy są jakieś błędy

---

## ✅ Checklist testów:

- [ ] Health Check zwraca status "ok"
- [ ] Metrics endpoint działa
- [ ] CORS headers są poprawne
- [ ] Brak błędów w logach
- [ ] Response time jest akceptowalny (< 1s)

---

## 📝 Notatki:

- Backend URL: `https://st-krakos.onrender.com`
- API Base: `https://st-krakos.onrender.com/api`
- Health Check: `https://st-krakos.onrender.com/api/health`

---

**Po pomyślnych testach można przejść do wdrożenia frontendu! 🚀**

