import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { CommunicationItem } from './communications.service';
import { ContactMessage } from './contact-messages.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseBackendService {
  private readonly dbUrl = environment.firebase.databaseURL;
  public isSyncing = signal<boolean>(false);
  public lastSyncTime = signal<Date | null>(null);

  /**
   * Fetches communications from Firebase Realtime Database
   */
  public async getCommunications(): Promise<CommunicationItem[] | null> {
    try {
      this.isSyncing.set(true);
      const res = await fetch(`${this.dbUrl}/communications.json`);
      if (!res.ok) return null;
      
      const data = await res.json();
      this.lastSyncTime.set(new Date());
      
      if (!data) return null;
      
      // If data is stored as array or map of objects
      if (Array.isArray(data)) {
        return data.filter(item => item !== null);
      } else if (typeof data === 'object') {
        return Object.values(data) as CommunicationItem[];
      }
      return null;
    } catch (err) {
      console.warn('Firebase Cloud Database connection note (using local cache fallback):', err);
      return null;
    } finally {
      this.isSyncing.set(false);
    }
  }

  /**
   * Saves all communications to Firebase Realtime Database
   */
  public async saveCommunications(items: CommunicationItem[]): Promise<boolean> {
    try {
      this.isSyncing.set(true);
      const res = await fetch(`${this.dbUrl}/communications.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items)
      });
      this.lastSyncTime.set(new Date());
      return res.ok;
    } catch (err) {
      console.warn('Firebase Cloud Database save note (persisted locally):', err);
      return false;
    } finally {
      this.isSyncing.set(false);
    }
  }

  /**
   * Fetches inbox contact messages from Firebase
   */
  public async getMessages(): Promise<ContactMessage[] | null> {
    try {
      this.isSyncing.set(true);
      const res = await fetch(`${this.dbUrl}/messages.json`);
      if (!res.ok) return null;

      const data = await res.json();
      if (!data) return null;

      if (Array.isArray(data)) {
        return data.filter(msg => msg !== null);
      } else if (typeof data === 'object') {
        return Object.values(data) as ContactMessage[];
      }
      return null;
    } catch (err) {
      console.warn('Firebase Messages load note:', err);
      return null;
    } finally {
      this.isSyncing.set(false);
    }
  }

  /**
   * Saves all contact messages to Firebase
   */
  public async saveMessages(messages: ContactMessage[]): Promise<boolean> {
    try {
      this.isSyncing.set(true);
      const res = await fetch(`${this.dbUrl}/messages.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messages)
      });
      return res.ok;
    } catch (err) {
      console.warn('Firebase Messages save note:', err);
      return false;
    } finally {
      this.isSyncing.set(false);
    }
  }
}
