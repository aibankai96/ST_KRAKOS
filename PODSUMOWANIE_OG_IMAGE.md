# ✅ Podsumowanie - Meta Tagi Open Graph

## 🎯 Cel: 
Dodanie obrazka preview gdy ktoś udostępnia link do strony (Facebook, Twitter, LinkedIn, WhatsApp, etc.)

---

## ✅ Co zostało zrobione:

### 1. Dodano Open Graph Meta Tagi w `frontend/index.html`:
- ✅ `og:title` - Tytuł strony
- ✅ `og:description` - Opis strony  
- ✅ `og:image` - Obrazek preview (1200x630px)
- ✅ `og:url` - URL strony
- ✅ `og:type` - Typ (website)
- ✅ `og:site_name` - Nazwa strony
- ✅ `og:locale` - Język (pl_PL)

### 2. Dodano Twitter Card Meta Tagi:
- ✅ `twitter:card` - Typ karty (summary_large_image)
- ✅ `twitter:title` - Tytuł
- ✅ `twitter:description` - Opis
- ✅ `twitter:image` - Obrazek

### 3. Dodano SEO Meta Tagi:
- ✅ `description` - Opis strony
- ✅ `keywords` - Słowa kluczowe
- ✅ `author` - Autor

### 4. Utworzono Generator Obrazka:
- ✅ `frontend/public/create-og-image.html` - Generator HTML do tworzenia obrazka

---

## ⚠️ CO TRZEBA ZROBIĆ:

### KROK 1: Utwórz obrazek og-image.png

**Sposób 1 - Generator HTML (NAJŁATWIEJSZY):**
1. Otwórz w przeglądarce: `frontend/public/create-og-image.html`
2. Obrazek zostanie automatycznie wygenerowany i pobrany
3. Zapisz jako `og-image.png` w folderze `frontend/public/`

**Sposób 2 - Ręcznie:**
- Otwórz edytor graficzny (Canva, Figma, Photoshop)
- Utwórz obrazek **1200x630 pikseli**
- Dodaj logo "ST KRATOS" i opis
- Zapisz jako `og-image.png`
- Umieść w `frontend/public/og-image.png`

### KROK 2: Sprawdź czy obrazek istnieje
```bash
# Sprawdź czy plik istnieje
ls frontend/public/og-image.png
```

### KROK 3: Zbuduj aplikację
```bash
cd frontend
npm run build
```

### KROK 4: Sprawdź czy obrazek jest w dist
```bash
ls frontend/dist/og-image.png
```

### KROK 5: Przetestuj

**Facebook:**
1. Przejdź na: https://developers.facebook.com/tools/debug/
2. Wklej URL: `https://st-krakos-frontend.onrender.com/ST_KRAKOS/`
3. Kliknij "Debug"
4. Sprawdź czy obrazek się pokazuje

**Twitter:**
1. Przejdź na: https://cards-dev.twitter.com/validator
2. Wklej URL
3. Sprawdź podgląd

**LinkedIn:**
1. Przejdź na: https://www.linkedin.com/post-inspector/
2. Wklej URL
3. Sprawdź podgląd

---

## 📍 Aktualny URL obrazka:

```
https://st-krakos-frontend.onrender.com/ST_KRAKOS/og-image.png
```

**UWAGA:** Jeśli zmienisz domenę, zaktualizuj URL w `frontend/index.html` w meta tagach!

---

## 🎨 Wymagania obrazka:

- **Rozmiar:** 1200x630 pikseli (standard Open Graph)
- **Format:** PNG lub JPG
- **Nazwa:** `og-image.png`
- **Lokalizacja:** `frontend/public/og-image.png`

---

## ✅ Status:

- ✅ Meta tagi dodane
- ✅ Generator utworzony
- ⚠️ **Obrazek og-image.png musi być utworzony ręcznie**

---

**Po utworzeniu obrazka, commit i push - obrazek będzie działał!**

