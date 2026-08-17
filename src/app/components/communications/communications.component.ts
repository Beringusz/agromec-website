import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommunicationsService, CommunicationItem } from '../../services/communications.service';
import { LanguageService } from '../../services/language.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-communications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './communications.component.html',
  styleUrl: './communications.component.css'
})
export class CommunicationsComponent {
  public commService = inject(CommunicationsService);
  public langService = inject(LanguageService);
  public authService = inject(AuthService);

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.commService.setSearch(input.value);
  }

  filterCategory(cat: string) {
    this.commService.setCategory(cat);
  }

  viewItem(item: CommunicationItem) {
    this.commService.openDetailModal(item);
  }

  openAdminStudio() {
    this.authService.openLoginModal();
  }
}
