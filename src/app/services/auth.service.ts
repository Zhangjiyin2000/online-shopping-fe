import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  message: string;
  userId: number;
  email: string;
  token: string;
  username: string;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  message: string;
  userId: number;
  email: string;
  username: string;
}

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
        localStorage.setItem('userId', String(response.userId));
        localStorage.setItem('email', response.email);
        localStorage.setItem('username', response.username);
      })
    );
  }

  register(payload: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/signup`, payload);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
