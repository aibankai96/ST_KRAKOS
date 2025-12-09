# 🔒 Analiza Bezpieczeństwa i Zgodności z RODO - ST KRATOS

**Data:** 2025-12-08  
**Status:** ⚠️ **WYMAGANE DZIAŁANIA**

---

## 📋 EXECUTIVE SUMMARY

Aplikacja ma **podstawowe zabezpieczenia techniczne**, ale **brakuje zgodności z RODO** w zakresie:
- Polityki prywatności
- Zgody użytkownika na tracking (analytics)
- Informacji o przetwarzaniu danych
- Zarządzania cookies/localStorage

---

## ✅ CO DZIAŁA DOBRZE (Bezpieczeństwo Techniczne)

### 1. **Backend Security** ✅
- ✅ Rate limiting (200/dzień, 50/godzinę)
- ✅ Walidacja danych wejściowych
- ✅ Sanityzacja inputów (XSS protection)
- ✅ Error handling z kodami błędów
- ✅ CORS skonfigurowany (nie pozwala na *)
- ✅ SECRET_KEY wymagany w produkcji
- ✅ Logging strukturalny

**Lokalizacja:** `backend/api/routes.py`, `backend/utils/validators.py`, `backend/config.py`

### 2. **Frontend Security** ✅
- ✅ Sanityzacja inputów w formularzach
- ✅ Walidacja po stronie klienta
- ✅ Service Worker z bezpiecznymi praktykami
- ✅ Timeout dla requestów (30s)
- ✅ Retry logic z limitami

**Lokalizacja:** `frontend/src/utils/validators.js`, `frontend/src/utils/api.js`

### 3. **XSS Protection** ✅
- ✅ Sanityzacja HTML (`sanitize_html`)
- ✅ Usuwanie `<script>`, `<iframe>`, event handlers
- ✅ Usuwanie `javascript:` i `data:` URLs

**Lokalizacja:** `backend/utils/validators.py:55-79`

---

## ❌ CO WYMAGA NAPRAWY (RODO i Prywatność)

### 1. **BRAK POLITYKI PRYWATNOŚCI** 🔴 **KRYTYCZNE**

**Problem:**
- Nie ma strony z polityką prywatności
- Użytkownicy nie wiedzą, jak ich dane są przetwarzane

**Wymagania RODO:**
- Art. 13 RODO: Informacja o przetwarzaniu danych osobowych
- Art. 14 RODO: Informacja gdy dane nie pochodzą od osoby
- Art. 30 RODO: Rejestr czynności przetwarzania

**Co należy dodać:**
1. Strona `/polityka-prywatnosci` (PL) i `/privacy-policy` (EN)
2. Informacja o:
   - Administratorze danych
   - Celach przetwarzania
   - Podstawie prawnej
   - Okresie przechowywania
   - Prawach użytkownika
   - Contact data protection officer

---

### 2. **BRAK ZGODY NA TRACKING (Analytics)** 🔴 **KRYTYCZNE**

**Problem:**
- Analytics używa `localStorage` **BEZ zgody użytkownika**
- Zbierane dane: urządzenie, przeglądarka, OS, data otwarcia strony
- To są **dane techniczne**, ale mogą być **dane osobowe** jeśli można zidentyfikować użytkownika

**Lokalizacja:** `frontend/src/utils/analytics.js:175-222`

**Zbierane dane:**
```javascript
- totalOpens (liczba otwarć)
- opensByDate (otwarcia według daty)
- opensByDevice (iPhone, iPad, Mac, Windows, Android...)
- opensByBrowser (Chrome, Safari, Firefox...)
- opensByOS (Windows, macOS, iOS, Android...)
- opensByDeviceBrowser (kombinacje)
- firstOpen (pierwsza data otwarcia)
```

**Wymagania RODO:**
- Art. 6 RODO: Podstawa prawna przetwarzania
- Art. 7 RODO: Warunki zgody
- Art. 13 RODO: Informacja przed zbieraniem danych

**Rozwiązanie:**
1. **Cookie/LocalStorage Consent Banner**
   - Pokazuj banner przed użyciem localStorage
   - "Ta strona używa plików cookie/technologii lokalnego przechowywania..."
   - Przycisk "Akceptuj" i "Odrzuć"
   - Opcja "Ustawienia" (szczegóły)

2. **Opt-out Analytics**
   - Jeśli użytkownik nie wyrazi zgody → nie trackuj
   - Sprawdź zgodę przed wywołaniem `trackVisit()`

3. **Informacja w Polityce Prywatności**
   - Opisz dokładnie, jakie dane zbieramy
   - Do jakich celów
   - Jak długo przechowujemy
   - Czy udostępniamy innym

---

### 3. **BRAK INFORMACJI O LOCALSTORAGE** 🟡 **WAŻNE**

