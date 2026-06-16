import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from '../../../core/services/api.service';

@Injectable({
    providedIn: 'root'
})
export class ShowService {

    constructor(
        private apiService: ApiService
    ) { }

    getShows(
        page: number,
        search: string,
        type: string
    ): Observable<any> {

        const params =
            new URLSearchParams();

        params.set(
            'page',
            page.toString()
        );

        if (search) {
            params.set(
                'search',
                search
            );
        }

        if (type) {
            params.set(
                'type',
                type
            );
        }

        return this.apiService.get(
            `shows?${params.toString()}`
        );
    }

    getShowById(id: string) {
        return this.apiService.get(
            `shows/${id}`
        );
    }
}