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

@Injectable({
  providedIn: 'root'
})
export class ContactMessagesService {
  private readonly STORAGE_KEY = 'agromec_contact_inbox';

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

  public deleteMessage(id: number): void {
    this.messages.update(list => list.filter(m => m.id !== id));
    this.saveMessages();
  }

  public markAsRead(id: number): void {
    this.messages.update(list => list.map(m => m.id === id ? { ...m, isRead: true } : m));
    this.saveMessages();
  }
}
