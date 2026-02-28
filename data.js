/* =============================================
   GENÇİŞ — Veri & Sabitler
   ============================================= */

const CITIES = [
  "Adana","Adıyaman","Afyonkarahisar","Ağrı","Amasya","Ankara","Antalya","Artvin",
  "Aydın","Balıkesir","Bilecik","Bingöl","Bitlis","Bolu","Burdur","Bursa",
  "Çanakkale","Çankırı","Çorum","Denizli","Diyarbakır","Edirne","Elazığ",
  "Erzincan","Erzurum","Eskişehir","Gaziantep","Giresun","Gümüşhane","Hakkari",
  "Hatay","Isparta","Mersin","İstanbul","İzmir","Kars","Kastamonu","Kayseri",
  "Kırklareli","Kırşehir","Kocaeli","Konya","Kütahya","Malatya","Manisa",
  "Kahramanmaraş","Mardin","Muğla","Muş","Nevşehir","Niğde","Ordu","Rize",
  "Sakarya","Samsun","Siirt","Sinop","Sivas","Tekirdağ","Tokat","Trabzon",
  "Tunceli","Şanlıurfa","Uşak","Van","Yozgat","Zonguldak","Aksaray","Bayburt",
  "Karaman","Kırıkkale","Batman","Şırnak","Bartın","Ardahan","Iğdır","Yalova",
  "Karabük","Kilis","Osmaniye","Düzce"
];

