import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  login(email: string, password: string) {
    // Implement login logic
  }

  logout() {
    // Implement logout logic
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
}