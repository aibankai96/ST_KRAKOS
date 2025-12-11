export function renderPrivacy(container) {
  if (!container) return
  
  container.setAttribute('data-privacy-rendering', 'true')
  window.isRenderingPrivacy = true
  
  const html = `
    <section class="privacy-page" style="padding: 4rem 2rem; color: white; min-height: 100vh;">
      <div class="container" style="max-width: 800px; margin: 0 auto;">
        <h1 style="font-size: 2.5rem; margin-bottom: 2rem;">Polityka Prywatności</h1>
        <p style="margin-bottom: 2rem; opacity: 0.8;">Ostatnia aktualizacja: 2025-12-08</p>
        
        <div class="privacy-content" style="line-height: 1.8;">
          <p style="margin-bottom: 2rem; font-size: 1.1rem;">
            Niniejsza Polityka Prywatności opisuje, jak ST KRATOS zbiera, wykorzystuje i chroni Twoje dane osobowe zgodnie z Rozporządzeniem Ogólnym o Ochronie Danych (RODO).
          </p>
          
          <section style="margin-bottom: 3rem;">
            <h2 style="font-size: 1.8rem; margin-bottom: 1rem; color: #4CAF50;">1. Administrator Danych</h2>
            <p style="margin-bottom: 1rem;">Administratorem danych osobowych jest ST KRATOS. W przypadku pytań dotyczących przetwarzania danych osobowych, skontaktuj się z nami:</p>
            <p><strong>Email:</strong> officestkratos@gmail.com</p>
          </section>
          
          <section style="margin-bottom: 3rem;">
            <h2 style="font-size: 1.8rem; margin-bottom: 1rem; color: #4CAF50;">2. Jakie dane zbieramy?</h2>
            <p style="margin-bottom: 1rem;">Zbieramy następujące dane:</p>
            <h3 style="font-size: 1.3rem; margin-top: 1.5rem; margin-bottom: 1rem;">Dane analityczne (tylko za zgodą):</h3>
            <ul style="margin-left: 2rem; margin-bottom: 1.5rem;">
              <li>Typ urządzenia (iPhone, iPad, Mac, Windows PC, Android Phone/Tablet, Linux PC)</li>
              <li>Przeglądarka internetowa (Chrome, Safari, Firefox, Edge, Opera)</li>
              <li>System operacyjny (Windows, macOS, iOS, Android, Linux)</li>
              <li>Data i czas otwarcia strony</li>
              <li>Liczba otwarć strony</li>
            </ul>
            <h3 style="font-size: 1.3rem; margin-top: 1.5rem; margin-bottom: 1rem;">Dane niezbędne do działania strony:</h3>
            <ul style="margin-left: 2rem;">
              <li>Preferencja języka (pl/en) - przechowywana lokalnie w przeglądarce</li>
            </ul>
          </section>
          
          <section style="margin-bottom: 3rem;">
            <h2 style="font-size: 1.8rem; margin-bottom: 1rem; color: #4CAF50;">3. Cel przetwarzania danych</h2>
            <p style="margin-bottom: 1rem;">Dane są przetwarzane w następujących celach:</p>
            <ul style="margin-left: 2rem;">
              <li><strong>Dane analityczne:</strong> Statystyki użycia strony - aby lepiej zrozumieć, jak użytkownicy korzystają z naszej strony</li>
              <li><strong>Dane niezbędne:</strong> Zapamiętanie preferencji języka - aby zapewnić wygodne korzystanie ze strony</li>
            </ul>
          </section>
          
          <section style="margin-bottom: 3rem;">
            <h2 style="font-size: 1.8rem; margin-bottom: 1rem; color: #4CAF50;">4. Podstawa prawna</h2>
            <p style="margin-bottom: 1rem;">Przetwarzanie danych odbywa się na podstawie:</p>
            <ul style="margin-left: 2rem;">
              <li>Dane analityczne: Zgoda użytkownika (Art. 6 ust. 1 lit. a RODO)</li>
              <li>Dane niezbędne: Prawnie uzasadniony interes (Art. 6 ust. 1 lit. f RODO)</li>
            </ul>
          </section>
          
          <section style="margin-bottom: 3rem;">
            <h2 style="font-size: 1.8rem; margin-bottom: 1rem; color: #4CAF50;">5. Okres przechowywania danych</h2>
            <p style="margin-bottom: 1rem;">Dane są przechowywane przez:</p>
            <ul style="margin-left: 2rem;">
              <li><strong>Dane analityczne:</strong> Do czasu cofnięcia zgody lub maksymalnie 2 lata od ostatniego odwiedzenia</li>
              <li><strong>Preferencje języka:</strong> Do czasu wyczyszczenia danych przeglądarki</li>
            </ul>
          </section>
          
          <section style="margin-bottom: 3rem;">
            <h2 style="font-size: 1.8rem; margin-bottom: 1rem; color: #4CAF50;">6. Twoje prawa</h2>
            <p style="margin-bottom: 1rem;">Masz prawo do:</p>
            <ul style="margin-left: 2rem; margin-bottom: 1.5rem;">
              <li>Dostępu do swoich danych (Art. 15 RODO)</li>
              <li>Sprostowania danych (Art. 16 RODO)</li>
              <li>Usunięcia danych (Art. 17 RODO)</li>
              <li>Ograniczenia przetwarzania (Art. 18 RODO)</li>
              <li>Przenoszenia danych (Art. 20 RODO)</li>
              <li>Sprzeciwu wobec przetwarzania (Art. 21 RODO)</li>
              <li>Cofnięcia zgody w dowolnym momencie (Art. 7 ust. 3 RODO)</li>
            </ul>
            <p style="margin-bottom: 1rem;">Aby skorzystać z swoich praw, skontaktuj się z nami:</p>
            <p><strong>Email:</strong> officestkratos@gmail.com</p>
          </section>
          
          <section style="margin-bottom: 3rem;">
            <h2 style="font-size: 1.8rem; margin-bottom: 1rem; color: #4CAF50;">7. Pliki cookie i lokalne przechowywanie</h2>
            <p style="margin-bottom: 1rem;">Używamy następujących technologii:</p>
            <ul style="margin-left: 2rem;">
              <li><strong>localStorage:</strong> Do przechowywania preferencji języka i danych analitycznych</li>
              <li><strong>sessionStorage:</strong> Nie używamy</li>
              <li><strong>Cookies:</strong> Nie używamy tradycyjnych plików cookie</li>
            </ul>
            <p style="margin-top: 1rem;">Możesz zarządzać zgodą na cookies poprzez ustawienia przeglądarki lub kontaktując się z nami.</p>
          </section>
          
          <section style="margin-bottom: 3rem;">
            <h2 style="font-size: 1.8rem; margin-bottom: 1rem; color: #4CAF50;">8. Prawo do wniesienia skargi</h2>
            <p>Masz prawo wnieść skargę do organu nadzorczego - Prezesa Urzędu Ochrony Danych Osobowych (UODO), jeśli uważasz, że przetwarzanie Twoich danych osobowych narusza przepisy RODO.</p>
          </section>
          
          <section style="margin-bottom: 3rem;">
            <h2 style="font-size: 1.8rem; margin-bottom: 1rem; color: #4CAF50;">9. Zmiany w Polityce Prywatności</h2>
            <p>Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności. Wszelkie zmiany będą publikowane na tej stronie z datą ostatniej aktualizacji.</p>
          </section>
          
          <section style="margin-bottom: 3rem;">
            <h2 style="font-size: 1.8rem; margin-bottom: 1rem; color: #4CAF50;">10. Kontakt</h2>
            <p style="margin-bottom: 1rem;">W przypadku pytań dotyczących Polityki Prywatności lub przetwarzania danych osobowych, skontaktuj się z nami:</p>
            <p><strong>Email:</strong> <a href="mailto:officestkratos@gmail.com" style="color: #4CAF50; text-decoration: none;">officestkratos@gmail.com</a></p>
          </section>
        </div>
      </div>
    </section>
  `
  
  container.innerHTML = html
  
  const privacyPage = container.querySelector('.privacy-page')
  if (!privacyPage) {
    container.innerHTML = html
  }
    
  container.setAttribute('data-privacy-rendered', 'true')
  container.removeAttribute('data-privacy-rendering')
    window.isRenderingPrivacy = false
  window.scrollTo(0, 0)
  
  const checkContent = () => {
    const check = container.querySelector('.privacy-page')
    const hash = window.location.hash
    const isPrivacyRoute = hash === '#privacy-policy' || hash === '#polityka-prywatnosci'
    if (!check && isPrivacyRoute) {
            container.innerHTML = html
            container.setAttribute('data-privacy-rendered', 'true')
          }
        }
  setTimeout(checkContent, 100)
  setTimeout(checkContent, 500)
  setTimeout(checkContent, 1000)
}
