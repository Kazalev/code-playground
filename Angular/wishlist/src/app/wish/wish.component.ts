import { Component, OnInit } from '@angular/core'
import { WishItem } from 'src/shared/modules/wishItem'
import { EventService } from 'src/shared/services/EventService'
import { WishService } from './wish.service'

@Component({
    selector: 'app-wish',
    templateUrl: './wish.component.html',
    styleUrls: ['./wish.component.css']
})
export class WishComponent implements OnInit {
    items: WishItem[] = []

    filter: any

    constructor(
        private events: EventService,
        private wishService: WishService
    ) {
        this.events.listen('removeWish', (wish: WishItem) => {
            let index = this.items.indexOf(wish)
            this.items.splice(index, 1)
        })
    }

    ngOnInit(): void {
        // this.wishService.getWishes().subscribe(
        //     (data: any) => {
        //         this.items = data
        //     },
        //     (error: any) => {
        //         alert('Error: ' + error.message)
        //     }
        // )

        this.wishService.getWishes().subscribe({
            next: (data: any) => (this.items = data),
            error: (error: any) => alert('Error: ' + error.message)
        })
    }
}
