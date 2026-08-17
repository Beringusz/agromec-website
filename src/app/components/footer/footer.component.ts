import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  public langService = inject(LanguageService);
  public authService = inject(AuthService);
  public currentYear = new Date().getFullYear();

  openAdmin(): void {
    this.authService.openLoginModal();
  }
}