**Problem:**
- Używamy `localStorage` dla:
  - Analytics (`st_kratos_analytics`)
  - Język (`lang`)
- Brak informacji dla użytkownika

**Lokalizacja:**
- `frontend/src/utils/analytics.js:75` - `localStorage.setItem(STORAGE_KEY, ...)`
- `frontend/src/utils/i18n.js:29,31` - `localStorage.getItem/setItem('lang', ...)`

**Rozwiązanie:**
- Dodać informację w polityce prywatności
- Cookie consent banner powinien wspomnieć localStorage

---

### 4. **FORMULARZ KONTAKTOWY** 🟡 **DO WERYFIKACJI**

**Problem:**
- W kodzie nie widzę obsługi formularza kontaktowego
- Jest tylko email: `officestkratos@gmail.com`
- Jeśli będzie formularz → wymaga zgody na przetwarzanie danych

**Wymagania RODO dla formularzy:**
- Art. 13 RODO: Informacja przy zbieraniu danych
- Checkbox: "Wyrażam zgodę na przetwarzanie danych osobowych..."
- Link do polityki prywatności
- Informacja o prawie do cofnięcia zgody

**Rekomendacja:**
- Jeśli dodasz formularz kontaktowy → dodaj zgodę RODO
- Przechowuj zgodę wraz z formularzem (logi)

---

### 5. **BRAK REJESTRU CZYNNOŚCI PRZETWARZANIA** 🟡 **WAŻNE**

**Wymaganie RODO:**
- Art. 30 RODO: Rejestr czynności przetwarzania danych osobowych

**Co należy dokumentować:**
1. **Analytics:**
   - Cel: Statystyki użycia strony
   - Dane: Urządzenie, przeglądarka, OS, data
   - Okres: Do odwołania zgody lub maksymalnie 2 lata
   - Podstawa: Zgoda użytkownika (Art. 6 ust. 1 lit. a RODO)

2. **Język (localStorage):**
   - Cel: Zapamiętanie preferencji języka
   - Dane: Wybór języka (pl/en)
   - Okres: Do czasu wyczyszczenia przeglądarki
   - Podstawa: Prawnie uzasadniony interes (Art. 6 ust. 1 lit. f RODO)

---

## 📝 PLAN DZIAŁANIA

### **Faza 1: Cookie Consent Banner** (PRIORYTET: WYSOKI)

1. Utworzyć komponent `CookieConsent`
2. Wyświetlać banner przed użyciem localStorage
3. Zapisywać zgodę w localStorage
4. Sprawdzać zgodę przed trackingiem analytics

**Pliki do utworzenia:**
- `frontend/src/components/CookieConsent.js`
- `frontend/src/utils/consent.js`

**Modyfikacje:**
- `frontend/src/utils/analytics.js` - sprawdź zgodę przed trackingiem
- `frontend/src/main.js` - inicjalizuj CookieConsent

---

### **Faza 2: Polityka Prywatności** (PRIORYTET: WYSOKI)

1. Utworzyć stronę `/polityka-prywatnosci` (PL)
2. Utworzyć stronę `/privacy-policy` (EN)
3. Dodać link w footerze
4. Opisać wszystkie zbierane dane

**Pliki do utworzenia:**
- `frontend/src/pages/privacy.js`
- Dodaj tłumaczenia w `frontend/src/utils/i18n.js`

**Zawartość polityki:**
- Administrator danych
- Cele przetwarzania
- Podstawa prawna
- Okres przechowywania
- Prawa użytkownika (dostęp, sprostowanie, usunięcie, przenoszenie, sprzeciw)
- Contact: `officestkratos@gmail.com`

---

### **Faza 3: Opt-out Analytics** (PRIORYTET: ŚREDNI)

1. Modyfikować `analytics.js` aby sprawdzał zgodę
2. Jeśli brak zgody → nie trackuj
3. Dodać możliwość usunięcia danych (przycisk w statystykach)

---

### **Faza 4: Rejestr Czynności Przetwarzania** (PRIORYTET: ŚREDNI)

1. Utworzyć dokument `REJESTR_CZYNNOSCI_PRZETWARZANIA.md`
2. Opisać wszystkie czynności przetwarzania
3. Regularnie aktualizować

---

## 🎯 SZCZEGÓŁOWE WYMAGANIA RODO

### **Art. 13 RODO - Informacja przy zbieraniu danych od osoby:**

✅ **Co mamy:**
- Brak (wymagane dodanie)

✅ **Co należy dodać:**
1. Tożsamość administratora danych: **ST KRATOS**
2. Contact DPO (jeśli jest): `officestkratos@gmail.com`
3. Cele przetwarzania:
   - Statystyki użycia strony (analytics)
   - Zapamiętanie preferencji języka
