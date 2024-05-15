import { Component, EventEmitter, Output } from '@angular/core'
import { WishItem } from 'src/shared/modules/wishItem'

@Component({
    selector: 'add-wish-form',
    templateUrl: './add-wish-form.component.html',
    styleUrls: ['./add-wish-form.component.css']
})
export class AddWishFormComponent {
    @Output() addWish = new EventEmitter<WishItem>()
    newWishText: string = ''

    constructor() {}

    addNewWish(e: MouseEvent) {
        e.preventDefault()
        if (!this.newWishText) return
        this.addWish.emit(new WishItem(this.newWishText))
        this.newWishText = ''
    }
}