const JOBS = [
  {
    id: 1,
    title: "Depo Yükleme / Boşaltma Elemanı",
    company: "Migros Lojistik",
    city: "İstanbul",
    wage: "₺750",
    wageType: "gün",
    duration: "2 Gün",
    cat: "Depo",
    tags: ["Fiziksel Dayanıklılık", "Sabah 08:00-17:00", "Teknik Bilgi Gerekmez"],
    icon: "📦",
    desc: "İstanbul Esenyurt deposunda mal yükleme ve boşaltma işleri. Sabah 08:00'de hazır bulunmanız gerekmektedir. Teknik bilgi gerekmez, sadece fiziksel uygunluk aranmaktadır.",
    posted: "2 saat önce",
    quota: 8
  },
  {
    id: 2,
    title: "Etkinlik Görevlisi",
    company: "İstanbul Kongre Merkezi",
    city: "İstanbul",
    wage: "₺600",
    wageType: "gün",
    duration: "1 Gün",
    cat: "Etkinlik",
    tags: ["İletişim Becerileri", "Hafta Sonu", "Sunum"],
    icon: "🎪",
    desc: "Uluslararası kongre etkinliğinde katılımcı yönlendirme ve karşılama görevi. Temsil yeteneği olan, güleryüzlü bireyler tercih edilir.",
    posted: "5 saat önce",
    quota: 15
  },
  {
    id: 3,
    title: "Yazılım Geliştirme Stajyeri",
    company: "TechVision A.Ş.",
    city: "Ankara",
    wage: "₺5.000",
    wageType: "ay",
    duration: "3 Ay (Staj)",
    cat: "Staj",
    tags: ["Python", "Ofis", "Lisans Öğrencisi", "Uzaktan Seçenek"],
    icon: "💻",
    desc: "Yazılım geliştirme ekibimizde ücretli 3 aylık staj programı. Python veya JavaScript bilgisi olan lisans öğrencileri tercih edilir. SGK girişi yapılır.",
    posted: "1 gün önce",
    quota: 2
  },
  {
    id: 4,
    title: "Servis Elemanı (Özel Etkinlik)",
    company: "Elit Organizasyon",
    city: "İzmir",
    wage: "₺500",
    wageType: "gün",
    duration: "1 Gün",
    cat: "Servis",
    tags: ["Servis", "Hafta Sonu", "Kıyafet Sağlanır"],
    icon: "🍽️",
    desc: "İzmir'de gerçekleşecek düğün etkinliğinde masa servisi ve misafir karşılama. Kıyafet organizasyon tarafından sağlanır.",
    posted: "1 gün önce",
    quota: 12
  },
  {
    id: 5,
    title: "Üretim Hattı Elemanı",
    company: "Arçelik Fabrikası",
    city: "Bursa",
    wage: "₺800",
    wageType: "gün",
    duration: "1 Hafta",
    cat: "Fabrika",
    tags: ["Fabrika", "Tam Gün", "Servis İmkânı", "SGK"],
    icon: "🏭",
    desc: "Beyaz eşya üretim hattında geçici iş gücü ihtiyacı. İşletme servisi mevcuttur. SGK girişi yapılır, hafta sonu mesai ücreti ödenir.",
    posted: "3 saat önce",
    quota: 20
  },
  {
    id: 6,
    title: "Ofis Destek Personeli",
    company: "Garanti BBVA",
    city: "Ankara",
    wage: "₺650",
    wageType: "gün",
    duration: "2 Hafta",
    cat: "Ofis",
    tags: ["Bilgisayar", "Excel", "Sabah 09:00-18:00"],
    icon: "💼",
    desc: "Genel müdürlük ofisinde dosyalama, veri girişi ve arşiv düzenleme işleri. Microsoft Office bilgisi tercih sebebidir.",
    posted: "6 saat önce",
    quota: 3
  },
  {
    id: 7,
    title: "Temizlik Görevlisi",
    company: "Cevahir AVM",
    city: "İstanbul",
    wage: "₺550",
    wageType: "gün",
    duration: "3 Gün",
    cat: "Temizlik",
    tags: ["Akşam 18:00-23:00", "Hafta Sonu", "Ekipman Sağlanır"],
    icon: "🧹",
    desc: "Alışveriş merkezi temizlik ekibinde geçici çalışma. Tüm ekipmanlar iş yeri tarafından sağlanır. Deneyim aranmaz.",
    posted: "4 saat önce",
    quota: 6
  },
  {
    id: 8,
    title: "Promosyon Tanıtım Görevlisi",
    company: "Coca-Cola Türkiye",
    city: "İzmir",
    wage: "₺580",
    wageType: "gün",
    duration: "2-3 Gün",
    cat: "Etkinlik",
    tags: ["İletişim", "Güler Yüz", "Dışa Dönük Kişilik"],
    icon: "📢",
    desc: "Market ve AVM'lerde ürün tanıtımı ve ücretsiz örnekleme görevi. Enerjik ve sosyal bireyler tercih edilir.",
    posted: "8 saat önce",
    quota: 10
  },
  {
    id: 9,
    title: "Güvenlik Görevlisi (Geçici)",
    company: "SecureNet Güvenlik",
    city: "Ankara",
    wage: "₺700",
    wageType: "gün",
    duration: "1 Hafta",
    cat: "Güvenlik",
    tags: ["Özel Güvenlik Belgesi", "Gece / Gündüz", "Üniformalı"],
    icon: "🔒",
    desc: "Özel etkinlik ve inşaat alanlarında geçici güvenlik görevi. Özel güvenlik belgesi şarttır.",
    posted: "12 saat önce",
    quota: 5
  },
  {
    id: 10,
    title: "Pazarlama Stajyeri",
    company: "Türk Telekom",
    city: "İstanbul",
    wage: "₺4.500",
    wageType: "ay",
    duration: "3 Ay (Staj)",
    cat: "Staj",
    tags: ["Sosyal Medya", "İçerik", "Üniversite Öğrencisi"],
    icon: "📱",
    desc: "Pazarlama departmanında sosyal medya ve içerik yönetimi alanında ücretli staj. SGK girişi yapılır, uzaktan çalışma seçeneği mevcuttur.",
    posted: "2 gün önce",
    quota: 1
  }
];

