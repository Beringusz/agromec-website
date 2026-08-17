import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { CommunicationsComponent } from './components/communications/communications.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { NoticeModalComponent } from './components/notice-modal/notice-modal.component';
import { AdminModalComponent } from './components/admin-modal/admin-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    CommunicationsComponent,
    ContactComponent,
    FooterComponent,
    NoticeModalComponent,
    AdminModalComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'AGROMEC SFANTU GHEORGHE SA';
}
