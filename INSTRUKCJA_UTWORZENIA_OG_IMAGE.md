# 📸 INSTRUKCJA - Utworzenie Obrazka og-image.png

## 🎯 KROK PO KROKU:

### KROK 1: Otwórz Generator
1. Otwórz plik w przeglądarce:
   ```
   frontend/public/create-og-image.html
   ```
   LUB
   ```
   frontend/public/create-og-image-simple.html
   ```

2. Obrazek zostanie **automatycznie wygenerowany i pobrany**

### KROK 2: Zapisz Obrazek
1. Znajdź pobrany plik `og-image.png` w folderze **Downloads**
2. Skopiuj go do: `frontend/public/og-image.png`

### KROK 3: Weryfikacja
```bash
# Sprawdź czy plik istnieje
cd frontend/public
ls og-image.png
```

### KROK 4: Build, Commit i Push
```bash
cd frontend
npm run build

cd ..
git add frontend/public/og-image.png
git commit -m "Dodano obrazek og-image.png dla Open Graph"
git push
```

---

## ✅ WYMAGANIA:
- **Rozmiar:** 1200x630 pikseli
- **Format:** PNG
- **Nazwa:** `og-image.png`
- **Lokalizacja:** `frontend/public/og-image.png`

---

## 📍 Po deployu obrazek będzie dostępny pod:
```
https://st-krakos-frontend.onrender.com/ST_KRAKOS/og-image.png
```

---

**Gotowe! Po wykonaniu tych kroków, obrazek będzie się pokazywał przy udostępnianiu linku.**

