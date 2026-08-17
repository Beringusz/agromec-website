import { Injectable, signal, computed } from '@angular/core';

export type SupportedLang = 'ro' | 'hu' | 'en';

export interface Translations {
  nav: {
    home: string;
    about: string;
    communications: string;
    contact: string;
    callNow: string;
    workingHours: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    ctaContact: string;
    ctaCommunications: string;
    statYears: string;
    statYearsLabel: string;
    statHectares: string;
    statHectaresLabel: string;
    statReliability: string;
    statReliabilityLabel: string;
    statEstablished: string;
    statEstablishedLabel: string;
  };
  about: {
    badge: string;
    title: string;
    subtitle: string;
    estDate: string;
    estDetails: string;
    headquarters: string;
    headquartersDetails: string;
    caenTitle: string;
    caenCode: string;
    caenDescription: string;
    valuesTitle: string;
    val1Title: string;
    val1Desc: string;
    val2Title: string;
    val2Desc: string;
    val3Title: string;
    val3Desc: string;
    val4Title: string;
    val4Desc: string;
    experienceText: string;
  };
  communications: {
    badge: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterAga: string;
    filterReports: string;
    filterAnnouncements: string;
    searchPlaceholder: string;
    readMore: string;
    downloadPdf: string;
    publishedOn: string;
    category: string;
    noResults: string;
    noResultsDesc: string;
    viewNotice: string;
    closeModal: string;
    officialDocument: string;
    officialNoticeArchive: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    companyName: string;
    legalType: string;
    headquarters: string;
    address: string;
    cui: string;
    regCom: string;
    phone: string;
    email: string;
    hours: string;
    hoursWeekdays: string;
    hoursSaturday: string;
    hoursSunday: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectOption1: string;
    subjectOption2: string;
    subjectOption3: string;
    subjectOption4: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitBtn: string;
    submitting: string;
    successMessage: string;
    callDirect: string;
    openInMaps: string;
    whatsappDirect: string;
  };
  admin: {
    portalTitle: string;
    loginTitle: string;
    loginSubtitle: string;
    emailLabel: string;
    passLabel: string;
    loginBtn: string;
    logoutBtn: string;
    tabCreate: string;
    tabManage: string;
    tabMessages: string;
    cloudActive: string;
    cloudSyncing: string;
    fieldCategory: string;
    fieldDocNumber: string;
    fieldDate: string;
    fieldImportant: string;
    fieldTitle: string;
    fieldContent: string;
    fieldSummary: string;
    fieldSignatory: string;
    publishBtn: string;
    tableDoc: string;
    tableDate: string;
    tableCategory: string;
    tableTitle: string;
    tableImportant: string;
    tableActions: string;
    inboxTitle: string;
    inboxSubtitle: string;
    noMessages: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    legalTitle: string;
    rights: string;
    cookies: string;
    privacy: string;
    terms: string;
  };
}

