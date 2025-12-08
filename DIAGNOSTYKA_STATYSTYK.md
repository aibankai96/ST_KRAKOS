# 🔍 Szczegółowa Diagnostyka Problemów ze Statystykami

## 📋 Checklista Diagnostyczna

### ✅ Krok 1: Sprawdź czy kod się ładuje

**W konsoli przeglądarki (F12) wpisz:**
```javascript
// Sprawdź czy moduły są załadowane
console.log('Window:', window)
console.log('Document ready:', document.readyState)
```

**Oczekiwany wynik:**
- `Document ready: complete` lub `interactive`

---

### ✅ Krok 2: Sprawdź logi inicjalizacji

**Po załadowaniu strony sprawdź w konsoli:**
- `[Stats] Initializing secret code detection` - powinno być
- `[Stats] Secret code listener added` - powinno być
- `[Analytics] Error initializing:` - NIE powinno być

**Jeśli brak logów:**
- Problem z importem modułów
- Problem z timingiem (setTimeout 2900ms)

---

### ✅ Krok 3: Test wykrywania klawiszy

**W konsoli wpisz:**
```javascript
// Test podstawowy - czy klawisze są wykrywane
let testKeys = []
document.addEventListener('keydown', (e) => {
  testKeys.push(e.key)
  console.log('Key detected:', e.key, 'Total:', testKeys.length)
  if (testKeys.length > 10) testKeys = []
}, {once: false})
```

**Następnie naciśnij kilka klawiszy na stronie**

**Oczekiwany wynik:**
- Każdy klawisz jest logowany w konsoli

**Jeśli nie działa:**
- Problem z event listenerem
- Może być zablokowany przez inny kod

---

### ✅ Krok 4: Test sekwencji kodu

**W konsoli wpisz:**
```javascript
// Test sekwencji "112233"
let seq = ''
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
  seq += e.key
  console.log('Sequence:', seq)
  if (seq.length > 6) seq = seq.slice(-6)
  if (seq === '112233') {
    console.log('✅ CODE DETECTED!')
    seq = ''
  }
})
```

**Następnie wpisz "112233" na stronie**

**Oczekiwany wynik:**
- Sekwencja się buduje
- Po "112233" pojawia się `✅ CODE DETECTED!`

---

### ✅ Krok 5: Test analityki

**W konsoli wpisz:**
```javascript
// Sprawdź localStorage
const data = localStorage.getItem('st_kratos_analytics')
if (data) {
  console.log('✅ Analytics data found:', JSON.parse(data))
} else {
  console.log('❌ No analytics data')
}

// Sprawdź czy analytics jest dostępny
// (wymaga załadowania modułu)
```

**Oczekiwany wynik:**
- Dane są w localStorage
- Obiekt z `totalOpens`, `opensByDate`, etc.

---

### ✅ Krok 6: Test ręcznego wywołania modala

**W konsoli wpisz:**
```javascript
// Ręczne wywołanie funkcji (jeśli dostępna)
// Najpierw sprawdź czy modal można utworzyć
const testModal = document.createElement('div')
testModal.className = 'stats-modal show'
testModal.innerHTML = '<div style="padding: 20px; background: red; color: white;">TEST MODAL</div>'
document.body.appendChild(testModal)
setTimeout(() => testModal.remove(), 3000)
```

**Oczekiwany wynik:**
- Czerwony modal "TEST MODAL" pojawia się na 3 sekundy

**Jeśli nie działa:**
- Problem z CSS (z-index, display, etc.)

---

### ✅ Krok 7: Sprawdź błędy JavaScript

**W konsoli sprawdź:**
- ❌ Czerwone błędy (Errors)
- ⚠️ Żółte ostrzeżenia (Warnings)

**Typowe błędy:**
1. `Cannot read property 'getStats' of undefined`
   - **Przyczyna:** analytics nie jest załadowany
   - **Rozwiązanie:** Sprawdź import w main.js

2. `analytics is not defined`
   - **Przyczyna:** Import nie działa
   - **Rozwiązanie:** Sprawdź ścieżkę importu

3. `Cannot read property 'totalOpens' of undefined`
   - **Przyczyna:** stats są undefined
   - **Rozwiązanie:** Sprawdź loadStats() w analytics.js

4. `TypeError: Cannot read property 'addEventListener' of null`
   - **Przyczyna:** Element nie istnieje
   - **Rozwiązanie:** Sprawdź czy document.body istnieje

---

### ✅ Krok 8: Sprawdź CSS modala

