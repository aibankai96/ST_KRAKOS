# 🔧 Szczegółowa Konfiguracja DNS w Namecheap

**Domena:** `stkratos.com`  
**Frontend Render:** `st-krakos-frontend.onrender.com`

---

## ⚠️ WAŻNE: Najpierw Dodaj Domenę w Render!

**Zanim skonfigurujesz DNS w Namecheap, musisz:**

1. Render Dashboard → Frontend (`st-krakos-frontend`) → Settings → Custom Domains
2. Kliknij **"Add Custom Domain"**
3. Wpisz: `stkratos.com`
4. Kliknij **"Add"**

**Render wygeneruje:**
- CNAME target (np. `st-krakos-frontend.onrender.com`)
- IP adresy dla A Records (zwykle 2-4 adresy)

**Zapisz te informacje!** Będziesz ich potrzebował poniżej.

---

## 📋 KROK PO KROKU - Konfiguracja DNS w Namecheap

### KROK 1: Usuń Stare Rekordy

W Namecheap → Advanced DNS:

#### 1.1. Usuń CNAME Record:

- Znajdź rekord:
  ```
  Type: CNAME Record
  Host: www
  Value: parkingpage.namecheap.com.
  ```
- Kliknij **"Remove"** (ikona kosza)

#### 1.2. Usuń URL Redirect Record:

- Znajdź rekord:
  ```
  Type: URL Redirect Record
  Host: @
  Value: http://www.stkratos.com/
  ```
- Kliknij **"Remove"** (ikona kosza)

---

### KROK 2: Dodaj CNAME Record dla www

1. Kliknij **"Add New Record"**
2. Wybierz **"CNAME Record"** z listy Type
3. Wypełnij:
   - **Host:** `www`
   - **Value:** `st-krakos-frontend.onrender.com` (lub inny CNAME target z Render)
   - **TTL:** `Automatic` (lub wybierz `30 min`)
4. Kliknij **"Save"** (znaczek ✓)

**Przykład:**
```
Type: CNAME Record
Host: www
Value: st-krakos-frontend.onrender.com
TTL: Automatic
```

---

### KROK 3: Dodaj A Records dla Root Domain (@)

Render poda 2-4 IP adresy. **Dodaj każdy jako osobny A Record!**

#### 3.1. Pierwszy A Record:

1. Kliknij **"Add New Record"**
2. Wybierz **"A Record"** z listy Type
3. Wypełnij:
   - **Host:** `@`
   - **Value:** `[PIERWSZY_IP_Z_RENDER]` (np. `76.76.21.21`)
   - **TTL:** `Automatic`
4. Kliknij **"Save"**

#### 3.2. Drugi A Record:

1. Kliknij **"Add New Record"**
2. Wybierz **"A Record"**
3. Wypełnij:
   - **Host:** `@`
   - **Value:** `[DRUGI_IP_Z_RENDER]` (np. `76.76.22.22`)
   - **TTL:** `Automatic`
4. Kliknij **"Save"**

#### 3.3. Trzeci i Czwarty A Record (jeśli Render podał więcej IP):

- Powtórz kroki 3.1 i 3.2 dla każdego dodatkowego IP adresu
- **WAŻNE:** Każdy IP adres musi być osobnym A Recordem!

---

### KROK 4: Zostaw TXT Record

**NIE USUWAJ** tego rekordu:
```
Type: TXT Record
Host: @
Value: v=spf1 include:spf.efwd.registrar-servers.com ~all
```

To jest dla emaili - zostaw jak jest!

---

## ✅ Przykładowa Konfiguracja Po Zmianach

**Po skonfigurowaniu powinieneś mieć:**

| Type | Host | Value | TTL |
|------|------|-------|-----|
| **CNAME Record** | `www` | `st-krakos-frontend.onrender.com` | Automatic |
| **A Record** | `@` | `[IP_1_Z_RENDER]` | Automatic |
| **A Record** | `@` | `[IP_2_Z_RENDER]` | Automatic |
| **A Record** | `@` | `[IP_3_Z_RENDER]` | (jeśli jest) |
| **A Record** | `@` | `[IP_4_Z_RENDER]` | (jeśli jest) |
| **TXT Record** | `@` | `v=spf1 include:spf.efwd.registrar-servers.com ~all` | (zostaw) |

---

## 🔍 Jak Znaleźć Informacje z Render?

### W Render Dashboard:

1. Przejdź do **Frontend Service** (`st-krakos-frontend`)
2. Kliknij **Settings**
3. Przewiń do sekcji **"Custom Domains"**
4. Kliknij na domenę `stkratos.com`
5. Zobaczysz:
   - **CNAME target** dla www
   - **A Records** (IP adresy) dla root domain

**Przykład z Render:**
```
For www.stkratos.com, add a CNAME record pointing to:
st-krakos-frontend.onrender.com

For stkratos.com, add A records pointing to:
76.76.21.21
76.76.22.22
```

---

## ⏱️ Po Skonfigurowaniu

1. **Zapisz zmiany** w Namecheap
2. **Poczekaj na propagację DNS** (15 min - 48h, zwykle 1-2h)
3. **Sprawdź propagację:** https://dnschecker.org
4. **Sprawdź certyfikat SSL** w Render (automatycznie, 10-30 min)

---

## 🚨 Jeśli Nie Masz Informacji z Render

**Najpierw dodaj domenę w Render:**

1. Render Dashboard → Frontend → Settings → Custom Domains
2. Kliknij **"Add Custom Domain"**
3. Wpisz: `stkratos.com`
4. Render wygeneruje potrzebne informacje

**Dopiero potem** skonfiguruj DNS w Namecheap!

---

## 📞 Co Teraz?

**Odpowiedz na pytania:**

1. **Czy dodałeś domenę w Render Dashboard?**
   - [ ] TAK - mam CNAME target i IP adresy
   - [ ] NIE - jeszcze nie dodałem

2. **Jakie informacje Render wygenerował?**
   - CNAME target: `________________`
   - IP adresy: `________________`, `________________`

**Wyślij te informacje, a powiem Ci dokładnie co wpisać w Namecheap! 🚀**