const TRANSLATIONS: Record<SupportedLang, Translations> = {
  ro: {
    nav: {
      home: 'Acasă',
      about: 'Despre Companie',
      communications: 'Comunicări',
      contact: 'Contact',
      callNow: 'Sună Acum',
      workingHours: 'Luni - Vineri: 08:00 - 16:30'
    },
    hero: {
      badge: 'Înființată la 30 Aprilie 1991 • Sfântu Gheorghe',
      title: 'Partenerul dumneavoastră de încredere în',
      titleHighlight: 'Activități Auxiliare pentru Producția Vegetală',
      subtitle: 'AGROMEC SFÂNTU GHEORGHE SA oferă de peste 35 de ani servicii mecanizate complete, asistență tehnologică și soluții dedicate fermierilor și asociațiilor agricole din județul Covasna.',
      ctaContact: 'Contactează-ne',
      ctaCommunications: 'Vezi Comunicările Oficiale',
      statYears: '35+',
      statYearsLabel: 'Ani de Tradiție & Continuitate',
      statHectares: '0161',
      statHectaresLabel: 'Cod CAEN Activitate Principală',
      statReliability: '100%',
      statReliabilityLabel: 'Dedicare & Profesionalism',
      statEstablished: '1991',
      statEstablishedLabel: 'Anul Fondării Companiei'
    },
    about: {
      badge: 'Tradiție & Continuitate din 1991',
      title: 'Despre AGROMEC SFÂNTU GHEORGHE SA',
      subtitle: 'O istorie de peste trei decenii pusă în slujba agriculturii durabile și a valorificării eficiente a terenurilor agricole din județul Covasna.',
      estDate: '30 Aprilie 1991',
      estDetails: 'Societate comercială pe acțiuni cu capital românesc, activând neîntrerupt de peste 35 de ani ca pilon tehnologic în zona Sfântu Gheorghe.',
      headquarters: 'Sediul Social',
      headquartersDetails: 'Municipiul Sfântu Gheorghe, Județul Covasna, Str. Recoltei nr. 3, cod poștal 520036.',
      caenTitle: 'Obiectul Principal de Activitate',
      caenCode: 'Cod CAEN 0161',
      caenDescription: 'Activități auxiliare pentru producția vegetală: pregătirea solului, arături, discuiri, semănat mecanizat, tratamente de protecție a culturilor, recoltare mecanizată și operațiuni tehnologice post-recoltare.',
      valuesTitle: 'Pilonii Noștri de Funcționare',
      val1Title: 'Experiență Vastă',
      val1Desc: 'Personal tehnic calificat și mecanizatori cu decenii de practică pe terenurile din Covasna.',
      val2Title: 'Parc Mecanizat Specializat',
      val2Desc: 'Tractoare, combine și agregate agricole performante, pregătite pentru intervenții prompte.',
      val3Title: 'Promptitudine & Rigoare',
      val3Desc: 'Respectarea strictă a ferestrelor optime agrotehnice pentru fiecare cultură în parte.',
      val4Title: 'Transparență & Guvernanță',
      val4Desc: 'Transparență decizională totală, comunicare deschisă cu acționarii și partenerii contractuali.',
      experienceText: 'De la înființarea la 30 Aprilie 1991, AGROMEC SFÂNTU GHEORGHE SA a susținut dezvoltarea exploatațiilor agricole locale, adaptându-se permanent la cerințele moderne de eficiență și randament în producția vegetală.'
    },
    communications: {
      badge: 'Transparență & Guvernanță Corporativă',
      title: 'Comunicări & Anunțuri Oficiale',
      subtitle: 'Convocatoare ale Adunării Generale a Acționarilor (AGA), situații financiare, rapoarte de gestiune și informări publice.',
      filterAll: 'Toate Comunicările',
      filterAga: 'Convocatoare AGA',
      filterReports: 'Rapoarte & Bilanț',
      filterAnnouncements: 'Anunțuri Generale',
      searchPlaceholder: 'Caută după titlu, an sau cuvinte cheie...',
      readMore: 'Citește Comunicatul Complet',
      downloadPdf: 'Descarcă Document (PDF)',
      publishedOn: 'Publicat la:',
      category: 'Categorie:',
      noResults: 'Nu a fost găsit niciun comunicat',
      noResultsDesc: 'Vă rugăm să încercați alt termen de căutare sau să resetați filtrele.',
      viewNotice: 'Vizualizare Anunț Oficial',
      closeModal: 'Închide',
      officialDocument: 'Document Oficial Emis de Conducerea AGROMEC SFÂNTU GHEORGHE SA',
      officialNoticeArchive: 'Arhivă Comunicări'
    },
    contact: {
      badge: 'Date de Contact & Identificare',
      title: 'Contactați AGROMEC SFÂNTU GHEORGHE SA',
      subtitle: 'Suntem la dispoziția dumneavoastră pentru colaborări agricole mecanizate, relația cu acționarii și orice solicitare oficială.',
      companyName: 'AGROMEC SFANTU GHEORGHE SA',
      legalType: 'Societate pe Acțiuni • Înființată la 30.04.1991',
      headquarters: 'Sediul Social:',
      address: 'Str. Recoltei nr. 3, Sfântu Gheorghe, Jud. Covasna, România',
      cui: 'CUI: RO544894',
      regCom: 'Nr. Reg. Com.: J14/233/1991',
      phone: '0723 139 940',
      email: 'agromec.sfantu.gheorghe@gmail.com',
      hours: 'Program de Lucru',
      hoursWeekdays: 'Luni - Vineri: 08:00 - 16:30',
      hoursSaturday: 'Sâmbătă: 08:00 - 13:00 (în perioada campaniilor)',
      hoursSunday: 'Duminică: Închis',
      formTitle: 'Trimiteți-ne un Mesaj',
      formSubtitle: 'Completați formularul de mai jos și un reprezentant al conducerii vă va răspunde în cel mai scurt timp.',
      nameLabel: 'Nume și Prenume / Denumire Companie',
      namePlaceholder: 'ex: Popescu Ion / Agro SRL',
      phoneLabel: 'Număr de Telefon',
      phonePlaceholder: '07xx xxx xxx',
      emailLabel: 'Adresă de Email',
      emailPlaceholder: 'adresa@domeniu.ro',
      subjectLabel: 'Tipul Solicitării',
      subjectOption1: 'Servicii Auxiliare Producție Vegetală (CAEN 0161)',
      subjectOption2: 'Relația cu Acționarii / Informații AGA',
      subjectOption3: 'Parteneriat Comercial / Colaborare',
      subjectOption4: 'Altă Solicitare',
      messageLabel: 'Mesajul Dumneavoastră',
      messagePlaceholder: 'Introduceți detaliile mesajului dumneavoastră...',
      submitBtn: 'Trimite Mesajul',
      submitting: 'Se trimite...',
      successMessage: 'Vă mulțumim! Mesajul dumneavoastră a fost expediat cu succes către conducerea AGROMEC.',
      callDirect: 'Apelează direct',
      openInMaps: 'Deschide în Google Maps / Waze',
      whatsappDirect: 'Mesaj pe WhatsApp'
    },
    admin: {
      portalTitle: 'Portal Administrare & Publicare',
      loginTitle: 'Autentificare Conducere / Administrator',
      loginSubtitle: 'Introduceți datele de acces pentru a publica sau gestiona comunicările oficiale.',
      emailLabel: 'Email:',
      passLabel: 'Password:',
      loginBtn: 'Conectare la Panoul de Administrare',
      logoutBtn: 'Deconectare',
      tabCreate: 'Adaugă Comunicat Nou',
      tabManage: 'Gestionare Comunicări',
      tabMessages: 'Mesaje Primite',
      cloudActive: 'Cloud DB Activ',
      cloudSyncing: 'Sincronizare Cloud...',
      fieldCategory: 'Categorie Comunicat:',
      fieldDocNumber: 'Număr Document Oficial:',
      fieldDate: 'Data Publicării:',
      fieldImportant: 'Marchează ca Anunț Important / Evidențiat',
      fieldTitle: 'Titlu Anunț / Comunicat:',
      fieldContent: 'Conținut Text Anunț (Textul complet):',
      fieldSummary: 'Rezumat Scurt (Opțional):',
      fieldSignatory: 'Semnatar Oficial:',
      publishBtn: 'Publică Comunicatul Acum',
      tableDoc: 'Nr. Doc',
      tableDate: 'Dată',
      tableCategory: 'Categorie',
      tableTitle: 'Titlu',
      tableImportant: 'Important',
      tableActions: 'Acțiuni',
      inboxTitle: 'Mesaje Primite de pe Formularul de Contact',
      inboxSubtitle: 'Toate solicitările transmise de vizitatori prin formularul de pe site.',
      noMessages: 'Nu există mesaje primite în acest moment.'
    },
    footer: {
      tagline: 'Peste 35 de ani de excelență și continuitate în activități auxiliare pentru producția vegetală (CAEN 0161) în județul Covasna.',
      quickLinks: 'Navigare Rapidă',
      legalTitle: 'Date de Identificare Fiscală',
      rights: 'Toate drepturile rezervate.',
      cookies: 'Politica de Cookie-uri',
      privacy: 'Politica de Confidențialitate',
      terms: 'Termeni și Condiții'
    }
  },
  hu: {
    nav: {
      home: 'Főoldal',
      about: 'A Vállalatról',
      communications: 'Közlemények',
      contact: 'Kapcsolat',
      callNow: 'Hívjon Most',
      workingHours: 'Hétfő - Péntek: 08:00 - 16:30'
    },
    hero: {
      badge: 'Alapítva: 1991. április 30. • Sepsiszentgyörgy',
      title: 'Az Ön megbízható partnere a',
      titleHighlight: 'Növénytermesztést Kiegészítő Tevékenységekben',
      subtitle: 'Az AGROMEC SFÂNTU GHEORGHE SA több mint 35 éve nyújt gépesített mezőgazdasági szolgáltatásokat és technológiai támogatást Kovászna megyei gazdáknak.',
      ctaContact: 'Kapcsolatfelvétel',
      ctaCommunications: 'Hivatalos Közlemények',
      statYears: '35+',
      statYearsLabel: 'Év Hagyomány és Szakértelem',
      statHectares: '0161',
      statHectaresLabel: 'Fő Tevékenységi CAEN Kód',
      statReliability: '100%',
      statReliabilityLabel: 'Elkötelezettség & Minőség',
      statEstablished: '1991',
      statEstablishedLabel: 'Vállalat Alapítási Éve'
    },
    about: {
      badge: 'Hagyomány és Folytonosság 1991 óta',
      title: 'Az AGROMEC SFÂNTU GHEORGHE SA Vállalatról',
      subtitle: 'Több mint három évtizedes múlt a fenntartható mezőgazdaság és a Kovászna megyei termőföldek hatékony művelése szolgálatában.',
      estDate: '1991. április 30.',
      estDetails: 'Román tőkéjű részvénytársaság, amely több mint 35 éve folyamatosan működik műszaki és technológiai bázisként Sepsiszentgyörgyön.',
      headquarters: 'Székhely',
      headquartersDetails: 'Sepsiszentgyörgy (Sfântu Gheorghe), Kovászna megye, Aratás (Recoltei) utca 3. szám, irányítószám 520036.',
      caenTitle: 'Fő Tevékenységi Kör',
      caenCode: 'CAEN 0161 Kód',
      caenDescription: 'Növénytermesztést kiegészítő tevékenységek: talajelőkészítés, szántás, tárcsázás, gépi vetés, növényvédelmi kezelések, gépi betakarítás és betakarítás utáni munkálatok.',
      valuesTitle: 'Alapértékeink',
      val1Title: 'Kiterjedt Szakértelem',
      val1Desc: 'Szakképzett műszaki csapat és évtizedes tapasztalattal rendelkező gépkezelők.',
      val2Title: 'Korszerű Géppark',
      val2Desc: 'Traktorok, kombájnok és speciális mezőgazdasági munkaeszközök a gyors munkavégzésért.',
      val3Title: 'Pontosság & Megbízhatóság',
      val3Desc: 'Az agrotechnikai határidők szigorú betartása minden egyes növénykultúra esetében.',
      val4Title: 'Átláthatóság & Vezetés',
      val4Desc: 'Teljes nyitottság a részvényesek és a szerződéses partnerek felé.',
      experienceText: '1991. április 30-i megalakulása óta az AGROMEC SFÂNTU GHEORGHE SA folyamatosan támogatta a helyi gazdaságokat, alkalmazkodva a modern növénytermesztés követelményeihez.'
    },
    communications: {
      badge: 'Átláthatóság & Vállalatirányítás',
      title: 'Hivatalos Közlemények & Hirdetmények',
      subtitle: 'Közgyűlési meghívók (AGA), pénzügyi kimutatások, vezetőségi jelentések és nyilvános tájékoztatók.',
      filterAll: 'Összes Közlemény',
      filterAga: 'Közgyűlési Meghívók',
      filterReports: 'Jelentések & Mérleg',
      filterAnnouncements: 'Általános Hirdetmények',
      searchPlaceholder: 'Keresés cím, év vagy kulcsszó alapján...',
      readMore: 'Teljes Közlemény Elolvasása',
      downloadPdf: 'Dokumentum Letöltése (PDF)',
      publishedOn: 'Közzétéve:',
      category: 'Kategória:',
      noResults: 'Nem található közlemény',
      noResultsDesc: 'Kérjük próbálkozzon más keresési feltétellel vagy állítsa vissza a szűrőket.',
      viewNotice: 'Hivatalos Hirdetmény Megtekintése',
      closeModal: 'Bezárás',
      officialDocument: 'Az AGROMEC SFÂNTU GHEORGHE SA vezetősége által kiadott hivatalos dokumentum',
      officialNoticeArchive: 'Közlemények Archívuma'
    },
    contact: {
      badge: 'Elérhetőség & Cégadatok',
      title: 'Lépjen kapcsolatba az AGROMEC SA-val',
      subtitle: 'Készséggel állunk rendelkezésére mezőgazdasági együttműködések, megkeresések és részvényesi ügyek kapcsán.',
      companyName: 'AGROMEC SFANTU GHEORGHE SA',
      legalType: 'Részvénytársaság • Alapítva: 1991.04.30.',
      headquarters: 'Székhely:',
      address: 'Str. Recoltei (Aratás u.) 3. sz., Sepsiszentgyörgy, Kovászna megye, Románia',
      cui: 'Adószám (CUI): RO544894',
      regCom: 'Cégjegyzékszám: J14/233/1991',
      phone: '0723 139 940',
      email: 'agromec.sfantu.gheorghe@gmail.com',
      hours: 'Munkaprogram',
      hoursWeekdays: 'Hétfő - Péntek: 08:00 - 16:30',
      hoursSaturday: 'Szombat: 08:00 - 13:00 (kampányidőszakban)',
      hoursSunday: 'Vasárnap: Zárva',
      formTitle: 'Küldjön Üzenetet',
      formSubtitle: 'Töltse ki az alábbi űrlapot és az AGROMEC vezetősége hamarosan felveszi Önnel a kapcsolatot.',
      nameLabel: 'Név / Cégnév',
      namePlaceholder: 'pl: Kovács János / Gazda Kft.',
      phoneLabel: 'Telefonszám',
      phonePlaceholder: '07xx xxx xxx',
      emailLabel: 'E-mail Cím',
      emailPlaceholder: 'nev@domain.hu',
      subjectLabel: 'Megkeresés Tárgya',
      subjectOption1: 'Növénytermesztést Kiegészítő Tevékenységek (CAEN 0161)',
      subjectOption2: 'Részvényesi Kapcsolatok / Közgyűlés (AGA)',
      subjectOption3: 'Kereskedelmi Együttműködés',
      subjectOption4: 'Egyéb Témájú Megkeresés',
      messageLabel: 'Az Ön Üzenete',
      messagePlaceholder: 'Írja le a megkeresés részleteit...',
      submitBtn: 'Üzenet Elküldése',
      submitting: 'Küldés folyamatban...',
      successMessage: 'Köszönjük! Üzenetét sikeresen elküldtük az AGROMEC vezetőségének.',
      callDirect: 'Közvetlen hívás',
      openInMaps: 'Megnyitás Térképen / Waze',
      whatsappDirect: 'WhatsApp Üzenet'
    },
    admin: {
      portalTitle: 'Adminisztrációs és Publikációs Portál',
      loginTitle: 'Vezetőségi / Adminisztrátori Belépés',
      loginSubtitle: 'Adja meg a belépési adatokat a hivatalos közlemények közzétételéhez és kezeléséhez.',
      emailLabel: 'Email:',
      passLabel: 'Password:',
      loginBtn: 'Bejelentkezés az Admin Felületre',
      logoutBtn: 'Kijelentkezés',
      tabCreate: 'Új Hirdetmény Közzététele',
      tabManage: 'Hirdetmények Kezelése',
      tabMessages: 'Beérkezett Üzenetek',
      cloudActive: 'Felhő Adatbázis Aktív',
      cloudSyncing: 'Felhő Szinkronizálás...',
      fieldCategory: 'Hirdetmény Kategóriája:',
      fieldDocNumber: 'Hivatalos Iktatószám:',
      fieldDate: 'Közzététel Dátuma:',
      fieldImportant: '⭐ Kiemelt / Fontos Hirdetményként megjelölés',
      fieldTitle: 'Hirdetmény Címe:',
      fieldContent: 'Hirdetmény Teljes Szövege:',
      fieldSummary: 'Rövid Összefoglaló (Opcionális):',
      fieldSignatory: 'Hivatalos Aláíró:',
      publishBtn: 'Hirdetmény Közzététele Most',
      tableDoc: 'Iktatószám',
      tableDate: 'Dátum',
      tableCategory: 'Kategória',
      tableTitle: 'Cím',
      tableImportant: 'Kiemelt',
      tableActions: 'Műveletek',
      inboxTitle: 'Kapcsolatfelvételi Űrlapról Érkezett Üzenetek',
      inboxSubtitle: 'A weboldal látogatói által beküldött összes megkeresés.',
      noMessages: 'Jelenleg nincs beérkezett üzenet a postafiókban.'
    },
    footer: {
      tagline: 'Több mint 35 év szakértelem és elhivatottság a növénytermesztést segítő mezőgazdasági szolgáltatásokban (CAEN 0161) Kovászna megyében.',
      quickLinks: 'Gyorsmenü',
      legalTitle: 'Cégazonosító Adatok',
      rights: 'Minden jog fenntartva.',
      cookies: 'Süti (Cookie) Szabályzat',
      privacy: 'Adatvédelmi Nyilatkozat',
      terms: 'Felhasználási Feltételek'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Company',
      communications: 'Corporate Notices',
      contact: 'Contact',
      callNow: 'Call Now',
      workingHours: 'Mon - Fri: 08:00 - 16:30'
    },
    hero: {
      badge: 'Established April 30, 1991 • Sfântu Gheorghe',
      title: 'Your Trusted Partner in',
      titleHighlight: 'Auxiliary Activities for Crop Production',
      subtitle: 'AGROMEC SFÂNTU GHEORGHE SA has provided over 35 years of high-performance mechanized agricultural services, technological support, and farm solutions in Covasna County.',
      ctaContact: 'Contact Us',
      ctaCommunications: 'View Official Notices',
      statYears: '35+',
      statYearsLabel: 'Years of Experience & Trust',
      statHectares: '0161',
      statHectaresLabel: 'Primary Activity CAEN Code',
      statReliability: '100%',
      statReliabilityLabel: 'Commitment & Professionalism',
      statEstablished: '1991',
      statEstablishedLabel: 'Company Foundation Year'
    },
    about: {
      badge: 'Heritage & Stability Since 1991',
      title: 'About AGROMEC SFÂNTU GHEORGHE SA',
      subtitle: 'A history of over three decades dedicated to sustainable agriculture and high productivity for farmland in Covasna County.',
      estDate: 'April 30, 1991',
      estDetails: 'Joint-stock company operating continuously for over 35 years as a premier agricultural machinery hub in Sfântu Gheorghe.',
      headquarters: 'Registered Headquarters',
      headquartersDetails: 'Sfântu Gheorghe, Covasna County, Str. Recoltei no. 3, postal code 520036, Romania.',
      caenTitle: 'Core Business Activity',
      caenCode: 'CAEN Code 0161',
      caenDescription: 'Auxiliary activities for crop production: soil preparation, deep plowing, harrowing, mechanized precision seeding, crop protection treatments, mechanized harvesting, and post-harvest operations.',
      valuesTitle: 'Our Core Pillars',
      val1Title: 'Extensive Expertise',
      val1Desc: 'Skilled technical operators and agronomists with decades of experience on local terrain.',
      val2Title: 'Modern Machinery Fleet',
      val2Desc: 'Heavy-duty tractors, harvesters, and specialized implements ready for fast deployment.',
      val3Title: 'Punctuality & Precision',
      val3Desc: 'Strict compliance with optimal agrotechnical windows for each specific crop.',
      val4Title: 'Corporate Governance',
      val4Desc: 'Complete transparency, shareholder relations, and dependable contractual partnerships.',
      experienceText: 'Since its foundation on April 30, 1991, AGROMEC SFÂNTU GHEORGHE SA has supported local agricultural growth, constantly upgrading equipment to meet modern efficiency standards.'
    },
    communications: {
      badge: 'Transparency & Governance',
      title: 'Official Communications & Notices',
      subtitle: 'General Shareholders Meeting (AGA) notices, financial statements, management reports, and official corporate announcements.',
      filterAll: 'All Notices',
      filterAga: 'Shareholder AGA Notices',
      filterReports: 'Reports & Balance Sheets',
      filterAnnouncements: 'General Notices',
      searchPlaceholder: 'Search by title, year, or keyword...',
      readMore: 'Read Full Announcement',
      downloadPdf: 'Download PDF Document',
      publishedOn: 'Published on:',
      category: 'Category:',
      noResults: 'No notices found',
      noResultsDesc: 'Please try another search keyword or reset the category filter.',
      viewNotice: 'View Official Notice',
      closeModal: 'Close',
      officialDocument: 'Official Document Issued by AGROMEC SFÂNTU GHEORGHE SA Management',
      officialNoticeArchive: 'Notices Archive'
    },
    contact: {
      badge: 'Contact & Company Identification',
      title: 'Contact AGROMEC SFÂNTU GHEORGHE SA',
      subtitle: 'We are at your service for agricultural partnerships, business inquiries, and shareholder relations.',
      companyName: 'AGROMEC SFANTU GHEORGHE SA',
      legalType: 'Joint-Stock Company (S.A.) • Est. 30.04.1991',
      headquarters: 'Headquarters:',
      address: 'Str. Recoltei no. 3, Sfântu Gheorghe, Covasna County, Romania',
      cui: 'Fiscal Code (CUI): RO544894',
      regCom: 'Trade Registry: J14/233/1991',
      phone: '0723 139 940',
      email: 'agromec.sfantu.gheorghe@gmail.com',
      hours: 'Working Hours',
      hoursWeekdays: 'Monday - Friday: 08:00 - 16:30',
      hoursSaturday: 'Saturday: 08:00 - 13:00 (during peak season)',
      hoursSunday: 'Sunday: Closed',
      formTitle: 'Send Us a Message',
      formSubtitle: 'Fill out the form below and our management team will get back to you promptly.',
      nameLabel: 'Full Name / Company Name',
      namePlaceholder: 'e.g. John Doe / Agro Enterprise',
      phoneLabel: 'Phone Number',
      phonePlaceholder: '07xx xxx xxx',
      emailLabel: 'Email Address',
      emailPlaceholder: 'name@domain.com',
      subjectLabel: 'Inquiry Subject',
      subjectOption1: 'Auxiliary Activities for Crop Production (CAEN 0161)',
      subjectOption2: 'Shareholder Relations / AGA Info',
      subjectOption3: 'Commercial Partnership / Collaboration',
      subjectOption4: 'Other Inquiry',
      messageLabel: 'Your Message',
      messagePlaceholder: 'Please describe the details of your inquiry...',
      submitBtn: 'Send Message',
      submitting: 'Sending...',
      successMessage: 'Thank you! Your message has been successfully sent to AGROMEC management.',
      callDirect: 'Call Directly',
      openInMaps: 'Open in Google Maps / Waze',
      whatsappDirect: 'WhatsApp Message'
    },
    admin: {
      portalTitle: 'Administration & Publishing Portal',
      loginTitle: 'Management / Administrator Login',
      loginSubtitle: 'Enter your credentials to publish or manage official corporate notices.',
      emailLabel: 'Email:',
      passLabel: 'Password:',
      loginBtn: 'Login to Admin Dashboard',
      logoutBtn: 'Logout',
      tabCreate: 'Add New Notice',
      tabManage: 'Manage Notices',
      tabMessages: 'Received Messages',
      cloudActive: 'Cloud DB Active',
      cloudSyncing: 'Cloud Syncing...',
      fieldCategory: 'Notice Category:',
      fieldDocNumber: 'Official Document No.:',
      fieldDate: 'Publication Date:',
      fieldImportant: '⭐ Mark as Important / Priority Notice',
      fieldTitle: 'Notice Title:',
      fieldContent: 'Full Text Content:',
      fieldSummary: 'Short Summary (Optional):',
      fieldSignatory: 'Official Signatory:',
      publishBtn: 'Publish Notice Now',
      tableDoc: 'Doc No.',
      tableDate: 'Date',
      tableCategory: 'Category',
      tableTitle: 'Title',
      tableImportant: 'Important',
      tableActions: 'Actions',
      inboxTitle: 'Messages Received via Contact Form',
      inboxSubtitle: 'All inquiries submitted by visitors through the website form.',
      noMessages: 'No messages received at this moment.'
    },
    footer: {
      tagline: 'Over 35 years of excellence and continuity in auxiliary activities for crop production (CAEN 0161) in Covasna County.',
      quickLinks: 'Quick Links',
      legalTitle: 'Fiscal Identification',
      rights: 'All rights reserved.',
      cookies: 'Cookie Policy',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions'
    }
  }
};

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  public currentLang = signal<SupportedLang>('ro');
  public t = computed(() => TRANSLATIONS[this.currentLang()]);

  public setLanguage(lang: SupportedLang): void {
    this.currentLang.set(lang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }
}
