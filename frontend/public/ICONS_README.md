# IKONY PWA - INSTRUKCJA

## Wymagane ikony:
- `icon-192x192.png` - 192x192 pikseli
- `icon-512x512.png` - 512x512 pikseli

## Jak utworzyć ikony:

### Opcja 1: Generator online (ZALECANE)
1. Przejdź na https://realfavicongenerator.net/
2. Wgraj plik `icon.svg` (znajduje się w tym folderze)
3. Wygeneruj ikony
4. Pobierz `icon-192x192.png` i `icon-512x512.png`
5. Umieść je w folderze `frontend/public/`

### Opcja 2: Konwersja SVG → PNG
1. Otwórz `icon.svg` w edytorze graficznym (GIMP, Photoshop, Inkscape)
2. Eksportuj jako PNG w rozmiarach:
   - 192x192 px → `icon-192x192.png`
   - 512x512 px → `icon-512x512.png`
3. Umieść pliki w folderze `frontend/public/`

### Opcja 3: Online converter
1. Użyj https://cloudconvert.com/svg-to-png
2. Wgraj `icon.svg`
3. Ustaw rozmiary: 192x192 i 512x512
4. Pobierz i umieść w `frontend/public/`

## Weryfikacja:
Po umieszczeniu ikon, sprawdź czy są dostępne:
- `frontend/public/icon-192x192.png` ✅
- `frontend/public/icon-512x512.png` ✅

Po buildzie Vite, ikony będą dostępne w:
- `frontend/dist/icon-192x192.png`
- `frontend/dist/icon-512x512.png`

## Kolory:
- Tło: #0a0e27 (ciemny niebieski)
- Tekst: #FFD700 (złoty)

