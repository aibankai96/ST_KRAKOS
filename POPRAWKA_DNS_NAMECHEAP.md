# 🔧 Poprawka Konfiguracji DNS w Namecheap

**Status:** Prawie dobrze, ale są 2 rzeczy do poprawienia! ✅

---

## ⚠️ PROBLEM 1: Kropka na końcu CNAME

**Obecnie masz:**
```
CNAME Record
Host: www
Value: st-krakos-frontend.onrender.com.
```

**Problem:** Kropka (`.`) na końcu może powodować problemy!

**Poprawka:**
1. Kliknij **"Remove"** przy tym rekordzie
2. Kliknij **"Add New Record"** → **"CNAME Record"**
3. Wypełnij:
   - **Host:** `www`
   - **Value:** `st-krakos-frontend.onrender.com` (BEZ kropki na końcu!)
   - **TTL:** `Automatic`
4. Kliknij **"Save"**

---

## ⚠️ PROBLEM 2: Może brakować drugiego A Record

Render zwykle podaje **2-4 IP adresy** dla A Records.

**Sprawdź w Render Dashboard:**
1. Frontend Service → Settings → Custom Domains
2. Kliknij na domenę `stkratos.com`
3. Sprawdź ile IP adresów Render podał dla A Records

**Jeśli Render podał więcej niż jeden IP:**
- Dodaj każdy jako osobny A Record
- Host: `@`
- Value: `[IP_ADRES]`
- TTL: `Automatic`

**Przykład (jeśli Render podał 2 IP):**
```
A Record
Host: @
Value: 76.76.21.21
TTL: Automatic

A Record
Host: @
Value: 76.76.22.22  (drugi IP z Render)
TTL: Automatic
```

---

## ✅ Poprawna Konfiguracja (Po Poprawkach)

| Type | Host | Value | TTL |
|------|------|-------|-----|
| **CNAME Record** | `www` | `st-krakos-frontend.onrender.com` (BEZ kropki!) | Automatic |
| **A Record** | `@` | `76.76.21.21` | Automatic |
| **A Record** | `@` | `[DRUGI_IP_Z_RENDER]` (jeśli Render podał) | Automatic |
| **TXT Record** | `@` | `v=spf1 include:spf.efwd.registrar-servers.com ~all` | (zostaw) |

---

## 📋 Checklista Poprawek

- [ ] Usunięto kropkę z końca CNAME Record
- [ ] CNAME Record: `www` → `st-krakos-frontend.onrender.com` (bez kropki)
- [ ] Sprawdzono ile IP adresów Render podał
- [ ] Dodano wszystkie A Records (jeśli Render podał więcej niż jeden)
- [ ] TXT Record pozostawiony bez zmian

---

## ⏱️ Po Poprawkach

1. **Zapisz zmiany** w Namecheap
2. **Poczekaj na propagację DNS** (15 min - 48h, zwykle 1-2h)
3. **Sprawdź propagację:** https://dnschecker.org
4. **Sprawdź certyfikat SSL** w Render (automatycznie, 10-30 min)

---

## 🔍 Jak Sprawdzić Ile IP Render Podał?

**W Render Dashboard:**
1. Frontend Service (`st-krakos-frontend`)
2. Settings → Custom Domains
3. Kliknij na domenę `stkratos.com`
4. Zobaczysz sekcję **"A Records"** z listą IP adresów

**Wyślij mi ile IP adresów widzisz, a powiem Ci dokładnie co dodać! 🚀**

