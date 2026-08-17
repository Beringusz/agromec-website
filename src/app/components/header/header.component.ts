import { Component, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService, SupportedLang } from '../../services/language.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public langService = inject(LanguageService);
  public authService = inject(AuthService);
  public isScrolled = signal<boolean>(false);
  public mobileMenuOpen = signal<boolean>(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (typeof window !== 'undefined') {
      this.isScrolled.set(window.scrollY > 30);
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }

  changeLang(lang: SupportedLang) {
    this.langService.setLanguage(lang);
  }

  openAdmin(): void {
    this.authService.openLoginModal();
    this.closeMobileMenu();
  }
}
