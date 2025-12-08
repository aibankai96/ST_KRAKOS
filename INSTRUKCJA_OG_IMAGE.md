# 📸 Instrukcja - Dodanie Obrazka Open Graph

## ✅ Co zostało zrobione:

1. **Dodano Open Graph meta tagi** w `frontend/index.html`:
   - `og:title` - Tytuł strony
   - `og:description` - Opis strony
   - `og:image` - Obrazek preview (1200x630px)
   - `og:url` - URL strony
   - `og:type` - Typ (website)

2. **Dodano Twitter Card meta tagi**:
   - `twitter:card` - Typ karty (summary_large_image)
   - `twitter:title` - Tytuł
   - `twitter:description` - Opis
   - `twitter:image` - Obrazek

3. **Utworzono generator obrazka OG** - `frontend/public/create-og-image.html`

---

## 🎨 Jak utworzyć obrazek og-image.png:

### Opcja 1: Użyj generatora HTML (ZALECANE) ✅

1. Otwórz plik `frontend/public/create-og-image.html` w przeglądarce
2. Obrazek zostanie automatycznie wygenerowany i pobrany
3. Zapisz go jako `og-image.png` w folderze `frontend/public/`

### Opcja 2: Stwórz ręcznie

**Wymagania:**
- Rozmiar: **1200x630 pikseli** (standard Open Graph)
- Format: **PNG** lub **JPG**
- Nazwa pliku: `og-image.png`

**Zawartość obrazka:**
- Logo "ST KRATOS" 
- Tło: gradient ciemny (#0a0e27 → #1a1f3a → #0f1419)
- Tekst: "ST KRATOS - Innowacyjne rozwiązania AI"
- Kolory: złoty (#FFD700) dla tekstu głównego

### Opcja 3: Użyj narzędzia online

1. Przejdź na: https://www.canva.com/ lub https://www.figma.com/
2. Utwórz projekt 1200x630px
3. Dodaj:
   - Tło gradient (ciemny niebieski)
   - Tekst "ST KRATOS" (złoty, duży)
   - Opcjonalnie: ikonę lub logo
4. Eksportuj jako PNG: `og-image.png`
5. Umieść w `frontend/public/og-image.png`

---

## 📍 Lokalizacja pliku:

Obrazek musi być dostępny pod:
- **Lokalnie:** `frontend/public/og-image.png`
- **Po buildzie:** `frontend/dist/og-image.png`
- **Na Render:** `https://st-krakos-frontend.onrender.com/ST_KRAKOS/og-image.png`

---

## ✅ Weryfikacja:

### 1. Sprawdź czy plik istnieje:
```bash
ls frontend/public/og-image.png
```

### 2. Sprawdź w konsoli przeglądarki:
```javascript
// Sprawdź czy meta tagi są poprawne
document.querySelector('meta[property="og:image"]').content
// Powinno zwrócić: https://st-krakos-frontend.onrender.com/ST_KRAKOS/og-image.png
```

### 3. Testuj na:
- **Facebook Debugger:** https://developers.facebook.com/tools/debug/
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector:** https://www.linkedin.com/post-inspector/

---

## 🔧 Troubleshooting:

### Problem: Obrazek się nie pokazuje
**Rozwiązanie:**
1. Sprawdź czy plik istnieje w `frontend/public/og-image.png`
2. Sprawdź czy URL w meta tagach jest poprawny
3. Użyj Facebook Debugger aby wymusić odświeżenie cache

### Problem: Obrazek jest za mały
**Rozwiązanie:**
- Obrazek OG powinien mieć minimum 1200x630px
- Facebook zaleca 1200x630px
- Twitter akceptuje od 300x157px, ale zaleca 1200x630px

### Problem: Obrazek nie ładuje się na Render
**Rozwiązanie:**
1. Upewnij się że plik jest w `frontend/public/`
2. Uruchom build: `npm run build`
3. Sprawdź czy plik jest w `frontend/dist/`
4. Sprawdź czy URL w meta tagach jest poprawny (z `/ST_KRAKOS/`)

---

## 📝 Aktualne ustawienia w index.html:

```html
<meta property="og:image" content="https://st-krakos-frontend.onrender.com/ST_KRAKOS/og-image.png">
<meta name="twitter:image" content="https://st-krakos-frontend.onrender.com/ST_KRAKOS/og-image.png">
```

**UWAGA:** Jeśli zmienisz domenę, zaktualizuj URL w meta tagach!

