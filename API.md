# API Documentation - ST KRAKOS

**Wersja:** 1.0.0  
**Base URL:** `http://localhost:5000` (development)  
**Status:** ✅ Operacyjne

---

## 📋 Spis Treści

1. [Autoryzacja](#autoryzacja)
2. [Rate Limiting](#rate-limiting)
3. [Endpointy](#endpointy)
4. [Kody Błędów](#kody-błędów)
5. [Przykłady](#przykłady)

---

## 🔐 Autoryzacja

Obecnie API nie wymaga autoryzacji. W przyszłości może być dodane:
- API Key authentication
- JWT tokens
- OAuth 2.0

---

## ⚡ Rate Limiting

API ma włączone rate limiting:
- **200 requestów/dzień** na IP
- **50 requestów/godzinę** na IP

W przypadku przekroczenia limitu:
```json
{
  "error": "Rate limit exceeded",
  "status": 429
}
```

---

## 📝 Endpointy

### 1. Health Check

**Endpoint:** `GET /api/health`

**Opis:** Sprawdza status serwisu

**Request:**
```http
GET /api/health HTTP/1.1
Host: localhost:5000
```

**Response (200 OK):**
```json
{
  "status": "ok",
  "service": "ST KRAKOS Backend",
  "version": "1.0.0"
}
```

**Kody błędów:**
- `500` - Błąd serwera

---

### 2. Metrics

**Endpoint:** `GET /api/metrics`

**Opis:** Zwraca metryki wydajności serwisu

**Request:**
```http
GET /api/metrics HTTP/1.1
Host: localhost:5000
```

**Response (200 OK):**
```json
{
  "status": "ok",
  "metrics": {
    "request_count": 42,
    "error_count": 0,
    "avg_response_time_ms": 125.50,
    "uptime_seconds": 3600.00,
    "error_rate": 0.00
  }
}
```

**Kody błędów:**
- `500` - Błąd serwera

---

### 3. Generate Page

**Endpoint:** `POST /api/generate-page`

**Opis:** Generuje zawartość strony przez AI

**Request:**
```http
POST /api/generate-page HTTP/1.1
Host: localhost:5000
Content-Type: application/json

{
  "prompt": "Stwórz stronę o firmie zajmującej się AI",
  "page_type": "landing",
  "title": "Moja Firma"
}
```

**Parametry:**
- `prompt` (string, wymagane) - Prompt dla AI (min 10, max 5000 znaków)
- `page_type` (string, opcjonalne) - Typ strony: `landing`, `about`, `product`, `blog`, `contact` (domyślnie: `landing`)
- `title` (string, opcjonalne) - Tytuł strony (min 3, max 200 znaków, domyślnie: `ST KRAKOS`)

**Response (200 OK):**
```json
{
  "html": "<!DOCTYPE html>...",
  "content": "Wygenerowana treść strony..."
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Prompt musi mieć minimum 10 znaków"
}
```

**Response (500 Internal Server Error):**
```json
{
  "error": "Wystąpił błąd podczas generowania strony"
}
```

**Kody błędów:**
- `400` - Błędne dane wejściowe (walidacja)
- `500` - Błąd generowania przez AI

**Walidacja:**
- Prompt: 10-5000 znaków, bez niebezpiecznych znaków (`<script`, `javascript:`, `onerror=`)
- Page type: jeden z dozwolonych typów
- Title: 3-200 znaków

---

### 4. Generate Content

**Endpoint:** `POST /api/generate-content`

**Opis:** Generuje treść przez AI (bez struktury HTML)

**Request:**
```http
POST /api/generate-content HTTP/1.1
Host: localhost:5000
Content-Type: application/json

{
  "prompt": "Napisz artykuł o sztucznej inteligencji"
}
```

**Parametry:**
- `prompt` (string, wymagane) - Prompt dla AI (min 10, max 5000 znaków)

**Response (200 OK):**
```json
{
  "success": true,
  "content": "Wygenerowana treść...",
  "model": "gpt-4"
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Prompt musi mieć minimum 10 znaków"
}
```

**Response (500 Internal Server Error):**
```json
{
  "error": "Wystąpił błąd podczas generowania treści"
}
```

**Kody błędów:**
- `400` - Błędne dane wejściowe (walidacja)
- `500` - Błąd generowania przez AI

---

## 🚨 Kody Błędów

| Kod | Opis |
|-----|------|
| `200` | Sukces |
| `400` | Błędne żądanie (walidacja) |
| `429` | Rate limit exceeded |
| `500` | Błąd serwera |

---

## 📚 Przykłady

### Przykład 1: Generowanie Landing Page

```bash
curl -X POST http://localhost:5000/api/generate-page \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Stwórz landing page dla firmy zajmującej się AI",
    "page_type": "landing",
    "title": "AI Solutions"
  }'
```

### Przykład 2: Generowanie Treści

```bash
curl -X POST http://localhost:5000/api/generate-content \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Napisz krótki artykuł o korzyściach AI w biznesie"
  }'
```

### Przykład 3: Sprawdzenie Statusu

```bash
curl http://localhost:5000/api/health
```

### Przykład 4: Pobranie Metryk

```bash
curl http://localhost:5000/api/metrics
```

---

## 🔒 Bezpieczeństwo

### Walidacja Danych
- Wszystkie dane wejściowe są walidowane
- Sanityzacja inputów (usuwanie niebezpiecznych znaków)
- Sprawdzanie długości pól

### Rate Limiting
- 200 requestów/dzień na IP
- 50 requestów/godzinę na IP

### Error Handling
- Wszystkie błędy są logowane
- Komunikaty błędów nie ujawniają szczegółów systemu

---

## 📝 Uwagi

- API używa OpenAI GPT-4 (domyślnie)
- Wymagany `AI_API_KEY` w zmiennych środowiskowych
- CORS jest skonfigurowany dla `http://localhost:3000` i `http://localhost:5173`
- Wszystkie requesty są monitorowane (metryki wydajności)

---

**Data aktualizacji:** 2025-01-27  
**Wersja API:** 1.0.0