4. Podstawa prawna:
   - Analytics: **Zgoda** (Art. 6 ust. 1 lit. a RODO)
   - Język: **Prawnie uzasadniony interes** (Art. 6 ust. 1 lit. f RODO)
5. Okres przechowywania:
   - Analytics: Do odwołania zgody lub maksymalnie 2 lata
   - Język: Do czasu wyczyszczenia przeglądarki
6. Prawa użytkownika:
   - Prawo dostępu (Art. 15 RODO)
   - Prawo sprostowania (Art. 16 RODO)
   - Prawo usunięcia (Art. 17 RODO)
   - Prawo ograniczenia (Art. 18 RODO)
   - Prawo przenoszenia (Art. 20 RODO)
   - Prawo sprzeciwu (Art. 21 RODO)
   - Prawo cofnięcia zgody (Art. 7 ust. 3 RODO)
7. Prawo wniesienia skargi do UODO

---

### **Art. 7 RODO - Warunki zgody:**

✅ **Co mamy:**
- Brak (wymagane dodanie)

✅ **Co należy dodać:**
1. Zgoda musi być **dobrowolna**
2. Zgoda musi być **konkretna** (dla każdego celu osobno)
3. Zgoda musi być **świadoma** (użytkownik wie na co się zgadza)
4. Możliwość **cofnięcia zgody** (łatwe)
5. **Dokumentowanie zgody** (kiedy, jak)

---

## 🔍 ANALIZA ZBIERANYCH DANYCH

### **Analytics (`st_kratos_analytics`):**

**Dane:**
- Urządzenie (iPhone, iPad, Mac, Windows, Android...)
- Przeglądarka (Chrome, Safari, Firefox...)
- System operacyjny (Windows, macOS, iOS, Android...)
- Data i czas otwarcia strony
- Liczba otwarć

**Czy to dane osobowe?**
- ⚠️ **Tak, jeśli można zidentyfikować użytkownika**
- Kombinacja urządzenie + przeglądarka + OS + data może być unikalna
- Jeśli localStorage jest przechowywany długo → może identyfikować użytkownika

**Kwalifikacja RODO:**
- ✅ **Dane osobowe** (jeśli można zidentyfikować)
- Wymaga zgody lub innej podstawy prawnej

---

### **Język (`lang`):**

**Dane:**
- Wybór języka (pl/en)

**Czy to dane osobowe?**
- ⚠️ **Tylko preferencja**, nie identyfikuje użytkownika
- Można użyć **prawnie uzasadnionego interesu** (Art. 6 ust. 1 lit. f RODO)

---

## 📊 OCENA RYZYKA

| Obszar | Ryzyko | Priorytet | Status |
|--------|--------|-----------|--------|
| Polityka prywatności | 🔴 WYSOKIE | WYSOKI | ❌ BRAK |
| Zgoda na analytics | 🔴 WYSOKIE | WYSOKI | ❌ BRAK |
| Informacja o localStorage | 🟡 ŚREDNIE | ŚREDNI | ❌ BRAK |
| Formularz kontaktowy | 🟢 NISKIE | NISKI | ⚠️ DO WERYFIKACJI |
| Rejestr czynności | 🟡 ŚREDNIE | ŚREDNI | ❌ BRAK |
| Backend security | 🟢 NISKIE | - | ✅ OK |
| Frontend security | 🟢 NISKIE | - | ✅ OK |

---

## ✅ REKOMENDACJE DZIAŁAŃ

### **Natychmiastowe (PRZED PUBLIKACJĄ):**

1. ✅ **Dodaj Cookie Consent Banner**
2. ✅ **Utwórz Politykę Prywatności**
3. ✅ **Sprawdź zgodę przed trackingiem analytics**

### **Wkrótce (W CIĄGU 30 DNI):**

4. ✅ **Utwórz Rejestr Czynności Przetwarzania**
5. ✅ **Dodaj możliwość opt-out z analytics**
6. ✅ **Dodaj link do polityki w footerze**

### **Opcjonalne (W PRZYSZŁOŚCI):**

7. ✅ **Dodaj formularz kontaktowy z zgodą RODO**
8. ✅ **Dodaj możliwość eksportu danych użytkownika**
9. ✅ **Dodaj możliwość usunięcia danych**

---

## 📚 MATERIAŁY PRAWNE

- **RODO:** Rozporządzenie UE 2016/679
- **Ustawa o ochronie danych osobowych:** Ustawa z dnia 10 maja 2018 r.
- **Wytyczne UODO:** https://uodo.gov.pl/
- **Wytyczne EDPB:** https://edpb.europa.eu/

---

**Status:** ⚠️ **WYMAGANE DZIAŁANIA PRZED PUBLIKACJĄ**

