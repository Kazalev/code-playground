import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private subjcet = new Subject()

    emit(eventName: string, payload: any) {
        this.subjcet.next({ eventName, payload })
    }

    listen(eventName: string, callback: (event: any) => void) {
        this.subjcet.asObservable().subscribe((nextObj: any) => {
            if (eventName === nextObj.eventName) {
                callback(nextObj.payload)
            }
        })
    }
}
