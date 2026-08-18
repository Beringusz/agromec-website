import { Injectable, inject, signal, computed } from '@angular/core';
import { SupportedLang } from './language.service';
import { FirebaseBackendService } from './firebase-backend.service';

export interface CommunicationItem {
  id: number;
  date: string;
  year: number;
  category: 'aga' | 'rapoarte' | 'anunturi';
  isImportant?: boolean;
  docNumber: string;
  title: Record<SupportedLang, string>;
  categoryLabel: Record<SupportedLang, string>;
  summary: Record<SupportedLang, string>;
  content: Record<SupportedLang, string[]>;
  signatory: Record<SupportedLang, string>;
}

const DEFAULT_ITEMS: CommunicationItem[] = [
  {
    id: 1,
    date: '28 Iulie 2026',
    year: 2026,
    category: 'aga',
    isImportant: true,
    docNumber: 'CONV-AGA-2026/02',
    title: {
      ro: 'Convocator - Adunarea Generală Ordinară a Acționarilor AGROMEC SFÂNTU GHEORGHE SA',
      hu: 'Közgyűlési Meghívó - Rendkívüli és Rendes Közgyűlés AGROMEC SFÂNTU GHEORGHE SA',
      en: 'Notice of Meeting - Ordinary General Meeting of Shareholders AGROMEC SFÂNTU GHEORGHE SA'
    },
    categoryLabel: {
      ro: 'Convocator AGA',
      hu: 'Közgyűlési Meghívó',
      en: 'AGA Notice'
    },
    summary: {
      ro: 'Consiliul de Administrație convoacă Adunarea Generală a Acționarilor la sediul din Sfântu Gheorghe, Str. Recoltei nr. 3, jud. Covasna, pentru data de 15 Septembrie 2026.',
      hu: 'Az Igazgatótanács összehívja a Részvényesek Közgyűlését a sepsiszentgyörgyi székhelyen (Str. Recoltei 3.) 2026. szeptember 15-i időpontra.',
      en: 'The Board of Directors convenes the General Meeting of Shareholders at the registered office in Sfântu Gheorghe, Str. Recoltei no. 3, for September 15, 2026.'
    },
    content: {
      ro: [
        'Consiliul de Administrație al societății AGROMEC SFÂNTU GHEORGHE SA, cu sediul în municipiul Sfântu Gheorghe, Str. Recoltei nr. 3, județul Covasna, CUI RO544894, J14/160/1991, convoacă Adunarea Generală Ordinară a Acționarilor (AGOA) pentru data de 15.09.2026, ora 10:00, la sediul societății.',
        'Ordinea de zi propusă:',
        '1. Aprobarea situațiilor financiare anuale și a raportului de gestiune pe semestrul I 2026.',
        '2. Prezentarea planului de investiții în retehnologizarea utilajelor pentru activități auxiliare producției vegetale (CAEN 0161).',
        '3. Descărcarea de gestiune a membrilor Consiliului de Administrație.',
        '4. Diverse și stabilirea datei de înregistrare conform legislației în vigoare.',
        'Documentele și materialele informative referitoare la ordinea de zi pot fi consultate de acționari la sediul societății începând cu data de 20 August 2026, în zilele lucrătoare, între orele 09:00 - 15:00.'
      ],
      hu: [
        'Az AGROMEC SFÂNTU GHEORGHE SA Igazgatótanácsa (székhely: Sepsiszentgyörgy, Str. Recoltei 3., Kovászna megye, CUI: RO544894, Cégjegyzékszám: J14/160/1991) ezennel összehívja a Rendes Részvényesi Közgyűlést (AGOA) 2026. szeptember 15-én 10:00 órára a társaság székhelyére.',
        'Javasolt napirendi pontok:',
        '1. A 2026. I. félévi pénzügyi jelentések és vezetőségi beszámoló elfogadása.',
        '2. Mezőgazdasági géppark korszerűsítésére és növénytermesztési szolgáltatásokra (CAEN 0161) vonatkozó beruházási terv bemutatása.',
        '3. Az Igazgatótanács tagjainak felmentvénye a féléves tevékenységre.',
        '4. Egyéb kérdések és regisztrációs határnap meghatározása a hatályos jogszabályok szerint.',
        'A napirendhez kapcsolódó dokumentáció a részvényesek számára 2026. augusztus 20-tól megtekinthető a társaság székhelyén munkanapokon 09:00 és 15:00 óra között.'
      ],
      en: [
        'The Board of Directors of AGROMEC SFÂNTU GHEORGHE SA, registered in Sfântu Gheorghe, Str. Recoltei no. 3, Covasna County, Fiscal Code RO544894, Reg. J14/160/1991, hereby convenes the Ordinary General Meeting of Shareholders (AGOA) on September 15, 2026, at 10:00 AM at the company headquarters.',
        'Proposed Agenda:',
        '1. Approval of H1 2026 financial statements and management activity report.',
        '2. Presentation of the investment program for modernizing agricultural machinery dedicated to crop production auxiliary services (CAEN 0161).',
        '3. Discharge of liability for the Board members.',
        '4. Miscellaneous and setting the registration date in accordance with applicable laws.',
        'Shareholders may inspect all informational materials at the company headquarters starting August 20, 2026, on working days between 09:00 and 15:00.'
      ]
    },
    signatory: {
      ro: 'Consiliul de Administrație • AGROMEC SFÂNTU GHEORGHE SA',
      hu: 'Igazgatótanács • AGROMEC SFÂNTU GHEORGHE SA',
      en: 'Board of Directors • AGROMEC SFÂNTU GHEORGHE SA'
    }
  },
  {
    id: 2,
    date: '10 Mai 2026',
    year: 2026,
    category: 'anunturi',
    isImportant: true,
    docNumber: 'INF-CAMPANIE-2026/01',
    title: {
      ro: 'Informare privind disponibilitatea serviciilor mecanizate pentru campania agricolă de vară-toamnă 2026',
      hu: 'Tájékoztató a gépesített mezőgazdasági bérmunkák elérhetőségéről a 2026-os nyári-őszi szezonban',
      en: 'Notice regarding mechanized agricultural services availability for Summer-Autumn 2026 campaign'
    },
    categoryLabel: {
      ro: 'Anunț General',
      hu: 'Általános Hirdetmény',
      en: 'General Notice'
    },
    summary: {
      ro: 'AGROMEC SFÂNTU GHEORGHE SA anunță deschiderea programărilor pentru recoltare mecanizată de cereale, transport tehnologic și arături de vară în județul Covasna.',
      hu: 'Az AGROMEC SFÂNTU GHEORGHE SA megnyitotta az előjegyzéseket gabonafélék gépi aratására, szállításra és nyári szántási munkálatokra Kovászna megyében.',
      en: 'AGROMEC SFÂNTU GHEORGHE SA announces service scheduling for mechanized harvesting, grain haulage, and summer plowing across Covasna County.'
    },
    content: {
      ro: [
        'Societatea AGROMEC SFÂNTU GHEORGHE SA informează producătorii agricoli, fermierii individuali și societățile agricole din județul Covasna că parcul de combine și tractoare este complet pregătit pentru deservirea campaniilor agricole din sezonul 2026.',
        'Servicii disponibile la cerere:',
        '• Recoltare mecanizată cereale păioase și culturi speciale cu combine de mare randament.',
        '• Transport tehnologic al cerealelor direct de la recoltă către baze de recepție sau silozuri.',
        '• Lucrări de dezmiriștit, scarificare și pregătirea solului pentru culturile succesive.',
        'Pentru programări și încheierea contractelor de prestări servicii, vă rugăm să ne contactați la tel: 0723 139 940 sau la sediul din Str. Recoltei nr. 3, Sfântu Gheorghe.'
      ],
      hu: [
        'Az AGROMEC SFÂNTU GHEORGHE SA értesíti Kovászna megye mezőgazdasági termelőit és gazdálkodóit, hogy a kombájn- és traktorpark készen áll a 2026-os mezőgazdasági szezon kiszolgálására.',
        'Rendelkezésre álló szolgáltatások:',
        '• Kalászosok és speciális kultúrák gépi betakarítása nagyteljesítményű kombájnokkal.',
        '• Terménybeszállítás közvetlenül a szántóföldről a raktárakba/tárolókba.',
        '• Tarlóhántás, talajlazítás és magágy-előkészítés a másodvetésekhez.',
        'Időpont-egyeztetésért és szolgáltatási szerződések megkötéséért hívja a 0723 139 940 telefonszámot vagy keresse fel székhelyünket (Str. Recoltei 3., Sepsiszentgyörgy).'
      ],
      en: [
        'AGROMEC SFÂNTU GHEORGHE SA informs farmers and agricultural producers in Covasna County that our combine harvester and tractor fleet is prepared for the 2026 agricultural season.',
        'Available auxiliary services:',
        '• Mechanized grain and crop harvesting with modern high-capacity harvesters.',
        '• Technological crop transportation from field to grain silos or storage points.',
        '• Stubble cultivation, subsoiling, and seedbed preparation for subsequent crops.',
        'For scheduling and service contracts, please contact us at +40 723 139 940 or visit our office at Str. Recoltei no. 3, Sfântu Gheorghe.'
      ]
    },
    signatory: {
      ro: 'Direcția Tehnică & Operațională • AGROMEC SA',
      hu: 'Műszaki és Üzemeltetési Igazgatóság • AGROMEC SA',
      en: 'Technical & Operations Division • AGROMEC SA'
    }
  },
  {
    id: 3,
    date: '25 Aprilie 2026',
    year: 2026,
    category: 'rapoarte',
    isImportant: false,
    docNumber: 'RAP-FIN-2025/ANUAL',
    title: {
      ro: 'Publicare Raport Anual de Gestiune și Situații Financiare - Exercițiul 2025',
      hu: '2025. Évi Vezetőségi Éves Beszámoló és Pénzügyi Kimutatások Közzététele',
      en: 'Publication of Annual Management Report & Financial Statements - Financial Year 2025'
    },
    categoryLabel: {
      ro: 'Rapoarte Financiare',
      hu: 'Pénzügyi Jelentések',
      en: 'Financial Reports'
    },
    summary: {
      ro: 'Situațiile financiare anuale și raportul de activitate pentru anul încheiat la 31 Decembrie 2025 au fost aprobate și sunt puse la dispoziția acționarilor.',
      hu: 'A 2025. december 31-én lezárt pénzügyi év mérlege és beszámolója jóváhagyásra került és megtekinthető a részvényesek számára.',
      en: 'The annual financial statements and activity report for the year ended December 31, 2025 have been approved and made available to shareholders.'
    },
    content: {
      ro: [
        'În conformitate cu prevederile Legii nr. 31/1990 privind societățile comerciale și reglementările contabile în vigoare, AGROMEC SFÂNTU GHEORGHE SA publică sinteza indicatorilor economico-financiari aferenți exercițiului 2025.',
        'Sinteza rezultatelor:',
        '• Creșterea volumului de lucrări agricole mecanizate prestate în județul Covasna (CAEN 0161).',
        '• Menținerea stabilității financiare și a gradului ridicat de solvabilitate a companiei.',
        '• Efectuarea lucrărilor de mentenanță și retehnologizare a echipamentelor agricole.',
        'Raportul complet, bilanțul contabil și raportul auditorului intern sunt disponibile pentru consultare la secretariatul societății din Sfântu Gheorghe, Str. Recoltei nr. 3.'
      ],
      hu: [
        'A gazdasági társaságokról szóló 31/1990-es törvény előírásaival és a hatályos számviteli szabályokkal összhangban az AGROMEC SFÂNTU GHEORGHE SA közzéteszi a 2025-ös gazdasági év összefoglaló mérlegét.',
        'Eredmények összegzése:',
        '• A Kovászna megyében elvégzett gépi mezőgazdasági bérmunkák volumenének növekedése (CAEN 0161).',
        '• Pénzügyi stabilitás és magas likviditási mutatók fenntartása.',
        '• Mezőgazdasági berendezések tervszerű karbantartása és felújítása.',
        'A teljes jelentés, a mérlegkimutatás és a felügyelőbizottsági jelentés megtekinthető a sepsiszentgyörgyi titkárságon (Str. Recoltei 3.).'
      ],
      en: [
        'Pursuant to Company Law no. 31/1990 and prevailing accounting standards, AGROMEC SFÂNTU GHEORGHE SA publishes the summary of economic and financial indicators for the financial year 2025.',
        'Summary of achievements:',
        '• Growth in the volume of mechanized crop auxiliary services performed across Covasna County (CAEN 0161).',
        '• Maintained robust solvency and financial strength.',
        '• Ongoing scheduled maintenance and technological overhaul of agricultural assets.',
        'The complete report, balance sheet, and internal audit statement are available for review at the company secretariat in Sfântu Gheorghe, Str. Recoltei no. 3.'
      ]
    },
    signatory: {
      ro: 'Departamentul Financiar-Contabil • AGROMEC SA',
      hu: 'Pénzügyi-Számviteli Osztály • AGROMEC SA',
      en: 'Financial & Accounting Dept. • AGROMEC SA'
    }
  },
  {
    id: 4,
    date: '15 Martie 2026',
    year: 2026,
    category: 'anunturi',
    isImportant: false,
    docNumber: 'MED-CONF-2026/03',
    title: {
      ro: 'Anunț privind conformarea cu standardele de protecție a mediului și bune practici agricole',
      hu: 'Tájékoztató a környezetvédelmi előírások és a helyes mezőgazdasági gyakorlat betartásáról',
      en: 'Statement on environmental compliance and sustainable agricultural best practices'
    },
    categoryLabel: {
      ro: 'Anunț General',
      hu: 'Általános Hirdetmény',
      en: 'General Notice'
    },
    summary: {
      ro: 'AGROMEC SFÂNTU GHEORGHE SA își reafirmă angajamentul pentru utilizarea responsabilă a utilajelor agricole cu emisii reduse și aplicarea precisă a tratamentelor fitosanitare.',
      hu: 'Az AGROMEC SA elkötelezett a csökkentett károsanyag-kibocsátású mezőgazdasági gépek és a precíz növényvédelmi kezelések alkalmazása mellett.',
      en: 'AGROMEC SA reaffirms its commitment to low-emission machinery operations and precision agrochemical application.'
    },
    content: {
      ro: [
        'În cadrul desfășurării activităților auxiliare pentru producția vegetală (CAEN 0161), AGROMEC SFÂNTU GHEORGHE SA aplică cu strictețe normele de eco-condiționalitate și protecția pânzei freatice.',
        'Toate agregatele de stropit și fertilizat sunt calibrate periodic și verificate metrologic pentru a garanta dozele optime stabilite de agronom.',
        'Compania colaborează strâns cu autoritățile de mediu și asociațiile locale de fermieri pentru prezervarea biodiversității solurilor din județul Covasna.'
      ],
      hu: [
        'A növénytermesztést kiegészítő munkálatok (CAEN 0161) során az AGROMEC SFÂNTU GHEORGHE SA szigorúan betartja a környezetvédelmi és talajvédelmi előírásokat.',
        'Minden permetező és műtrágyaszóró berendezés időszakos kalibráláson esik át a pontos adagolás biztosítása érdekében.',
        'A társaság szorosan együttműködik a hatóságokkal a termőtalajok minőségének és biológiai sokféleségének megőrzése érdekében Kovászna megyében.'
      ],
      en: [
        'In executing auxiliary operations for crop production (CAEN 0161), AGROMEC SFÂNTU GHEORGHE SA strictly adheres to environmental and soil protection standards.',
        'All sprayer and fertilizer systems are periodically calibrated and certified to guarantee exact dosage distribution as prescribed by agronomists.',
        'We actively cooperate with environmental authorities and local farm associations to maintain soil fertility and biodiversity in Covasna County.'
      ]
    },
    signatory: {
      ro: 'Responsabil Mediu & Calitate • AGROMEC SA',
      hu: 'Környezetvédelmi és Minőségbiztosítási Megbízott • AGROMEC SA',
      en: 'Environmental & Quality Officer • AGROMEC SA'
    }
  }
];