**W konsoli wpisz:**
```javascript
// Sprawdź czy style są załadowane
const testEl = document.createElement('div')
testEl.className = 'stats-modal'
document.body.appendChild(testEl)
const styles = window.getComputedStyle(testEl)
console.log('Modal styles:', {
  position: styles.position,
  zIndex: styles.zIndex,
  display: styles.display,
  opacity: styles.opacity
})
testEl.remove()
```

**Oczekiwany wynik:**
- `position: fixed`
- `zIndex: 10000` (lub wysoka wartość)
- `opacity: 0` (domyślnie)

---

### ✅ Krok 9: Test pełnego flow

**Wykonaj krok po kroku:**

1. **Otwórz stronę** (localhost lub Render)
2. **Otwórz konsolę** (F12)
3. **Poczekaj 3 sekundy** (na setTimeout)
4. **Sprawdź logi:**
   ```
   [Stats] Initializing secret code detection
   [Stats] Secret code listener added
   ```
5. **Wpisz "112233"** (nie w input/textarea)
6. **Sprawdź logi:**
   ```
   [Stats] Secret code detected!
   [Stats] Showing stats modal...
   [Stats] Stats data: {...}
   [Stats] Modal displayed
   ```
7. **Sprawdź czy modal jest widoczny**

---

## 🚨 Najczęstsze Problemy i Rozwiązania

### Problem 1: Brak logów inicjalizacji
**Objaw:** Brak `[Stats] Initializing...` w konsoli
**Możliwe przyczyny:**
- `initSecretCode()` nie jest wywoływane
- setTimeout nie działa
- Błąd w importach

**Rozwiązanie:**
```javascript
// W konsoli sprawdź:
console.log('initSecretCode:', typeof initSecretCode)
// Jeśli undefined - problem z importem
```

---

### Problem 2: Kod nie jest wykrywany
**Objaw:** Wpisujesz "112233" ale nic się nie dzieje
**Możliwe przyczyny:**
- Event listener nie działa
- Kod jest blokowany
- Sekwencja się resetuje

**Rozwiązanie:**
- Sprawdź czy nie jesteś w input/textarea
- Sprawdź logi w konsoli
- Sprawdź czy `codeSequence` się buduje

---

### Problem 3: Modal się nie wyświetla
**Objaw:** Kod jest wykryty, ale modal niewidoczny
**Możliwe przyczyny:**
- CSS problem (z-index, opacity)
- Modal jest poza viewport
- Klasa `.show` nie jest dodawana

**Rozwiązanie:**
```javascript
// W konsoli sprawdź:
const modal = document.querySelector('.stats-modal')
if (modal) {
  console.log('Modal found:', modal)
  console.log('Has show class:', modal.classList.contains('show'))
  console.log('Computed styles:', window.getComputedStyle(modal))
} else {
  console.log('Modal not found in DOM')
}
```

---

### Problem 4: Błąd w getStats()
**Objaw:** `Cannot read property 'totalOpens' of undefined`
**Możliwe przyczyny:**
- `this.stats` jest undefined
- `loadStats()` zwraca undefined
- localStorage jest uszkodzony

**Rozwiązanie:**
```javascript
// W konsoli sprawdź:
const data = localStorage.getItem('st_kratos_analytics')
if (data) {
  try {
    const parsed = JSON.parse(data)
    console.log('Parsed data:', parsed)
  } catch (e) {
    console.error('Invalid JSON:', e)
    // Wyczyść localStorage
    localStorage.removeItem('st_kratos_analytics')
  }
}
```

---

## 📊 Raport Diagnostyczny

**Wykonaj wszystkie testy i wypełnij:**

- [ ] Krok 1: Kod się ładuje
- [ ] Krok 2: Logi inicjalizacji są widoczne
- [ ] Krok 3: Klawisze są wykrywane
- [ ] Krok 4: Sekwencja "112233" jest wykrywana
- [ ] Krok 5: Analityka działa
- [ ] Krok 6: Modal można utworzyć ręcznie
- [ ] Krok 7: Brak błędów JavaScript
- [ ] Krok 8: CSS modala jest poprawny
- [ ] Krok 9: Pełny flow działa

**Wyniki:**
- ✅ Działa
- ❌ Nie działa
- ⚠️ Częściowo działa

**Błędy w konsoli:**
```
[Tutaj wklej błędy z konsoli]
```

**Logi z konsoli:**
```
[Tutaj wklej logi z konsoli]
```

