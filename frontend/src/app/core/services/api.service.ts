import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import {
    HttpClient
} from '@angular/common/http';

import {
    environment
} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private readonly apiUrl =
        environment.apiUrl;

    constructor(
        private http: HttpClient
    ) { }

    get<T>(
        endpoint: string
    ) {

        const token =
            localStorage.getItem('token');

        const headers =
            token
                ? new HttpHeaders({
                    Authorization:
                        `Bearer ${token}`
                })
                : undefined;

        return this.http.get<T>(
            `${this.apiUrl}/${endpoint}`,
            {
                headers
            }
        );
    }

    post<T>(
        endpoint: string,
        data: unknown
    ) {
        return this.http.post<T>(
            `${this.apiUrl}/${endpoint}`,
            data
        );
    }
}