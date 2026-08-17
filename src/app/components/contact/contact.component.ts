import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { ContactMessagesService } from '../../services/contact-messages.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  public langService = inject(LanguageService);
  private messageService = inject(ContactMessagesService);
  private fb = inject(FormBuilder);

  public contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\s\-()]{8,18}$/)]],
    email: ['', [Validators.email]],
    subject: ['Servicii Agricole Mecanizate (CAEN 0161)', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  public isSubmitting = signal<boolean>(false);
  public isSubmitted = signal<boolean>(false);

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    const val = this.contactForm.value;

    const messageData = {
      name: val.name,
      phone: val.phone,
      email: val.email || 'Nespecificat',
      subject: val.subject,
      message: val.message
    };

    // 1. Store message into Admin Inbox
    this.messageService.addMessage(messageData);

    // 2. Dispatch real email notification to tntfazakas@gmail.com
    await this.messageService.sendEmailNotification(messageData);

    this.isSubmitting.set(false);
    this.isSubmitted.set(true);
    
    this.contactForm.reset({
      subject: 'Servicii Agricole Mecanizate (CAEN 0161)'
    });

    // Clear success notification after 8 seconds
    setTimeout(() => {
      this.isSubmitted.set(false);
    }, 8000);
  }
}
