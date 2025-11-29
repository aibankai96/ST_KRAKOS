# INSTRUKCJA RESTARTU APLIKACJI

## 🚀 SZYBKI RESTART

### **Opcja 1: Użyj skryptu PowerShell (ZALECANE)**
```powershell
cd frontend
.\restart.ps1
```

### **Opcja 2: Ręczny restart**
```powershell
# 1. Zatrzymaj wszystkie procesy Node.js
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force

# 2. Wyczyść cache
cd frontend
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue

# 3. Uruchom aplikację
npm run dev
```

### **Opcja 3: Prosty restart**
```powershell
cd frontend
npm run dev
```

---

## 🔧 ROZWIĄZYWANIE PROBLEMÓW

### **Problem: Port 3000 jest zajęty**
```powershell
# Znajdź proces używający portu 3000
netstat -ano | findstr :3000

# Zatrzymaj proces (zamień PID na numer z powyższego polecenia)
taskkill /PID <PID> /F
```

### **Problem: Błędy modułów**
```powershell
cd frontend
# Usuń node_modules i zainstaluj ponownie
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
npm run dev
```

### **Problem: Cache przeglądarki**
1. Otwórz DevTools (F12)
2. Kliknij prawym przyciskiem na przycisk odświeżania
3. Wybierz "Wyczyść cache i twarde odświeżenie"

---

## 📋 CHECKLISTA PRZED RESTARTEM

- [ ] Zatrzymaj wszystkie procesy Node.js
- [ ] Wyczyść cache Vite (`node_modules/.vite`)
- [ ] Wyczyść folder `dist` (jeśli istnieje)
- [ ] Sprawdź czy `node_modules` istnieje
- [ ] Uruchom `npm run dev`

---

## 🌐 ADRESY APLIKACJI

Po uruchomieniu aplikacja będzie dostępna pod adresem:
- **Lokalnie:** http://localhost:3000/ST_KRAKOS/
- **Dev server:** http://localhost:3000/ST_KRAKOS/

---

## ⚠️ WAŻNE

- Jeśli aplikacja nadal nie działa, sprawdź konsolę przeglądarki (F12 → Console)
- Sprawdź czy wszystkie pliki się ładują (F12 → Network)
- Wyłącz Service Worker (F12 → Application → Service Workers → Unregister)

