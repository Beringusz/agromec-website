import { Injectable, signal } from '@angular/core';

export interface ContactMessage {
  id: number;
  date: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
}

// Set target recipient email for contact inquiries
// Currently configured for testing with: tntfazakas@gmail.com
// To switch to production, change this to: 'agromec.sfantu.gheorghe@gmail.com'
export const RECIPIENT_EMAIL = 'tntfazakas@gmail.com';

@Injectable({
  providedIn: 'root'
})
export class ContactMessagesService {
  private readonly STORAGE_KEY = 'agromec_contact_inbox';
  public recipientEmail = RECIPIENT_EMAIL;

  public messages = signal<ContactMessage[]>([]);

  constructor() {
    this.loadMessages();
  }

  private loadMessages(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            this.messages.set(parsed);
            return;
          }
        } catch (e) {
          console.error('Error loading messages from localStorage', e);
        }
      }
    }
  }

  private saveMessages(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.messages()));
    }
  }

  public addMessage(msg: Omit<ContactMessage, 'id' | 'date' | 'isRead'>): void {
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('ro-RO')} ${now.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })}`;
    
    const current = this.messages();
    const newId = current.length > 0 ? Math.max(...current.map(m => m.id)) + 1 : 1;

    const newMessage: ContactMessage = {
      ...msg,
      id: newId,
      date: formattedDate,
      isRead: false
    };

    this.messages.update(list => [newMessage, ...list]);
    this.saveMessages();
  }

  /**
   * Sends email directly to the recipient mailbox (tntfazakas@gmail.com)
   */
  public async sendEmailNotification(msg: { name: string; phone: string; email: string; subject: string; message: string }): Promise<boolean> {
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${this.recipientEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `[AGROMEC Website] Solicitare Nouă: ${msg.name} (${msg.phone})`,
          _template: 'table',
          _captcha: 'false',
          'Nume / Companie': msg.name,
          'Număr de Telefon': msg.phone,
          'Adresă de Email': msg.email || 'Nespecificat',
          'Tipul Solicitării': msg.subject,
          'Mesaj Transmis': msg.message,
          'Data Trimiterii': new Date().toLocaleString('ro-RO')
        })
      });

      return response.ok;
    } catch (err) {
      console.warn('External email delivery notice (stored in admin dashboard):', err);
      return false;
    }
  }

  public deleteMessage(id: number): void {
    this.messages.update(list => list.filter(m => m.id !== id));
    this.saveMessages();
  }

  public markAsRead(id: number): void {
    this.messages.update(list => list.map(m => m.id === id ? { ...m, isRead: true } : m));
    this.saveMessages();
  }
}
