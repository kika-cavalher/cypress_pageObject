require('cypress-xpath');

import { el } from './elements.js'
import toast from '../../components/toast/index.js'


class SigninPage {
    constructor() {
        this.toast = toast
    }

    goToPage() {
        cy.visit('/')
    }

    fillForm(user) {     
        cy.get(el.email).type(user.email)    
        cy.get(el.password).type(user.password)  
    }

    submitForm() {
        cy.contains(el.signinButton)
            .click()
    }
}

export default new SigninPage()