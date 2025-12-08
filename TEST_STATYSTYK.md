# 🧪 Testy Systemu Statystyk

## Test 1: Sprawdzenie inicjalizacji

**W konsoli przeglądarki (F12) wpisz:**
```javascript
// Sprawdź czy analytics jest załadowany
console.log('Analytics:', window.analytics || 'Not found')

// Sprawdź czy initSecretCode jest wywołane
// Powinno być w konsoli: "[Stats] Initializing secret code detection"
```

**Oczekiwany wynik:**
- ✅ `[Stats] Initializing secret code detection`
- ✅ `[Stats] Secret code listener added`

---

## Test 2: Sprawdzenie wykrywania klawiszy

**W konsoli przeglądarki wpisz:**
```javascript
// Test wykrywania klawiszy
let testSequence = ''
document.addEventListener('keydown', (e) => {
  testSequence += e.key
  console.log('Key pressed:', e.key, 'Sequence:', testSequence)
  if (testSequence.length > 6) {
    testSequence = testSequence.slice(-6)
  }
  if (testSequence === '112233') {
    console.log('✅ Secret code detected in test!')
    testSequence = ''
  }
})
```

**Następnie wpisz "112233" na stronie**

**Oczekiwany wynik:**
- ✅ Każdy klawisz jest logowany
- ✅ Sekwencja się buduje
- ✅ Po wpisaniu "112233" pojawia się komunikat

---

## Test 3: Sprawdzenie danych analityki

**W konsoli przeglądarki wpisz:**
```javascript
// Sprawdź dane w localStorage
const data = localStorage.getItem('st_kratos_analytics')
console.log('Analytics data:', data ? JSON.parse(data) : 'No data')

// Sprawdź getStats()
import('./src/utils/analytics.js').then(module => {
  const stats = module.analytics.getStats()
  console.log('Stats:', stats)
})
```

**Oczekiwany wynik:**
- ✅ Dane są w localStorage
- ✅ getStats() zwraca obiekt z danymi

---

## Test 4: Test ręcznego otwarcia modala

**W konsoli przeglądarki wpisz:**
```javascript
// Ręczne otwarcie modala
import('./src/utils/statsModal.js').then(module => {
  // Sprawdź czy funkcja istnieje
  console.log('Module:', module)
  
  // Spróbuj wywołać showStatsModal bezpośrednio
  // (jeśli jest eksportowana)
})
```

**Lub:**
```javascript
// Bezpośrednie wywołanie
import('./src/utils/analytics.js').then(analyticsModule => {
  import('./src/utils/statsModal.js').then(statsModule => {
    const stats = analyticsModule.analytics.getStats()
    console.log('Stats for modal:', stats)
    // Modal powinien się otworzyć
  })
})
```

---

## Test 5: Sprawdzenie błędów w konsoli

**Otwórz konsolę (F12) i sprawdź:**
- ❌ Czy są błędy JavaScript?
- ❌ Czy są błędy importów?
- ❌ Czy są błędy w analityce?

**Typowe błędy:**
- `Cannot read property 'getStats' of undefined` - analytics nie jest załadowany
- `analytics is not defined` - import nie działa
- `Cannot read property 'totalOpens' of undefined` - stats są undefined

---

## Test 6: Sprawdzenie CSS modala

**W konsoli przeglądarki wpisz:**
```javascript
// Sprawdź czy style są załadowane
const styles = document.styleSheets
let statsModalFound = false
for (let sheet of styles) {
  try {
    for (let rule of sheet.cssRules) {
      if (rule.selectorText && rule.selectorText.includes('stats-modal')) {
        statsModalFound = true
        console.log('✅ Stats modal CSS found:', rule.selectorText)
      }
    }
  } catch (e) {}
}
if (!statsModalFound) {
  console.log('❌ Stats modal CSS not found')
}
```

---

## 🔍 Diagnostyka krok po kroku:

1. **Otwórz konsolę** (F12)
2. **Sprawdź czy są błędy** (czerwone komunikaty)
3. **Wpisz kod "112233"** i obserwuj konsolę
4. **Sprawdź logi** - powinny być:
   - `[Stats] Initializing secret code detection`
   - `[Stats] Secret code listener added`
   - `[Stats] Secret code detected!` (po wpisaniu kodu)
   - `[Stats] Showing stats modal...`
   - `[Stats] Stats data: {...}`
   - `[Stats] Modal displayed`

---

## 🚨 Najczęstsze problemy:

### Problem 1: Analytics nie jest załadowany
**Objaw:** `analytics is not defined`
**Rozwiązanie:** Sprawdź czy import działa w main.js

### Problem 2: Event listener nie działa
**Objaw:** Brak logów w konsoli
**Rozwiązanie:** Sprawdź czy initSecretCode() jest wywoływane

### Problem 3: Modal się nie wyświetla
**Objaw:** Modal jest w DOM ale niewidoczny
**Rozwiązanie:** Sprawdź CSS - może brakować klasy `.show`

### Problem 4: Błąd w getStats()
**Objaw:** `Cannot read property 'totalOpens' of undefined`
**Rozwiązanie:** Sprawdź czy stats są poprawnie inicjalizowane

---

**Wykonaj te testy i prześlij wyniki!**

