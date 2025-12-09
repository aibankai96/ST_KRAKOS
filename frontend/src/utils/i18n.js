import {renderHome} from '../pages/home.js'
import {renderHeader, renderFooter} from '../components/layout.js'

const translations = {
  pl: {
    nav: {home: 'Strona Główna', aiStats: 'AI w Liczbach', about: 'O nas', services: 'Usługi', portfolio: 'Portfolio', contact: 'Kontakt'},
    hero: {badge: 'Wśród nielicznych w Polsce wykorzystujących AI', title: 'Twój Biznes Napędzany Sztuczną Inteligencją', subtitle: 'ST KRATOS - Wykorzystujemy najnowsze technologie AI, aby stworzyć dla Ciebie stronę lub aplikację, która przyciąga klientów i zwiększa sprzedaż. Profesjonalne rozwiązania, które działają.', btn1: 'Poznaj nasze rozwiązania', btn2: 'Bezpłatna konsultacja'},
    seo: {title: 'ST KRATOS - Innowacyjne rozwiązania AI', desc: 'ST KRATOS oferuje zaawansowane rozwiązania z wykorzystaniem sztucznej inteligencji. Generowanie stron, automatyzacja procesów i analiza danych.', keywords: 'AI, sztuczna inteligencja, automatyzacja, generowanie stron, ST KRATOS', orgDesc: 'Innowacyjne rozwiązania z wykorzystaniem sztucznej inteligencji'},
    aiStats: {title: 'AI w Liczbach', intro: 'Sprawdzone statystyki pokazują, dlaczego sztuczna inteligencja to przyszłość biznesu', stat1: 'firm planuje zwiększyć inwestycje w AI do 2025 roku', stat2: 'wzrost produktywności dzięki wykorzystaniu AI', stat3: 'wartość AI dla globalnej gospodarki do 2030', stat4: 'firm zauważa poprawę jakości decyzji dzięki AI'},
    about: {title: 'O ST KRATOS', intro: 'Poznaj zespół ekspertów, który przekształca technologie AI w realne korzyści biznesowe', h2_1: 'Tworzymy Przyszłość z AI', p1: 'ST KRATOS to eksperci, którzy przekształcają nowoczesne technologie sztucznej inteligencji w realne korzyści dla Twojego biznesu. Projektujemy i budujemy strony internetowe oraz aplikacje, które łączą elegancki design z inteligentnymi funkcjami, zapewniając Twojej firmie przewagę konkurencyjną.', h2_2: 'Dlaczego My?', feat1: 'Technologie AI', feat1d: 'wykorzystujemy najnowsze narzędzia wspomagane sztuczną inteligencją', feat2: 'Indywidualne podejście', feat2d: 'każdy projekt dostosowujemy do Twoich potrzeb', feat3: 'Szybka realizacja', feat3d: 'od koncepcji do wdrożenia w rekordowym czasie', feat4: 'Najwyższa jakość', feat4d: 'profesjonalne rozwiązania, które przyciągają klientów'},
    services: {title: 'Nasze Usługi', intro: 'Oferujemy kompleksowe rozwiązania webowe dostosowane do Twoich potrzeb. Od szybkich landing page\'ów po zaawansowane aplikacje - każdy projekt realizujemy z dbałością o szczegóły i najwyższą jakość.', cert: 'Po zrealizowaniu projektu otrzymujesz certyfikat potwierdzający, że Twoja firma wykorzystuje sztuczną inteligencję w swojej działalności.', other: 'Jesteśmy również otwarci na inne projekty - oczywiście po analizie. Jeśli masz pomysł na projekt, który nie mieści się w powyższych kategoriach, skontaktuj się z nami, a wspólnie znajdziemy rozwiązanie.', lp: 'Landing Page', lpd: 'Jednostronicowa strona z sekcjami: hero, o nas, oferta, kontakt. Nowoczesny design, responsywność, animacje.', lpf: 'Dla: Start-upy, jednoosobowe działalności, eventy', mod: 'Modyfikacje Stron', modd: 'Ulepszenie istniejącej strony. Poprawa błędów, optymalizacja, nowe sekcje, przyspieszenie działania.', modf: 'Dla: Firmy z istniejącą stroną', elem: 'Elementy Interaktywne', elemd: 'Animacje, galerie, FAQ. Nowoczesne efekty zwiększające zaangażowanie użytkowników.', elemf: 'Dla: Wszystkie firmy'},
    tech: {title: 'Nasze Narzędzia i Technologie', intro: 'Wykorzystujemy najnowsze narzędzia AI i technologie, aby tworzyć rozwiązania, które działają. Każdy projekt realizujemy z najwyższą jakością.', t1: 'Narzędzia AI', t1d: 'Najnowsze narzędzia wspomagane sztuczną inteligencją. Szybsza realizacja projektów przy zachowaniu najwyższej jakości.', t2: 'Środowisko Programistyczne', t2d: 'Zaawansowane narzędzia deweloperskie. Stabilne, bezpieczne i wydajne aplikacje z wykorzystaniem sprawdzonych rozwiązań.', t3: 'Frameworki i Biblioteki', t3d: 'Nowoczesne technologie webowe. Szybkie działanie, bezpieczeństwo i kompatybilność na wszystkich urządzeniach.', cta: 'Technologie to nasza specjalność - skup się na biznesie, resztą zajmiemy się my.'},
    portfolio: {title: 'Nasze Realizacje', intro: 'Oto przykłady naszych projektów realizowanych dla klientów. Każdy projekt to unikalne rozwiązanie dostosowane do potrzeb biznesowych.', p1: 'Nesyra.com', p1d: 'Projekt realizowany dla naszego klienta. Wersja beta strony internetowej, która prezentuje nowoczesne podejście do biznesu. Jesteśmy otwarci na współpracę z wszystkimi, którzy są otwarci na nowe propozycje biznesowe.', p2: 'Misja Czysta Woda', p2d: 'Kolejny projekt realizowany dla naszego klienta - Misja Czysta Woda. Strona internetowa dedykowana promocji inicjatyw związanych z ochroną środowiska i czystością wód. Projekt łączy nowoczesny design z przekazem ekologicznym, tworząc platformę informacyjną dla osób zaangażowanych w ochronę przyrody.', view: 'Zobacz projekt →', clientBadge: 'PROJEKT KLIENTA'},
    contact: {title: 'Skontaktuj się z nami', intro: 'Masz pytania? Chcesz dowiedzieć się więcej o naszych usługach? Skontaktuj się z nami bezpośrednio!', info: 'Informacje kontaktowe', email: 'Email', responseTime: 'Czas odpowiedzi', responseDetail: 'Odpowiadamy do 24h'},
    footer: 'Wszystkie prawa zastrzeżone.',
    consent: {
      title: 'Pliki cookie i podobne technologie',
      message: 'Ta strona używa plików cookie i technologii lokalnego przechowywania, aby zapamiętać Twoje preferencje i zbierać anonimowe statystyki użycia strony. Klikając "Akceptuj", wyrażasz zgodę na używanie tych technologii. Możesz zmienić ustawienia w dowolnym momencie.',
      privacyLink: 'Dowiedz się więcej w Polityce Prywatności',
      accept: 'Akceptuj wszystkie',
      reject: 'Odrzuć'
    },
    privacy: {
      title: 'Polityka Prywatności',
      lastUpdated: 'Ostatnia aktualizacja',
      intro: 'Niniejsza Polityka Prywatności opisuje, jak ST KRATOS zbiera, wykorzystuje i chroni Twoje dane osobowe zgodnie z Rozporządzeniem Ogólnym o Ochronie Danych (RODO).',
      admin: {
        title: '1. Administrator Danych',
        content: 'Administratorem danych osobowych jest ST KRATOS. W przypadku pytań dotyczących przetwarzania danych osobowych, skontaktuj się z nami:',
        email: 'Email:'
      },
      data: {
        title: '2. Jakie dane zbieramy?',
        content: 'Zbieramy następujące dane:',
        analytics: {
          title: 'Dane analityczne (tylko za zgodą):',
          list: [
            'Typ urządzenia (iPhone, iPad, Mac, Windows PC, Android Phone/Tablet, Linux PC)',
            'Przeglądarka internetowa (Chrome, Safari, Firefox, Edge, Opera)',
            'System operacyjny (Windows, macOS, iOS, Android, Linux)',
            'Data i czas otwarcia strony',
            'Liczba otwarć strony'
          ]
        },
        necessary: {
          title: 'Dane niezbędne do działania strony:',
          list: [
            'Preferencja języka (pl/en) - przechowywana lokalnie w przeglądarce'
          ]
        }
      },
      purpose: {
        title: '3. Cel przetwarzania danych',
        content: 'Dane są przetwarzane w następujących celach:',
        analytics: 'Statystyki użycia strony - aby lepiej zrozumieć, jak użytkownicy korzystają z naszej strony',
        necessary: 'Zapamiętanie preferencji języka - aby zapewnić wygodne korzystanie ze strony'
      },
      legal: {
        title: '4. Podstawa prawna',
        content: 'Przetwarzanie danych odbywa się na podstawie:',
        analytics: 'Dane analityczne: Zgoda użytkownika (Art. 6 ust. 1 lit. a RODO)',
        necessary: 'Dane niezbędne: Prawnie uzasadniony interes (Art. 6 ust. 1 lit. f RODO)'
      },
      storage: {
        title: '5. Okres przechowywania danych',
        content: 'Dane są przechowywane przez:',
        analytics: 'Dane analityczne: Do czasu cofnięcia zgody lub maksymalnie 2 lata od ostatniego odwiedzenia',
        necessary: 'Preferencje języka: Do czasu wyczyszczenia danych przeglądarki'
      },
      rights: {
        title: '6. Twoje prawa',
        content: 'Masz prawo do:',
        list: [
          'Dostępu do swoich danych (Art. 15 RODO)',
          'Sprostowania danych (Art. 16 RODO)',
          'Usunięcia danych (Art. 17 RODO)',
          'Ograniczenia przetwarzania (Art. 18 RODO)',
          'Przenoszenia danych (Art. 20 RODO)',
          'Sprzeciwu wobec przetwarzania (Art. 21 RODO)',
          'Cofnięcia zgody w dowolnym momencie (Art. 7 ust. 3 RODO)'
        ],
        contact: 'Aby skorzystać z swoich praw, skontaktuj się z nami:'
      },
      cookies: {
        title: '7. Pliki cookie i lokalne przechowywanie',
        content: 'Używamy następujących technologii:',
        localStorage: 'localStorage - do przechowywania preferencji języka i danych analitycznych',
        sessionStorage: 'sessionStorage - nie używamy',
        cookies: 'Pliki cookie - nie używamy tradycyjnych plików cookie',
        manage: 'Możesz zarządzać zgodą na cookies poprzez ustawienia przeglądarki lub kontaktując się z nami.'
      },
      complaint: {
        title: '8. Prawo do wniesienia skargi',
        content: 'Masz prawo wnieść skargę do organu nadzorczego - Prezesa Urzędu Ochrony Danych Osobowych (UODO), jeśli uważasz, że przetwarzanie Twoich danych osobowych narusza przepisy RODO.'
      },
      changes: {
        title: '9. Zmiany w Polityce Prywatności',
        content: 'Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności. Wszelkie zmiany będą publikowane na tej stronie z datą ostatniej aktualizacji.'
      },
      contact: {
        title: '10. Kontakt',
        content: 'W przypadku pytań dotyczących Polityki Prywatności lub przetwarzania danych osobowych, skontaktuj się z nami:',
        email: 'Email:',
        emailValue: 'officestkratos@gmail.com'
      }
    }
  },
  en: {
    nav: {
      home: 'Home',
      aiStats: 'AI Statistics',
      about: 'About',
      services: 'Services',
      portfolio: 'Portfolio',
      contact: 'Contact'
    },
    hero: {
      title: 'AI-Powered Web Solutions',
      subtitle: 'We create websites and applications that attract customers and increase sales using the latest AI technologies.',
      btn1: 'Our Services',
      btn2: 'Contact Us',
      badge: 'Powered by AI'
    },
    aiStats: {
      title: 'AI Statistics',
      intro: 'See how artificial intelligence is changing business:',
      stat1: 'of companies see value in AI',
      stat2: 'increase in productivity',
      stat3: 'contribution to global GDP by 2030',
      stat4: 'of companies plan to invest in AI'
    },
    about: {
      title: 'About Us',
      intro: 'We are a team specializing in creating modern websites and web applications using artificial intelligence.',
      h2_1: 'Who We Are',
      p1: 'ST KRATOS is a company that combines experience in web development with the latest AI technologies. We help businesses create digital solutions that attract customers and increase sales.',
      h2_2: 'Our Advantages',
      feat1: 'AI Technology',
      feat1d: 'We use the latest AI tools to create unique solutions.',
      feat2: 'Business Focus',
      feat2d: 'We understand business needs and create solutions that bring results.',
      feat3: 'Fast Implementation',
      feat3d: 'Modern tools allow us to implement projects quickly and efficiently.',
      feat4: 'Quality',
      feat4d: 'We care about the highest quality of our solutions.'
    },
    services: {
      title: 'Our Services',
      intro: 'We offer comprehensive services in creating websites and web applications.',
      cert: 'We work with companies of all sizes - from startups to large enterprises.',
      lp: 'Landing Pages',
      lpd: 'Effective landing pages that convert visitors into customers. Quick implementation, modern design, optimized for conversions.',
      lpf: 'All companies',
      mod: 'Website Modernization',
      modd: 'Update your existing website with modern technologies. Improved performance, better SEO, responsive design.',
      modf: 'Companies with existing websites',
      elem: 'Individual Elements',
      elemd: 'Individual website elements - contact forms, calculators, interactive components. Tailored to your needs.',
      elemf: 'All companies',
      other: 'We are also open to other projects - of course after analysis. If you have an idea for a project that does not fit into the above categories, contact us, and we will find a solution together.'
    },
    portfolio: {
      title: 'Our Projects',
      intro: 'Here are examples of projects completed for our clients.',
      p1: 'Nesyra.com',
      p1d: 'Project completed for our client. Beta version of a website that presents a modern approach to business. We are open to cooperation with everyone who is open to new business proposals.',
      p2: 'Mission Clean Water',
      p2d: 'Another project completed for our client - Mission Clean Water. Website dedicated to promoting initiatives related to environmental protection and water cleanliness. The project combines modern design with an ecological message, creating an information platform for people involved in nature protection.',
      view: 'View project →',
      clientBadge: 'CLIENT PROJECT'
    },
    contact: {
      title: 'Contact Us',
      intro: 'Have questions? Want to learn more about our services? Contact us directly!',
      info: 'Contact Information',
      email: 'Email',
      responseTime: 'Response Time',
      responseDetail: 'We respond within 24h'
    },
    seo: {
      title: 'ST KRATOS - AI-Powered Web Solutions',
      desc: 'We use the latest AI technologies to create websites and applications that attract customers and increase sales.',
      keywords: 'AI, artificial intelligence, websites, web applications, IT solutions, ST KRATOS',
      orgDesc: 'ST KRATOS - AI-powered web solutions company'
    },
    footer: 'All rights reserved.',
    consent: {
      title: 'Cookies and Similar Technologies',
      message: 'This website uses cookies and local storage technologies to remember your preferences and collect anonymous usage statistics. By clicking "Accept", you consent to the use of these technologies. You can change your settings at any time.',
      privacyLink: 'Learn more in Privacy Policy',
      accept: 'Accept all',
      reject: 'Reject'
    },
    privacy: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated',
      intro: 'This Privacy Policy describes how ST KRATOS collects, uses, and protects your personal data in accordance with the General Data Protection Regulation (GDPR).',
      admin: {
        title: '1. Data Controller',
        content: 'The data controller is ST KRATOS. For questions regarding personal data processing, please contact us:',
        email: 'Email:'
      },
      data: {
        title: '2. What data do we collect?',
        content: 'We collect the following data:',
        analytics: {
          title: 'Analytics data (with consent only):',
          list: [
            'Device type (iPhone, iPad, Mac, Windows PC, Android Phone/Tablet, Linux PC)',
            'Web browser (Chrome, Safari, Firefox, Edge, Opera)',
            'Operating system (Windows, macOS, iOS, Android, Linux)',
            'Date and time of page visit',
            'Number of page visits'
          ]
        },
        necessary: {
          title: 'Data necessary for website operation:',
          list: [
            'Language preference (pl/en) - stored locally in browser'
          ]
        }
      },
      purpose: {
        title: '3. Purpose of data processing',
        content: 'Data is processed for the following purposes:',
        analytics: 'Website usage statistics - to better understand how users use our website',
        necessary: 'Remembering language preference - to provide convenient website usage'
      },
      legal: {
        title: '4. Legal basis',
        content: 'Data processing is based on:',
        analytics: 'Analytics data: User consent (Art. 6(1)(a) GDPR)',
        necessary: 'Necessary data: Legitimate interest (Art. 6(1)(f) GDPR)'
      },
      storage: {
        title: '5. Data retention period',
        content: 'Data is stored for:',
        analytics: 'Analytics data: Until consent withdrawal or maximum 2 years from last visit',
        necessary: 'Language preferences: Until browser data is cleared'
      },
      rights: {
        title: '6. Your rights',
        content: 'You have the right to:',
        list: [
          'Access your data (Art. 15 GDPR)',
          'Rectify data (Art. 16 GDPR)',
          'Erase data (Art. 17 GDPR)',
          'Restrict processing (Art. 18 GDPR)',
          'Data portability (Art. 20 GDPR)',
          'Object to processing (Art. 21 GDPR)',
          'Withdraw consent at any time (Art. 7(3) GDPR)'
        ],
        contact: 'To exercise your rights, please contact us:'
      },
      cookies: {
        title: '7. Cookies and local storage',
        content: 'We use the following technologies:',
        localStorage: 'localStorage - to store language preferences and analytics data',
        sessionStorage: 'sessionStorage - we do not use',
        cookies: 'Cookies - we do not use traditional cookies',
        manage: 'You can manage cookie consent through browser settings or by contacting us.'
      },
      complaint: {
        title: '8. Right to lodge a complaint',
        content: 'You have the right to lodge a complaint with the supervisory authority - the President of the Personal Data Protection Office (UODO), if you believe that the processing of your personal data violates GDPR provisions.'
      },
      changes: {
        title: '9. Changes to Privacy Policy',
        content: 'We reserve the right to make changes to this Privacy Policy. Any changes will be published on this page with the date of last update.'
      },
      contact: {
        title: '10. Contact',
        content: 'For questions regarding the Privacy Policy or personal data processing, please contact us:',
        email: 'Email:',
        emailValue: 'officestkratos@gmail.com'
      }
    }
  }
}

let currentLang = localStorage.getItem('lang') || 'pl'
export const setLang = (lang) => {
  currentLang = lang; localStorage.setItem('lang', lang); updatePage()
}
export const getLang = () => currentLang
export const t = (path) => path.split('.').reduce((o, k) => o?.[k], translations[currentLang]) || path
const updatePage = () => {
  const content = document.getElementById('content'); if (content) {
    renderHome(content)
  } renderHeader(); renderFooter()
}

