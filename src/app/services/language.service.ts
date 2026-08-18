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
    experienceText: string;
    divizareBadge: string;
    divizareTitle: string;
    divizareSubtitle: string;
    div1Title: string;
    div1Desc: string;
    div2Title: string;
    div2Desc: string;
    div3Title: string;
    div3Desc: string;
    div4Title: string;
    div4Desc: string;
    divizareCta: string;
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
    downloadAttachment: string;
    hasAttachment: string;
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
    fieldAttachment: string;
    dragDropFile: string;
    fileSelected: string;
    removeFile: string;
    publishBtn: string;
    tableDoc: string;
    tableDate: string;
    tableCategory: string;
    tableTitle: string;
    tableAttachment: string;
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
      title: 'AGROMEC SFÂNTU GHEORGHE SA',
      subtitle: 'Companie înființată la 30 Aprilie 1991, cu sediul în Municipiul Sfântu Gheorghe, Județul Covasna, Str. Recoltei nr. 3. Activitatea principală este reprezentată de activități auxiliare pentru producția vegetală (CAEN 0161).',
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
      experienceText: 'De la înființarea la 30 Aprilie 1991, AGROMEC SFÂNTU GHEORGHE SA a susținut dezvoltarea exploatațiilor agricole locale, adaptându-se permanent la cerințele moderne de eficiență și randament în producția vegetală.',
      divizareBadge: 'Conformitate & Legea nr. 31/1990',
      divizareTitle: 'Proiect de Divizare',
      divizareSubtitle: 'Informare oficială privind derularea procedurii de divizare a societății AGROMEC SFÂNTU GHEORGHE SA conform legislației în vigoare.',
      div1Title: 'Temei Legal & Notificări Oficiale',
      div1Desc: 'Proiectul de divizare este întocmit de organele statutare ale societății în conformitate strictă cu Legea nr. 31/1990 privind societățile comerciale, republicată.',
      div2Title: 'Consultarea Documentației la Sediu',
      div2Desc: 'Proiectul de divizare, situațiile financiare de divizare și rapoartele de expertiză sunt puse la dispoziția acționarilor la sediul social din Sfântu Gheorghe, Str. Recoltei nr. 3.',
      div3Title: 'Drepturile Acționarilor și Creditorilor',
      div3Desc: 'Acționarii și creditorii societății își pot exercita drepturile de informare și opoziție în termenele prevăzute de dispozițiile legale în vigoare.',
      div4Title: 'Publicare & Convocatoare AGA',
      div4Desc: 'Toate convocatoarele AGA, hotărârile acționarilor și comunicatele oficiale referitoare la divizare sunt publicate în secțiunea Comunicări Oficiale.',
      divizareCta: 'Vezi Comunicările privind Divizarea'
    },
    communications: {
      badge: 'Transparență & Guvernanță Corporativă',
      title: 'Comunicări & Anunțuri Oficiale',
      subtitle: 'Convocatoare ale Adunării Generale a Acționarilor (AGA), proiecte de divizare, situații financiare, rapoarte de gestiune și informări publice.',
      filterAll: 'Toate Comunicările',
      filterAga: 'Convocatoare AGA',
      filterReports: 'Rapoarte & Bilanț',
      filterAnnouncements: 'Anunțuri Generale',
      searchPlaceholder: 'Caută după titlu, an sau cuvinte cheie...',
      readMore: 'Citește Comunicatul Complet',
      downloadPdf: 'Descarcă Document (PDF)',
      downloadAttachment: 'Descarcă Documentul Oficial Atașat',
      hasAttachment: 'Document atașat',
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
      regCom: 'Nr. Reg. Com.: J14/160/1991',
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
      subjectOption1: 'Proiect de Divizare & Relația cu Acționarii',
      subjectOption2: 'Activități Auxiliare Producție Vegetală (CAEN 0161)',
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
      fieldAttachment: 'Atașează Document Oficial (PDF, DOCX, Scanare):',
      dragDropFile: 'Apasă aici sau trage fișierul pentru încărcare (max. 10MB)',
      fileSelected: 'Fișier atașat cu succes:',
      removeFile: 'Șterge fișierul',
      publishBtn: 'Publică Comunicatul Acum',
      tableDoc: 'Nr. Doc',
      tableDate: 'Dată',
      tableCategory: 'Categorie',
      tableTitle: 'Titlu',
      tableAttachment: 'Document',
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
      title: 'AGROMEC SFÂNTU GHEORGHE SA',
      subtitle: '1991. április 30-án alapított sepsiszentgyörgyi vállalat (Kovászna megye, Str. Recoltei 3.). Fő tevékenységi köre a növénytermesztést kiegészítő tevékenységek (CAEN 0161).',
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
      experienceText: '1991. április 30-i megalakulása óta az AGROMEC SFÂNTU GHEORGHE SA folyamatosan támogatta a helyi gazdaságokat, alkalmazkodva a modern növénytermesztés követelményeihez.',
      divizareBadge: 'Jogszabályi Megfelelőség • 31/1990-es törvény',
      divizareTitle: 'Szétválási Terv (Proiect de Divizare)',
      divizareSubtitle: 'Hivatalos tájékoztató az AGROMEC SFÂNTU GHEORGHE SA szétválási eljárásáról a hatályos jogszabályoknak megfelelően.',
      div1Title: 'Jogi Alap & Hivatalos Értesítések',
      div1Desc: 'A szétválási terv a gazdasági társaságokról szóló újraközölt 31/1990-es törvény előírásaival teljes összhangban készült.',
      div2Title: 'Dokumentáció Megtekintése a Székhelyen',
      div2Desc: 'A szétválási terv, a kapcsolódó pénzügyi kimutatások és szakértői beszámolók a részvényesek rendelkezésére állnak a sepsiszentgyörgyi székhelyen (Str. Recoltei 3.).',
      div3Title: 'Részvényesi & Hitelezői Jogok',
      div3Desc: 'A társaság részvényesei és hitelezői a törvényben meghatározott határidőn belül élhetnek tájékozódási és felszólamlási jogaikkal.',
      div4Title: 'Közzététel & Közgyűlési Határozatok',
      div4Desc: 'A szétválással kapcsolatos összes közgyűlési meghívó (AGA), határozat és hivatalos közlemény a Hivatalos Közlemények menüpontban érhető el.',
      divizareCta: 'Szétválási Közlemények Megtekintése'
    },
    communications: {
      badge: 'Átláthatóság & Vállalatirányítás',
      title: 'Hivatalos Közlemények & Hirdetmények',
      subtitle: 'Közgyűlési meghívók (AGA), szétválási tervek, pénzügyi kimutatások, vezetőségi jelentések és nyilvános tájékoztatók.',
      filterAll: 'Összes Közlemény',
      filterAga: 'Közgyűlési Meghívók',
      filterReports: 'Jelentések & Mérleg',
      filterAnnouncements: 'Általános Hirdetmények',
      searchPlaceholder: 'Keresés cím, év vagy kulcsszó alapján...',
      readMore: 'Teljes Közlemény Elolvasása',
      downloadPdf: 'Dokumentum Letöltése (PDF)',
      downloadAttachment: 'Csatolt Hivatalos Dokumentum Letöltése',
      hasAttachment: 'Csatolt Dokumentum',
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
      cui: 'CUI: RO544894',
      regCom: 'Nr. Reg. Com.: J14/160/1991',
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
      subjectOption1: 'Szétválási Terv & Részvényesi Kapcsolatok',
      subjectOption2: 'Növénytermesztést Kiegészítő Tevékenységek (CAEN 0161)',
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
      fieldAttachment: 'Hivatalos Dokumentum Csatolása (PDF, DOCX, Kép):',
      dragDropFile: 'Kattintson ide vagy húzza a fájlt a feltöltéshez (max. 10MB)',
      fileSelected: 'Fájl sikeresen csatolva:',
      removeFile: 'Fájl eltávolítása',
      publishBtn: 'Hirdetmény Közzététele Most',
      tableDoc: 'Iktatószám',
      tableDate: 'Dátum',
      tableCategory: 'Kategória',
      tableTitle: 'Cím',
      tableAttachment: 'Csatolmány',
      tableImportant: 'Kiemelt',
      tableActions: 'Műveletek',
      inboxTitle: 'Kapcsolatfelvételi Űrlapról Érkezett Üzenetek',
      inboxSubtitle: 'A weboldal látogatói által beküldött összes megkeresés.',
      noMessages: 'Jelenleg nincs beérkezett üzenet a postafiókban.'
    },
    footer: {
      tagline: 'Peste 35 de ani de excelență și continuitate în activități auxiliare pentru producția vegetală (CAEN 0161) în județul Covasna.',
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
      title: 'AGROMEC SFÂNTU GHEORGHE SA',
      subtitle: 'Company established on April 30, 1991, headquartered in Sfântu Gheorghe, Covasna County, Str. Recoltei no. 3. Primary activity: auxiliary activities for crop production (CAEN 0161).',
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
      experienceText: 'Since its foundation on April 30, 1991, AGROMEC SFÂNTU GHEORGHE SA has supported local agricultural growth, constantly upgrading equipment to meet modern efficiency standards.',
      divizareBadge: 'Legal Disclosures & Corporate Governance',
      divizareTitle: 'Project of Demerger / Division',
      divizareSubtitle: 'Official corporate disclosure regarding the demerger proceedings of AGROMEC SFÂNTU GHEORGHE SA pursuant to applicable company law.',
      div1Title: 'Legal Foundation & Official Notices',
      div1Desc: 'The demerger project is prepared by the statutory management in strict compliance with Romanian Company Law no. 31/1990, republished.',
      div2Title: 'Inspection of Documents at Headquarters',
      div2Desc: 'The demerger project, financial statements, and expert reports are available for shareholder review at the registered office in Sfântu Gheorghe, Str. Recoltei no. 3.',
      div3Title: 'Shareholder & Creditor Rights',
      div3Desc: 'Shareholders and creditors may exercise their statutory rights of information and opposition within the legally established deadlines.',
      div4Title: 'AGA Resolutions & Corporate Notices',
      div4Desc: 'All General Meetings notices, resolutions, and official updates regarding the division are published in the Official Notices section.',
      divizareCta: 'View Demerger Notices'
    },
    communications: {
      badge: 'Transparency & Governance',
      title: 'Official Communications & Notices',
      subtitle: 'General Shareholders Meeting (AGA) notices, demerger projects, financial statements, management reports, and official corporate announcements.',
      filterAll: 'All Notices',
      filterAga: 'Shareholder AGA Notices',
      filterReports: 'Reports & Balance Sheets',
      filterAnnouncements: 'General Notices',
      searchPlaceholder: 'Search by title, year, or keyword...',
      readMore: 'Read Full Announcement',
      downloadPdf: 'Download PDF Document',
      downloadAttachment: 'Download Official Attached Document',
      hasAttachment: 'Attached Document',
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
      cui: 'CUI: RO544894',
      regCom: 'Nr. Reg. Com.: J14/160/1991',
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
      subjectOption1: 'Demerger Project & Shareholder Relations',
      subjectOption2: 'Auxiliary Activities for Crop Production (CAEN 0161)',
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
      fieldAttachment: 'Attach Official Document (PDF, DOCX, Images):',
      dragDropFile: 'Click here or drag file to upload (max. 10MB)',
      fileSelected: 'File attached successfully:',
      removeFile: 'Remove attachment',
      publishBtn: 'Publish Notice Now',
      tableDoc: 'Doc No.',
      tableDate: 'Date',
      tableCategory: 'Category',
      tableTitle: 'Title',
      tableAttachment: 'Document',
      tableImportant: 'Important',
      tableActions: 'Actions',
      inboxTitle: 'Messages Received via Contact Form',
      inboxSubtitle: 'All inquiries submitted by visitors through the website form.',
      noMessages: 'No messages received at this moment.'
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
