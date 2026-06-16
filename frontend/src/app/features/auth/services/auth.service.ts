import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../core/services/api.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private apiService: ApiService
    ) { }

    register(data: {
        email: string;
        password: string;
        age: number;
    }): Observable<any> {
        return this.apiService.post(
            'auth/register',
            data
        );
    }

    login(data: {
        email: string;
        password: string;
    }): Observable<any> {
        return this.apiService.post(
            'auth/login',
            data
        );
    }

    saveToken(token: string): void {
        localStorage.setItem(
            'token',
            token
        );
    }

    getToken(): string | null {
        return localStorage.getItem(
            'token'
        );
    }

    logout(): void {
        localStorage.removeItem(
            'token'
        );
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }
}