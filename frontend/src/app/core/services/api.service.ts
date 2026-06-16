import { Injectable } from '@angular/core';

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
        return this.http.get<T>(
            `${this.apiUrl}/${endpoint}`
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