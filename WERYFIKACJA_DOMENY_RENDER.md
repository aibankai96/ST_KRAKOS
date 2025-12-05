# ✅ Weryfikacja Domeny w Render

**Frontend:** `st-krakos-frontend`  
**URL:** `https://st-krakos-frontend.onrender.com`

---

## 🔍 Sprawdź Czy Domena Jest Dodana w Render

### W Render Dashboard:

1. Przejdź do **Frontend Service** (`st-krakos-frontend`)
2. Kliknij zakładkę **"Settings"**
3. Przewiń w dół do sekcji **"Custom Domains"**

**Sprawdź:**
- Czy widzisz domenę `stkratos.com` na liście?
- Jaki jest status domeny? (Pending, Active, Error)

---

## ✅ Jeśli Domena NIE Jest Dodana:

1. W sekcji **"Custom Domains"** kliknij **"Add Custom Domain"**
2. Wpisz: `stkratos.com`
3. Kliknij **"Add"**
4. Render wygeneruje informacje DNS

---

## ✅ Jeśli Domena JEST Dodana:

**Sprawdź status:**
- **Pending** - DNS jeszcze się propaguje, poczekaj
- **Active** - Domena działa! ✅
- **Error** - Sprawdź błędy i popraw konfigurację DNS

---

## 📋 Finalna Konfiguracja DNS w Namecheap

**Po poprawkach powinieneś mieć:**

| Type | Host | Value | Status |
|------|------|-------|--------|
| **CNAME Record** | `www` | `st-krakos-frontend.onrender.com` (BEZ kropki!) | ✅/❌ |
| **A Record** | `@` | `76.76.21.21` | ✅ |
| **TXT Record** | `@` | `v=spf1 include:spf.efwd.registrar-servers.com ~all` | ✅ (zostaw) |

---

## ⚠️ WAŻNE: Usuń Kropkę z CNAME!

**Obecnie masz:**
```
CNAME Record
Host: www
Value: st-krakos-frontend.onrender.com.
```

**Poprawka:**
1. Kliknij **"Remove"** przy tym rekordzie
2. Kliknij **"Add New Record"** → **"CNAME Record"**
3. Wypełnij:
   - **Host:** `www`
   - **Value:** `st-krakos-frontend.onrender.com` (BEZ kropki!)
   - **TTL:** `Automatic`
4. Kliknij **"Save"**

---

## ⏱️ Po Poprawkach

1. **Zapisz zmiany** w Namecheap
2. **Poczekaj na propagację DNS** (15 min - 48h, zwykle 1-2h)
3. **Sprawdź propagację:** https://dnschecker.org
4. **Sprawdź status domeny** w Render Dashboard
5. **Sprawdź certyfikat SSL** w Render (automatycznie, 10-30 min)

---

## 🎯 Testy Po Propagacji

### Test 1: Root Domain
```
https://stkratos.com
```
Powinna wyświetlić się strona frontendu

### Test 2: WWW
```
https://www.stkratos.com
```
Powinna wyświetlić się strona frontendu

### Test 3: Certyfikat SSL
- Sprawdź czy jest zielona kłódka w przeglądarce
- Sprawdź czy URL zaczyna się od `https://`

---

## 📋 Checklista

- [ ] Domena dodana w Render Dashboard
- [ ] Kropka usunięta z CNAME Record w Namecheap
- [ ] CNAME Record: `www` → `st-krakos-frontend.onrender.com` (bez kropki)
- [ ] A Record: `@` → `76.76.21.21`
- [ ] TXT Record pozostawiony bez zmian
- [ ] DNS propagacja zakończona (sprawdzone przez dnschecker.org)
- [ ] Status domeny w Render: "Active"
- [ ] Certyfikat SSL wystawiony
- [ ] Domena działa: `https://stkratos.com`
- [ ] WWW działa: `https://www.stkratos.com`

---

**Daj znać:**
1. Czy domena jest dodana w Render?
2. Jaki jest status domeny w Render?
3. Czy usunąłeś kropkę z CNAME Record?

🚀

