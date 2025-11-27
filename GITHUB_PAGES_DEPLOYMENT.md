# GitHub Pages - Deployment Bez Plików na Komputerze

## 🚀 Automatyczny Deployment z Git

Aplikacja automatycznie wdraża się na GitHub Pages przy każdym push do `master`.

---

## ✅ Krok 1: Włącz GitHub Pages

1. Wejdź do repozytorium: `https://github.com/aibankai96/ST_KRAKOS`
2. Kliknij **Settings** → **Pages**
3. W sekcji **Source** wybierz:
   - **Source:** `GitHub Actions`
4. Zapisz zmiany

---

## ✅ Krok 2: Push do Git (jeśli jeszcze nie zrobione)

Workflow automatycznie się uruchomi i zbuduje aplikację.

---

## ✅ Krok 3: Otwórz Aplikację

Po zakończeniu buildu (2-5 minut), aplikacja będzie dostępna pod adresem:

```
https://aibankai96.github.io/ST_KRAKOS/
```

---

## 🔄 Automatyczne Aktualizacje

**Każdy push do `master` automatycznie:**
1. Buduje aplikację
2. Deployuje na GitHub Pages
3. Aktualizuje stronę online

**Zero plików na komputerze!** Wszystko dzieje się w chmurze GitHub.

---

## 📋 Status Deploymentu

Sprawdź status w repozytorium:
- **Actions** → Zobacz workflow runs
- Zielony znaczek = sukces
- Czerwony = błąd (sprawdź logi)

---

## 🎯 Link do Aplikacji

Po pierwszym deploymentzie:
```
https://aibankai96.github.io/ST_KRAKOS/
```

---

## ⚙️ Jak to Działa

1. **GitHub Actions** automatycznie:
   - Pobiera kod z Git
   - Instaluje zależności (`npm ci`)
   - Buduje aplikację (`npm run build`)
   - Deployuje do GitHub Pages

2. **Wszystko w chmurze GitHub** - zero plików na Twoim komputerze!

---

## 🔧 Troubleshooting

**Jeśli aplikacja nie działa:**
1. Sprawdź **Actions** w repozytorium
2. Zobacz logi buildu
3. Upewnij się, że GitHub Pages jest włączone

**Jeśli potrzebujesz zmienić konfigurację:**
- Edytuj `.github/workflows/deploy.yml` w Git
- Push zmian
- Automatyczny rebuild

---

**Gotowe!** Aplikacja działa online, wszystko z Git, zero plików na komputerze! 🎉

