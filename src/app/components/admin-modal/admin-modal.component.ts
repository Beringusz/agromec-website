import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommunicationsService, CommunicationItem, CommunicationAttachment } from '../../services/communications.service';
import { LanguageService } from '../../services/language.service';
import { ContactMessagesService, ContactMessage } from '../../services/contact-messages.service';
import { FirebaseBackendService } from '../../services/firebase-backend.service';

@Component({
  selector: 'app-admin-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-modal.component.html',
  styleUrl: './admin-modal.component.css'
})
export class AdminModalComponent {
  public authService = inject(AuthService);
  public commService = inject(CommunicationsService);
  public messageService = inject(ContactMessagesService);
  public backend = inject(FirebaseBackendService);
  public langService = inject(LanguageService);
  private fb = inject(FormBuilder);

  public activeAdminTab = signal<'create' | 'list' | 'messages'>('create');
  public loginError = signal<string>('');
  public publishSuccess = signal<string>('');
  public publishError = signal<string>('');

  // Attached file state
  public currentAttachment = signal<CommunicationAttachment | null>(null);
  public isFileLoading = signal<boolean>(false);

  // Login form
  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  // New announcement form - flexible and user-friendly
  public announcementForm: FormGroup = this.fb.group({
    titleRo: ['', [Validators.required, Validators.minLength(3)]],
    titleHu: [''],
    titleEn: [''],
    category: ['anunturi', [Validators.required]],
    docNumber: ['ANUNT-' + new Date().getFullYear() + '/' + Math.floor(Math.random() * 90 + 10), [Validators.required]],
    date: [this.formatCurrentDate(), [Validators.required]],
    summaryRo: [''],
    summaryHu: [''],
    summaryEn: [''],
    contentRo: ['', [Validators.required, Validators.minLength(5)]],
    contentHu: [''],
    contentEn: [''],
    signatoryRo: ['Consiliul de Administrație • AGROMEC SFÂNTU GHEORGHE SA'],
    signatoryHu: ['Igazgatótanács • AGROMEC SFÂNTU GHEORGHE SA'],
    signatoryEn: ['Board of Directors • AGROMEC SFÂNTU GHEORGHE SA'],
    isImportant: [true]
  });

  constructor() {
    this.loginForm.valueChanges.subscribe(() => {
      if (this.loginError()) {
        this.loginError.set('');
      }
    });

    this.announcementForm.valueChanges.subscribe(() => {
      if (this.publishError()) {
        this.publishError.set('');
      }
    });
  }

