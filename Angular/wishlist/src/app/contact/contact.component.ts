import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { createInvalidDomainValidator } from './invalidEmailDomain'

const invalidEmailDomain = createInvalidDomainValidator(['gmail.com', 'yahoo.com'])

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent {
    contactForm = new FormGroup({
        senderName: new FormControl('', Validators.required),
        senderEmail: new FormControl('', [Validators.required, Validators.email, invalidEmailDomain]),
        senderMessage: new FormControl('', [Validators.required, Validators.minLength(10)])
    })

    submitForm(e: MouseEvent) {
        e.preventDefault()
        console.log(this.contactForm.valid)
        // if (this.senderNameControl.dirty) alert('You changed the name field')
    }
}
