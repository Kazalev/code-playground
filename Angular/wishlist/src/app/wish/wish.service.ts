import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http'
import { WishItem } from 'src/shared/modules/wishItem'
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class WishService {
    constructor(private http: HttpClient) {}

    private getStandardOptions(): any {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
    }

    getWishes() {
        let options = this.getStandardOptions()
        options.params = new HttpParams({
            fromObject: {
                format: 'json'
            }
        })

        return this.http.get('assets/wishes.json', options).pipe(catchError(this.handleError))
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.error(`There is an issue with the client ot network: ${error.error}`)
        } else {
            console.error(`Server returned code: ${error.status}, error message is: ${error.message}`)
        }

        return throwError(() => new Error('Cannot retrieve wishes from server. Please try again.'))
    }

    addWish(wish: WishItem) {
        let options = this.getStandardOptions()
        options.headers = options.headers.set('Authorization', 'value-need-for-auth')
        return this.http.post('assets/wishes.json', wish, options)
    }
}
