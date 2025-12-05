# 🌐 Dodawanie Domeny w Render - Instrukcja

**Frontend:** `st-krakos-frontend`  
**Domena:** `stkratos.com`

---

## ✅ KROK 1: Dodaj Domenę w Render

### W Render Dashboard:

1. Przejdź do **Frontend Service** (`st-krakos-frontend`)
2. Kliknij zakładkę **"Settings"**
3. Przewiń w dół do sekcji **"Custom Domains"**
4. Kliknij **"Add Custom Domain"**

### Wypełnij:

- **Domain:** `stkratos.com`
- Kliknij **"Add"**

---

## ✅ KROK 2: Render Wygeneruje Informacje DNS

Po dodaniu domeny Render wyświetli:

### Dla www.stkratos.com:
```
Add a CNAME record:
Host: www
Value: st-krakos-frontend.onrender.com
```

### Dla stkratos.com (root domain):
```
Add A records:
Host: @
Value: [IP_ADRES] (np. 76.76.21.21)
```

**Zapisz te informacje!**

---

## ✅ KROK 3: Skonfiguruj DNS w Namecheap

### W Namecheap → Advanced DNS:

#### 3.1. Usuń Stare Rekordy (jeśli jeszcze są):

- CNAME Record: `www` → `parkingpage.namecheap.com.` → **Remove**
- URL Redirect Record: `@` → `http://www.stkratos.com/` → **Remove**

#### 3.2. Dodaj CNAME Record dla www:

1. Kliknij **"Add New Record"** → **"CNAME Record"**
2. Wypełnij:
   - **Host:** `www`
   - **Value:** `st-krakos-frontend.onrender.com` (BEZ kropki na końcu!)
   - **TTL:** `Automatic`
3. Kliknij **"Save"**

#### 3.3. Dodaj A Record dla root domain (@):

1. Kliknij **"Add New Record"** → **"A Record"**
2. Wypełnij:
   - **Host:** `@`
   - **Value:** `[IP_ADRES_Z_RENDER]` (np. `76.76.21.21`)
   - **TTL:** `Automatic`
3. Kliknij **"Save"**

---

## ✅ KROK 4: Poczekaj na Propagację DNS

- DNS może potrzebować **15 minut - 48 godzin** (zwykle 1-2h)
- Sprawdź propagację: https://dnschecker.org

---

## ✅ KROK 5: Sprawdź Status w Render

W Render Dashboard → Frontend → Settings → Custom Domains:

**Status domeny:**
- **Pending** - DNS się propaguje, poczekaj
- **Active** - Domena działa! ✅
- **Error** - Sprawdź błędy i popraw DNS

---

## ✅ KROK 6: Sprawdź Certyfikat SSL

Render automatycznie wystawi certyfikat SSL (10-30 minut).

**Sprawdź:**
- W Render Dashboard → Custom Domains → status certyfikatu
- W przeglądarce: zielona kłódka przy `https://stkratos.com`

---

## 📋 Finalna Konfiguracja DNS w Namecheap

| Type | Host | Value | TTL |
|------|------|-------|-----|
| **CNAME Record** | `www` | `st-krakos-frontend.onrender.com` (BEZ kropki!) | Automatic |
| **A Record** | `@` | `[IP_Z_RENDER]` | Automatic |
| **TXT Record** | `@` | `v=spf1 include:spf.efwd.registrar-servers.com ~all` | (zostaw) |

---

## 🎯 Testy Po Propagacji

### Test 1: Root Domain
```
https://stkratos.com
```

### Test 2: WWW
```
https://www.stkratos.com
```

**Oba powinny wyświetlać stronę frontendu!**

---

## 📋 Checklista

- [ ] Domena dodana w Render Dashboard (Custom Domains)
- [ ] Informacje DNS z Render zapisane
- [ ] Stare rekordy DNS usunięte w Namecheap
- [ ] CNAME Record dla www dodany (bez kropki!)
- [ ] A Record dla @ dodany
- [ ] DNS propagacja zakończona
- [ ] Status domeny w Render: "Active"
- [ ] Certyfikat SSL wystawiony
- [ ] Domena działa: `https://stkratos.com`
- [ ] WWW działa: `https://www.stkratos.com`

---

**Daj znać czy dodałeś domenę w Render i jakie informacje DNS Render wygenerował! 🚀**

