import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, JwtClaims } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, payload).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        localStorage.removeItem('userId');
        localStorage.removeItem('email');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
      })
    );
  }

  register(payload: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/signup`, payload);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getDecodedToken(): JwtClaims | null {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    const payload = token.split('.')[1];

    if (!payload) {
      return null;
    }

    try {
      //  a JSON string
      const decodedPayload = atob(payload.replace(/-/g,'+').replace(/_/g, '/'));
      return JSON.parse(decodedPayload); // After parsing, claims becomes an object
    } catch {
      return null;
    }
  }

  getAuthorities(): string[] {
    const claims = this.getDecodedToken();
    const authorities = claims?.authorities;

    return Array.isArray(authorities) ? authorities : [];
  }

  isAdmin(): boolean {
    return this.getAuthorities().includes('ROLE_ADMIN');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  }
}
