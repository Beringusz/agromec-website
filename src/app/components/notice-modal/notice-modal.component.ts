import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunicationsService } from '../../services/communications.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-notice-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notice-modal.component.html',
  styleUrl: './notice-modal.component.css'
})
export class NoticeModalComponent {
  public commService = inject(CommunicationsService);
  public langService = inject(LanguageService);
}
