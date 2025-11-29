# Skrypt restartu aplikacji frontend
Write-Host "=== RESTART APLIKACJI FRONTEND ===" -ForegroundColor Cyan

# Zatrzymaj wszystkie procesy Node.js
Write-Host "`n1. Zatrzymywanie procesów Node.js..." -ForegroundColor Yellow
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2
Write-Host "   ✓ Procesy zatrzymane" -ForegroundColor Green

# Wyczyść cache Vite
Write-Host "`n2. Czyszczenie cache Vite..." -ForegroundColor Yellow
if (Test-Path node_modules\.vite) {
    Remove-Item -Recurse -Force node_modules\.vite
    Write-Host "   ✓ Cache Vite wyczyszczony" -ForegroundColor Green
} else {
    Write-Host "   ℹ Brak cache Vite" -ForegroundColor Gray
}

# Wyczyść folder dist
Write-Host "`n3. Czyszczenie folderu dist..." -ForegroundColor Yellow
if (Test-Path dist) {
    Remove-Item -Recurse -Force dist
    Write-Host "   ✓ Folder dist usunięty" -ForegroundColor Green
} else {
    Write-Host "   ℹ Brak folderu dist" -ForegroundColor Gray
}

# Sprawdź czy node_modules istnieje
Write-Host "`n4. Sprawdzanie zależności..." -ForegroundColor Yellow
if (-not (Test-Path node_modules)) {
    Write-Host "   ⚠ node_modules nie istnieje - uruchom: npm install" -ForegroundColor Red
    exit 1
} else {
    Write-Host "   ✓ node_modules istnieje" -ForegroundColor Green
}

# Uruchom aplikację
Write-Host "`n5. Uruchamianie aplikacji..." -ForegroundColor Yellow
Write-Host "   → Uruchamiam: npm run dev" -ForegroundColor Cyan
Write-Host "`n=== APLIKACJA URUCHOMIONA ===" -ForegroundColor Green
Write-Host "Otwórz w przeglądarce: http://localhost:3000/ST_KRAKOS/" -ForegroundColor Cyan
Write-Host "`nNaciśnij Ctrl+C aby zatrzymać serwer`n" -ForegroundColor Yellow

npm run dev

