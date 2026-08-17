import { Injectable, signal } from '@angular/core';

export interface AdminUser {
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'agromec_admin_session';

  public isLoggedIn = signal<boolean>(false);
  public currentUser = signal<AdminUser | null>(null);

  public isLoginModalOpen = signal<boolean>(false);
  public isAdminDashboardOpen = signal<boolean>(false);

  constructor() {
    this.checkSession();
  }

  private checkSession(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        try {
          const user = JSON.parse(stored);
          this.currentUser.set(user);
          this.isLoggedIn.set(true);
        } catch (e) {
          localStorage.removeItem(this.STORAGE_KEY);
        }
      }
    }
  }

  public login(email: string, pass: string): boolean {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    // Recognized admin logins
    const validEmails = [
      'agromec.sfantu.gheorghe@gmail.com',
      'admin@agromecsfgheorghe.ro',
      'admin'
    ];

    if (validEmails.includes(cleanEmail) && cleanPass === 'agromec2026') {
      const user: AdminUser = {
        name: 'Administrator AGROMEC',
        email: 'agromec.sfantu.gheorghe@gmail.com',
        role: 'Administrator Conducere'
      };

      this.currentUser.set(user);
      this.isLoggedIn.set(true);

      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      }

      this.isLoginModalOpen.set(false);
      this.isAdminDashboardOpen.set(true);
      return true;
    }

    return false;
  }

  public logout(): void {
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
    this.isAdminDashboardOpen.set(false);

    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  public openLoginModal(): void {
    if (this.isLoggedIn()) {
      this.isAdminDashboardOpen.set(true);
    } else {
      this.isLoginModalOpen.set(true);
    }
  }

  public closeLoginModal(): void {
    this.isLoginModalOpen.set(false);
  }

  public openDashboard(): void {
    if (this.isLoggedIn()) {
      this.isAdminDashboardOpen.set(true);
    } else {
      this.isLoginModalOpen.set(true);
    }
  }

  public closeDashboard(): void {
    this.isAdminDashboardOpen.set(false);
  }
}