  private formatCurrentDate(): string {
    const months = [
      'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
      'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'
    ];
    const now = new Date();
    return `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    
    // Check 10MB limit
    const maxBytes = 10 * 1024 * 1024;
    if (file.size > maxBytes) {
      const isHu = this.langService.currentLang() === 'hu';
      this.publishError.set(isHu ? 'A kiválasztott fájl túl nagy! Maximális méret: 10 MB.' : 'Fișierul selectat este prea mare! Mărimea maximă admisă este 10 MB.');
      input.value = '';
      return;
    }

    // Format human readable size
    let sizeStr = '';
    if (file.size < 1024 * 1024) {
      sizeStr = `${Math.round(file.size / 1024)} KB`;
    } else {
      sizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
    }

    this.isFileLoading.set(true);
    const reader = new FileReader();

    reader.onload = () => {
      this.currentAttachment.set({
        fileName: file.name,
        fileSize: sizeStr,
        fileType: file.type || 'application/octet-stream',
        fileData: reader.result as string
      });
      this.isFileLoading.set(false);
    };

    reader.onerror = () => {
      const isHu = this.langService.currentLang() === 'hu';
      this.publishError.set(isHu ? 'Hiba történt a fájl beolvasásakor.' : 'Eroare la citirea fișierului.');
      this.isFileLoading.set(false);
      input.value = '';
    };

    reader.readAsDataURL(file);
  }

  public removeAttachment(): void {
    this.currentAttachment.set(null);
    if (typeof document !== 'undefined') {
      const input = document.getElementById('comm-file-upload') as HTMLInputElement;
      if (input) {
        input.value = '';
      }
    }
  }

  onLoginSubmit(): void {
    this.loginError.set('');
    
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      const lang = this.langService.currentLang();
      if (lang === 'hu') {
        this.loginError.set('Kérjük adja meg az email címet és a jelszót.');
      } else if (lang === 'en') {
        this.loginError.set('Please provide your email and password.');
      } else {
        this.loginError.set('Vă rugăm să introduceți emailul și parola.');
      }
      return;
    }

    const { email, password } = this.loginForm.value;
    const success = this.authService.login(email, password);
    if (!success) {
      const lang = this.langService.currentLang();
      if (lang === 'hu') {
        this.loginError.set('Hibás email cím vagy jelszó.');
      } else if (lang === 'en') {
        this.loginError.set('Invalid email or password.');
      } else {
        this.loginError.set('Email sau parolă incorectă.');
      }
    }
  }

  onPublishSubmit(): void {
    this.publishError.set('');

    const val = this.announcementForm.value;

    if (!val.titleRo || val.titleRo.trim().length === 0) {
      this.announcementForm.get('titleRo')?.markAsTouched();
      const lang = this.langService.currentLang();
      this.publishError.set(lang === 'hu' ? 'Kérjük adja meg a hirdetés címét.' : 'Vă rugăm să introduceți titlul comunicatului.');
      return;
    }

    if (!val.contentRo || val.contentRo.trim().length === 0) {
      this.announcementForm.get('contentRo')?.markAsTouched();
      const lang = this.langService.currentLang();
      this.publishError.set(lang === 'hu' ? 'Kérjük adja meg a hirdetés szöveges tartalmát.' : 'Vă rugăm să introduceți textul comunicatului.');
      return;
    }

    const currentYear = new Date().getFullYear();

    // Map category labels
    const catLabels: Record<string, { ro: string; hu: string; en: string }> = {
      aga: { ro: 'Convocator AGA', hu: 'Közgyűlési Meghívó', en: 'AGA Notice' },
      rapoarte: { ro: 'Rapoarte Financiare', hu: 'Pénzügyi Jelentések', en: 'Financial Reports' },
      anunturi: { ro: 'Anunț General', hu: 'Általános Hirdetmény', en: 'General Notice' }
    };

    // Split multiline content by newlines
    const splitParagraphs = (txt: string) => {
      if (!txt) return [];
      return txt.split('\n').map(p => p.trim()).filter(p => p.length > 0);
    };

    const paragraphsRo = splitParagraphs(val.contentRo);
    const paragraphsHu = val.contentHu ? splitParagraphs(val.contentHu) : paragraphsRo;
    const paragraphsEn = val.contentEn ? splitParagraphs(val.contentEn) : paragraphsRo;

    // Generate summary automatically if not filled
    const cleanContent = val.contentRo.replace(/\n+/g, ' ').trim();
    const autoSummary = cleanContent.length > 130 ? cleanContent.slice(0, 130) + '...' : cleanContent;

    const summaryRo = val.summaryRo && val.summaryRo.trim() ? val.summaryRo.trim() : autoSummary;
    const summaryHu = val.summaryHu && val.summaryHu.trim() ? val.summaryHu.trim() : summaryRo;
    const summaryEn = val.summaryEn && val.summaryEn.trim() ? val.summaryEn.trim() : summaryRo;

    const docNum = val.docNumber && val.docNumber.trim() ? val.docNumber.trim() : 'ANUNT-' + currentYear + '/' + Math.floor(Math.random() * 90 + 10);
    const dateStr = val.date && val.date.trim() ? val.date.trim() : this.formatCurrentDate();
    const signatory = val.signatoryRo && val.signatoryRo.trim() ? val.signatoryRo.trim() : 'Consiliul de Administrație • AGROMEC SFÂNTU GHEORGHE SA';

    const newItem: Omit<CommunicationItem, 'id'> = {
      date: dateStr,
      year: currentYear,
      category: (val.category || 'anunturi') as 'aga' | 'rapoarte' | 'anunturi',
      isImportant: !!val.isImportant,
      docNumber: docNum,
      title: {
        ro: val.titleRo.trim(),
        hu: val.titleHu?.trim() || val.titleRo.trim(),
        en: val.titleEn?.trim() || val.titleRo.trim()
      },
      categoryLabel: catLabels[val.category] || catLabels['anunturi'],
      summary: {
        ro: summaryRo,
        hu: summaryHu,
        en: summaryEn
      },
      content: {
        ro: paragraphsRo,
        hu: paragraphsHu,
        en: paragraphsEn
      },
      signatory: {
        ro: signatory,
        hu: val.signatoryHu?.trim() || signatory,
        en: val.signatoryEn?.trim() || signatory
      },
      attachment: this.currentAttachment()
    };

    this.commService.addCommunication(newItem);
    
    const lang = this.langService.currentLang();
    this.publishSuccess.set(lang === 'hu' ? 'A hirdetés és a csatolt dokumentum sikeresen közzétéve a weboldalon!' : 'Comunicatul și documentul atașat au fost publicate cu succes pe site!');

    // Reset attachment
    this.currentAttachment.set(null);

    // Reset form with fresh doc number
    this.announcementForm.reset({
      category: 'anunturi',
      docNumber: 'ANUNT-' + currentYear + '/' + Math.floor(Math.random() * 90 + 10),
      date: this.formatCurrentDate(),
      signatoryRo: 'Consiliul de Administrație • AGROMEC SFÂNTU GHEORGHE SA',
      signatoryHu: 'Igazgatótanács • AGROMEC SFÂNTU GHEORGHE SA',
      signatoryEn: 'Board of Directors • AGROMEC SFÂNTU GHEORGHE SA',
      isImportant: false,
      titleRo: '',
      summaryRo: '',
      contentRo: ''
    });

    setTimeout(() => {
      this.publishSuccess.set('');
      this.activeAdminTab.set('list');
    }, 1500);
  }

  deleteItem(id: number, title: string): void {
    if (confirm(`Sunteți sigur că doriți să ștergeți comunicatul "${title}"?`)) {
      this.commService.deleteCommunication(id);
    }
  }

  resetAllDefaults(): void {
    if (confirm('Atenție: Această acțiune va reseta toate comunicatele la valorile inițiale din sistem. Continuați?')) {
      this.commService.resetToDefaults();
    }
  }

  deleteMessage(id: number): void {
    if (confirm('Sigur doriți să ștergeți acest mesaj din inbox?')) {
      this.messageService.deleteMessage(id);
    }
  }

  closeModal(): void {
    this.loginError.set('');
    this.publishError.set('');
    this.currentAttachment.set(null);
    this.loginForm.reset({ email: '', password: '' });
    this.authService.closeDashboard();
    this.authService.closeLoginModal();
  }
}
