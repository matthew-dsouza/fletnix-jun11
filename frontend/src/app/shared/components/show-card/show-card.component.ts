import {
    Component,
    Input
} from '@angular/core';

import { RouterModule } from '@angular/router';

import { Show } from '../../models/show.model';

@Component({
    selector: 'app-show-card',

    standalone: true,

    imports: [RouterModule],

    templateUrl:
        './show-card.component.html',

    styleUrl:
        './show-card.component.css'
})
export class ShowCardComponent {
    @Input({ required: true })
    show!: Show;
}