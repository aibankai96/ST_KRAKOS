# 🌐 Podłączenie Domeny stkratos.com do Frontendu na Render

**Domena:** `stkratos.com`  
**Frontend:** `https://st-krakos-frontend.onrender.com`

---

## ✅ KROK 1: Dodaj Domenę w Render Dashboard

### W Render Dashboard:

1. Przejdź do **Frontend Service** (`st-krakos-frontend`)
2. Kliknij zakładkę **"Settings"**
3. Przewiń w dół do sekcji **"Custom Domains"**
4. Kliknij **"Add Custom Domain"**

### Wypełnij:

- **Domain:** `stkratos.com`
- Kliknij **"Add"**

### Render wygeneruje:

- **CNAME target** dla `www.stkratos.com` (np. `st-krakos-frontend.onrender.com`)
- **A Records** dla root domain `stkratos.com` (IP adresy)

**Zapisz te informacje!** Będziesz ich potrzebował w następnym kroku.

---

## ✅ KROK 2: Skonfiguruj DNS w Namecheap

### W Namecheap Dashboard:

1. Przejdź do **Domain List**
2. Kliknij **"Manage"** przy domenie `stkratos.com`
3. Przejdź do zakładki **"Advanced DNS"**

---

### KROK 2A: Usuń Stare Rekordy

**Usuń te rekordy (jeśli istnieją):**

1. **CNAME Record:**
   - Host: `www`
   - Value: `parkingpage.namecheap.com.`
   - Kliknij **"Remove"**

2. **URL Redirect Record:**
   - Host: `@`
   - Value: `http://www.stkratos.com/`
   - Kliknij **"Remove"**

---

### KROK 2B: Dodaj Nowe Rekordy dla Render

**Dodaj rekordy zgodnie z informacjami z Render:**

#### 1. CNAME Record dla www:

Kliknij **"Add New Record"** → Wybierz **"CNAME Record"**

- **Host:** `www`
- **Value:** `st-krakos-frontend.onrender.com` (lub inny CNAME target z Render)
- **TTL:** `Automatic` (lub `30 min`)

Kliknij **"Save"**

#### 2. A Records dla Root Domain (@):

Render poda 2-4 IP adresy. Dodaj **każdy** jako osobny A Record:

Kliknij **"Add New Record"** → Wybierz **"A Record"**

**Pierwszy A Record:**
- **Host:** `@`
- **Value:** `[IP_ADRES_1_Z_RENDER]` (pierwszy IP z Render)
- **TTL:** `Automatic` (lub `30 min`)

Kliknij **"Save"**

**Drugi A Record:**
- **Host:** `@`
- **Value:** `[IP_ADRES_2_Z_RENDER]` (drugi IP z Render)
- **TTL:** `Automatic`

Kliknij **"Save"`

**Powtórz dla wszystkich IP adresów z Render** (zwykle 2-4 adresy)

---

## ✅ KROK 3: Poczekaj na Propagację DNS

- DNS może potrzebować **15 minut - 48 godzin** na propagację
- Zwykle działa w ciągu **1-2 godzin**

**Sprawdź propagację:**
- Użyj narzędzia: https://dnschecker.org
- Wpisz: `stkratos.com`
- Sprawdź czy A Records wskazują na IP z Render

---

## ✅ KROK 4: Sprawdź Certyfikat SSL

Render automatycznie wystawi certyfikat SSL dla domeny.

1. W Render Dashboard → Frontend → Settings → Custom Domains
2. Sprawdź status certyfikatu
3. Może potrwać **10-30 minut** na wystawienie

---

## ✅ KROK 5: Przetestuj Domenę

Po propagacji DNS:

1. Otwórz w przeglądarce: `https://stkratos.com`
2. Powinna wyświetlić się strona frontendu
3. Sprawdź czy działa: `https://www.stkratos.com`

---

## 🔍 Przykładowa Konfiguracja DNS

**Po skonfigurowaniu powinieneś mieć:**

| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME | `www` | `st-krakos-frontend.onrender.com` | Automatic |
| A | `@` | `[IP_1_Z_RENDER]` | Automatic |
| A | `@` | `[IP_2_Z_RENDER]` | Automatic |
| TXT | `@` | `v=spf1 include:spf.efwd.registrar-servers.com ~all` | (zostaw) |

---

## 🚨 Troubleshooting

### Problem: Domena nie działa
- Sprawdź propagację DNS: https://dnschecker.org
- Sprawdź czy wszystkie A Records są dodane
- Sprawdź czy CNAME dla www jest poprawny

### Problem: Certyfikat SSL nie działa
- Poczekaj 10-30 minut
- Sprawdź status w Render Dashboard
- Upewnij się, że DNS jest poprawnie skonfigurowany

### Problem: Błędy w Render
- Sprawdź logi w Render Dashboard
- Upewnij się, że domena jest poprawnie dodana w Render

---

## 📋 Checklista

- [ ] Domenę dodana w Render Dashboard
- [ ] CNAME target zapisany z Render
- [ ] A Records IP adresy zapisane z Render
- [ ] Stare rekordy DNS usunięte w Namecheap
- [ ] CNAME dla www dodany w Namecheap
- [ ] Wszystkie A Records dla @ dodane w Namecheap
- [ ] DNS propagacja zakończona (sprawdzone przez dnschecker.org)
- [ ] Certyfikat SSL wystawiony w Render
- [ ] Domena działa: `https://stkratos.com`
- [ ] WWW działa: `https://www.stkratos.com`

---

**Daj znać jakie informacje Render wygenerował (CNAME target i IP adresy), a pomogę Ci dokładnie skonfigurować DNS! 🚀**

