import {
    Component,
    OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
    ActivatedRoute,
    RouterModule
} from '@angular/router';

import { ShowService } from '../../services/show.service';

import { Show } from '../../../../shared/models/show.model';

@Component({
    selector: 'app-details',

    standalone: true,

    imports: [
        CommonModule,
        RouterModule
    ],

    templateUrl:
        './details.component.html',

    styleUrl:
        './details.component.css'
})
export class DetailsComponent
    implements OnInit {
    show?: Show;

    loading = true;

    constructor(
        private route: ActivatedRoute,

        private showService: ShowService
    ) { }

    ngOnInit(): void {

        const id =
            this.route.snapshot.paramMap.get(
                'id'
            );

        if (!id) {
            return;
        }

        this.showService
            .getShowById(id)
            .subscribe({
                next: response => {

                    this.show = response;

                    this.loading = false;
                },

                error: () => {
                    this.loading = false;
                }
            });
    }
}