@Injectable({
  providedIn: 'root'
})
export class CommunicationsService {
  private readonly STORAGE_KEY = 'agromec_communications_data';
  private backend = inject(FirebaseBackendService);

  private readonly items = signal<CommunicationItem[]>([]);

  public selectedCategory = signal<string>('all');
  public searchQuery = signal<string>('');
  public activeModalItem = signal<CommunicationItem | null>(null);

  constructor() {
    this.loadFromStorage();
    this.initCloudSync();
  }

  private loadFromStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            this.items.set(parsed);
            return;
          }
        } catch (e) {
          console.error('Error loading communications from localStorage', e);
        }
      }
    }
    this.items.set(DEFAULT_ITEMS);
    this.saveToStorage();
  }

  private saveToStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items()));
    }
  }

  /**
   * Synchronizes with Firebase Cloud Database on initialization
   */
  private async initCloudSync(): Promise<void> {
    try {
      const cloudItems = await this.backend.getCommunications();
      if (cloudItems && cloudItems.length > 0) {
        this.items.set(cloudItems);
        this.saveToStorage();
      } else if (this.items().length > 0) {
        // Initialize cloud database with initial default items
        await this.backend.saveCommunications(this.items());
      }
    } catch (e) {
      console.warn('Initial cloud sync notice:', e);
    }
  }

  public getRawItems(): CommunicationItem[] {
    return this.items();
  }

  public filteredItems = computed(() => {
    const category = this.selectedCategory();
    const query = this.searchQuery().toLowerCase().trim();
    const all = this.items();

    return all.filter(item => {
      const matchCat = category === 'all' || item.category === category;
      if (!matchCat) return false;

      if (!query) return true;

      const titleRo = item.title?.ro?.toLowerCase() || '';
      const titleHu = item.title?.hu?.toLowerCase() || '';
      const titleEn = item.title?.en?.toLowerCase() || '';
      const summaryRo = item.summary?.ro?.toLowerCase() || '';
      const summaryHu = item.summary?.hu?.toLowerCase() || '';
      const doc = item.docNumber?.toLowerCase() || '';

      return (
        titleRo.includes(query) ||
        titleHu.includes(query) ||
        titleEn.includes(query) ||
        summaryRo.includes(query) ||
        summaryHu.includes(query) ||
        doc.includes(query) ||
        item.year?.toString().includes(query)
      );
    });
  });

  public addCommunication(item: Omit<CommunicationItem, 'id'>): CommunicationItem {
    const current = this.items();
    const newId = current.length > 0 ? Math.max(...current.map(i => i.id)) + 1 : 1;
    const newItem: CommunicationItem = {
      ...item,
      id: newId
    };

    // Prepend to show newest first
    const updatedList = [newItem, ...current];
    this.items.set(updatedList);
    this.saveToStorage();

    // Persist asynchronously to Cloud Database
    this.backend.saveCommunications(updatedList).catch(err => {
      console.warn('Cloud sync error on add:', err);
    });

    return newItem;
  }

  public deleteCommunication(id: number): void {
    const updatedList = this.items().filter(i => i.id !== id);
    this.items.set(updatedList);
    this.saveToStorage();

    // Persist asynchronously to Cloud Database
    this.backend.saveCommunications(updatedList).catch(err => {
      console.warn('Cloud sync error on delete:', err);
    });

    if (this.activeModalItem()?.id === id) {
      this.closeModal();
    }
  }

  public resetToDefaults(): void {
    this.items.set(DEFAULT_ITEMS);
    this.saveToStorage();

    // Sync reset to cloud
    this.backend.saveCommunications(DEFAULT_ITEMS).catch(err => {
      console.warn('Cloud sync error on reset:', err);
    });
  }

  public setCategory(cat: string): void {
    this.selectedCategory.set(cat);
  }

  public setSearch(query: string): void {
    this.searchQuery.set(query);
  }

  public openDetailModal(item: CommunicationItem): void {
    this.activeModalItem.set(item);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  public closeModal(): void {
    this.activeModalItem.set(null);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }
}
