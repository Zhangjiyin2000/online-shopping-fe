export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  userId: number;
  email: string;
  token: string;
  username: string;
  role: number;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  userId: number;
  email: string;
  username: string;
}

export interface JwtClaims {
  sub: string;
  authorities: string[];
  userId: number;
  role: number;
  email: string;
  iat: number;
  exp: number;
}