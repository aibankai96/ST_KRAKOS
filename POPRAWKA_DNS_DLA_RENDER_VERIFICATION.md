# 🔧 Poprawka DNS dla Weryfikacji Domeny w Render

**Status:** Domena dodana w Render, ale wymaga weryfikacji DNS ⚠️

**Render wymaga:**
- **Root domain (`stkratos.com`):** ANAME/ALIAS → `st-krakos-frontend.onrender.com` LUB A record → `216.24.57.1`
- **WWW (`www.stkratos.com`):** CNAME → `st-krakos-frontend.onrender.com`

---

## ⚠️ WAŻNE: Zmień IP Adres w A Record!

**Render pokazuje inny IP niż wcześniej!**

**Nowy IP z Render:** `216.24.57.1`  
**Stary IP (który masz):** `76.76.21.21`

**Musisz zmienić A Record na nowy IP!**

---

## ✅ KROK 1: Popraw A Record w Namecheap

### W Namecheap → Advanced DNS:

1. Znajdź A Record:
   ```
   A Record
   Host: @
   Value: 76.76.21.21
   ```

2. Kliknij **"Remove"** (usuń stary)

3. Kliknij **"Add New Record"** → **"A Record"**

4. Wypełnij:
   - **Host:** `@`
   - **Value:** `216.24.57.1` (NOWY IP z Render!)
   - **TTL:** `Automatic`

5. Kliknij **"Save"**

---

## ✅ KROK 2: Sprawdź CNAME Record dla www

### W Namecheap → Advanced DNS:

**Sprawdź czy masz:**

```
CNAME Record
Host: www
Value: st-krakos-frontend.onrender.com (BEZ kropki!)
TTL: Automatic
```

**Jeśli masz kropkę na końcu:**
1. Kliknij **"Remove"**
2. Dodaj nowy:
   - **Host:** `www`
   - **Value:** `st-krakos-frontend.onrender.com` (bez kropki!)
   - **TTL:** `Automatic`

---

## ✅ KROK 3: Finalna Konfiguracja DNS w Namecheap

**Po poprawkach powinieneś mieć:**

| Type | Host | Value | TTL |
|------|------|-------|-----|
| **CNAME Record** | `www` | `st-krakos-frontend.onrender.com` (BEZ kropki!) | Automatic |
| **A Record** | `@` | `216.24.57.1` (NOWY IP!) | Automatic |
| **TXT Record** | `@` | `v=spf1 include:spf.efwd.registrar-servers.com ~all` | (zostaw) |

---

## ✅ KROK 4: Weryfikacja w Render

### Po poprawkach DNS:

1. W Render Dashboard → Frontend → Settings → Custom Domains
2. Kliknij **"Verify"** przy domenie `stkratos.com`
3. Render sprawdzi konfigurację DNS

**Status powinien zmienić się na:**
- **Pending** → DNS się propaguje
- **Active** → Domena działa! ✅

---

## ⏱️ Czas Propagacji

- DNS może potrzebować **15 minut - 48 godzin** (zwykle 1-2h)
- Po propagacji kliknij **"Verify"** w Render
- Render automatycznie wystawi certyfikat SSL (10-30 min)

---

## 🔍 Sprawdź Propagację DNS

**Użyj narzędzia:** https://dnschecker.org

1. Wpisz: `stkratos.com`
2. Sprawdź czy A Record wskazuje na: `216.24.57.1`
3. Wpisz: `www.stkratos.com`
4. Sprawdź czy CNAME wskazuje na: `st-krakos-frontend.onrender.com`

---

## 📋 Checklista Poprawek

- [ ] A Record zmieniony na nowy IP: `216.24.57.1`
- [ ] CNAME Record dla www bez kropki: `st-krakos-frontend.onrender.com`
- [ ] DNS propagacja zakończona (sprawdzone przez dnschecker.org)
- [ ] Kliknięto "Verify" w Render Dashboard
- [ ] Status domeny w Render: "Active"
- [ ] Certyfikat SSL wystawiony
- [ ] Domena działa: `https://stkratos.com`
- [ ] WWW działa: `https://www.stkratos.com`

---

## 🚨 Najważniejsze Zmiany

1. **A Record:** `76.76.21.21` → `216.24.57.1` (NOWY IP!)
2. **CNAME Record:** Usuń kropkę z końca (jeśli jest)
3. **Kliknij "Verify"** w Render po propagacji DNS

---

**Zmień IP w A Record na `216.24.57.1` i kliknij "Verify" w Render! 🚀**