const SPECIAL_JOBS = [
  {
    id: 101,
    title: "Uzaktan Veri Girişi Uzmanı",
    company: "DataPlus Teknoloji",
    city: "Uzaktan",
    wage: "₺4.500",
    wageType: "ay",
    duration: "1 Ay",
    cat: "Ofis",
    tags: ["Uzaktan Çalışma", "Esnek Saat", "Ekran Okuyucu Destekli", "Engel Teşviki"],
    icon: "💻",
    desc: "Evden çalışma imkânıyla veri girişi, düzenleme ve doğrulama görevleri. Bilgisayar ve internet bağlantısı yeterlidir. Ekran okuyucu yazılımlarıyla tam uyumlu sistem."
  },
  {
    id: 102,
    title: "Online Müşteri Destek Operatörü",
    company: "TeleYardım A.Ş.",
    city: "Uzaktan",
    wage: "₺5.000",
    wageType: "ay",
    duration: "Uzun Dönem",
    cat: "Ofis",
    tags: ["Sözlü İletişim Gerekmez", "Yazılı / Chat", "Uzaktan", "İşitme Engelli Uyumlu"],
    icon: "💬",
    desc: "Chat ve e-posta üzerinden müşteri destek hizmetleri. Sözlü iletişim kesinlikle gerekmez. Türkçe yazılı iletişim yeterlidir."
  },
  {
    id: 103,
    title: "İçerik Moderatörü",
    company: "SocialTR Medya",
    city: "Uzaktan",
    wage: "₺4.200",
    wageType: "ay",
    duration: "3 Ay",
    cat: "Ofis",
    tags: ["Uzaktan", "Esnek Saat", "Erişilebilir Platform", "Görme Engelli Desteği"],
    icon: "🖥️",
    desc: "Sosyal medya içerik denetimi ve etiketleme. Platform tam erişilebilirlik standartlarına uygun. Yardımcı teknolojiler desteklenmektedir."
  },
  {
    id: 104,
    title: "El Sanatları Üretim Görevlisi",
    company: "Atölye Engelsiz",
    city: "İstanbul",
    wage: "₺350",
    wageType: "gün",
    duration: "Uzun Dönem",
    cat: "Diğer",
    tags: ["Oturarak Çalışma", "Esnek Saat", "Destekli Çalışma Ortamı", "Ulaşım Desteği"],
    icon: "🎨",
    desc: "Engel dostu atölyemizde el yapımı ürün üretimi. Refakatçi desteği ve ulaşım imkânı mevcuttur. Uzman eğitmenler eşliğinde çalışma ortamı."
  },
  {
    id: 105,
    title: "Sesli Kitap Okuyucusu",
    company: "KitapSes Yayınları",
    city: "Uzaktan",
    wage: "₺200",
    wageType: "saat",
    duration: "Esnek",
    cat: "Diğer",
    tags: ["Uzaktan", "Kendi Programın", "Hareketlilik Engeli Uyumlu", "Kayıt Kiti Sağlanır"],
    icon: "🎙️",
    desc: "Evde kayıt yaparak sesli kitap seslendirme. Kayıt ekipmanı iş yeri tarafından gönderilir. Hareketlilik güçlüğü olan bireyler için ideal."
  }
];

const EDUCATION_LEVELS = [
  "İlköğretim", "Lise (Devam Ediyor)", "Lise Mezunu",
  "Ön Lisans (Devam Ediyor)", "Ön Lisans Mezunu",
  "Lisans (Devam Ediyor)", "Lisans Mezunu",
  "Yüksek Lisans", "Doktora"
];

const JOB_CATEGORIES = [
  "Depo & Lojistik", "Servis & Garsonluk", "Etkinlik & Organizasyon",
  "Ofis & Büro", "Staj", "Fabrika & Üretim", "Temizlik",
  "Güvenlik", "Promosyon & Tanıtım", "IT & Teknoloji", "Diğer"
];

const SKILLS_LIST = [
  "Fiziksel Dayanıklılık", "Bilgisayar (Temel)", "Microsoft Office",
  "Müşteri İlişkileri", "Ekip Çalışması", "Sürücü Belgesi (B)",
  "İngilizce", "Forklift Operatörü", "Gıda Hijyeni",
  "Sosyal Medya", "Muhasebe Temelleri", "İkna & Satış"
];
