import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommunicationsService, CommunicationItem } from '../../services/communications.service';
import { LanguageService } from '../../services/language.service';

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
  public langService = inject(LanguageService);
  private fb = inject(FormBuilder);

  public activeAdminTab = signal<'create' | 'list'>('create');
  public loginError = signal<string>('');
  public publishSuccess = signal<string>('');

  // Login form
  public loginForm: FormGroup = this.fb.group({
    email: ['admin@agromecsfgheorghe.ro', [Validators.required]],
    password: ['agromec2026', [Validators.required]]
  });

  // New announcement form
  public announcementForm: FormGroup = this.fb.group({
    titleRo: ['', [Validators.required, Validators.minLength(5)]],
    titleHu: [''],
    titleEn: [''],
    category: ['anunturi', [Validators.required]],
    docNumber: ['ANUNT-' + new Date().getFullYear() + '/' + Math.floor(Math.random() * 90 + 10), [Validators.required]],
    date: [this.formatCurrentDate(), [Validators.required]],
    summaryRo: ['', [Validators.required, Validators.minLength(10)]],
    summaryHu: [''],
    summaryEn: [''],
    contentRo: ['', [Validators.required, Validators.minLength(20)]],
    contentHu: [''],
    contentEn: [''],
    signatoryRo: ['Consiliul de Administrație • AGROMEC SFÂNTU GHEORGHE SA', [Validators.required]],
    signatoryHu: ['Igazgatótanács • AGROMEC SFÂNTU GHEORGHE SA'],
    signatoryEn: ['Board of Directors • AGROMEC SFÂNTU GHEORGHE SA'],
    isImportant: [true]
  });

  private formatCurrentDate(): string {
    const months = [
      'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
      'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'
    ];
    const now = new Date();
    return `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  }

  onLoginSubmit(): void {
    this.loginError.set('');
    const { email, password } = this.loginForm.value;
    const success = this.authService.login(email, password);
    if (!success) {
      this.loginError.set('Credențiale invalide. Utilizator: admin@agromecsfgheorghe.ro / Parolă: agromec2026');
    }
  }

  onPublishSubmit(): void {
    if (this.announcementForm.invalid) {
      this.announcementForm.markAllAsTouched();
      return;
    }

    const val = this.announcementForm.value;
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

    const newItem = {
      date: val.date,
      year: currentYear,
      category: val.category as 'aga' | 'rapoarte' | 'anunturi',
      isImportant: !!val.isImportant,
      docNumber: val.docNumber,
      title: {
        ro: val.titleRo,
        hu: val.titleHu || val.titleRo,
        en: val.titleEn || val.titleRo
      },
      categoryLabel: catLabels[val.category] || catLabels['anunturi'],
      summary: {
        ro: val.summaryRo,
        hu: val.summaryHu || val.summaryRo,
        en: val.summaryEn || val.summaryRo
      },
      content: {
        ro: paragraphsRo,
        hu: paragraphsHu,
        en: paragraphsEn
      },
      signatory: {
        ro: val.signatoryRo,
        hu: val.signatoryHu || val.signatoryRo,
        en: val.signatoryEn || val.signatoryRo
      }
    };

    this.commService.addCommunication(newItem);
    this.publishSuccess.set('Comunicatul a fost publicat cu succes pe site!');

    // Reset form with new doc number
    this.announcementForm.reset({
      category: 'anunturi',
      docNumber: 'ANUNT-' + currentYear + '/' + Math.floor(Math.random() * 90 + 10),
      date: this.formatCurrentDate(),
      signatoryRo: 'Consiliul de Administrație • AGROMEC SFÂNTU GHEORGHE SA',
      signatoryHu: 'Igazgatótanács • AGROMEC SFÂNTU GHEORGHE SA',
      signatoryEn: 'Board of Directors • AGROMEC SFÂNTU GHEORGHE SA',
      isImportant: false
    });

    setTimeout(() => {
      this.publishSuccess.set('');
      this.activeAdminTab.set('list');
    }, 1800);
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

  closeModal(): void {
    this.authService.closeDashboard();
    this.authService.closeLoginModal();
  }
}
