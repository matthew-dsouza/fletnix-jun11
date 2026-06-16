import {
    Component,
    OnInit,
    ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ShowService } from '../../services/show.service';
import { AuthService } from '../../../auth/services/auth.service';

import { Show } from '../../../../shared/models/show.model';

import { ShowCardComponent } from '../../../../shared/components/show-card/show-card.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ShowCardComponent
    ],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    shows: Show[] = [];

    currentPage = 1;

    totalPages = 1;

    search = '';

    type = '';

    loading = false;

    constructor(
        private showService: ShowService,
        private authService: AuthService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.loadShows();
    }

    loadShows(): void {

        this.loading = true;

        this.showService
            .getShows(
                this.currentPage,
                this.search,
                this.type
            )
            .subscribe({
                next: (response) => {

                    console.log(
                        'Shows loaded:',
                        response.shows?.length
                    );

                    this.shows = [...response.shows];

                    this.currentPage =
                        response.currentPage;

                    this.totalPages =
                        response.totalPages;

                    this.loading = false;

                    this.cdr.detectChanges();
                },

                error: (error) => {

                    console.error(error);

                    this.loading = false;

                    this.cdr.detectChanges();
                }
            });
    }

    searchShows(): void {
        this.currentPage = 1;
        this.loadShows();
    }

    previousPage(): void {

        if (this.currentPage > 1) {

            this.currentPage--;

            this.loadShows();
        }
    }

    nextPage(): void {

        if (
            this.currentPage <
            this.totalPages
        ) {

            this.currentPage++;

            this.loadShows();
        }
    }

    logout(): void {

        this.authService.logout();

        location.href = '/login';
    }
}