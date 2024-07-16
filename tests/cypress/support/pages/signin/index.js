require('cypress-xpath');

import { el } from './elements.js'
import toast from '../../components/toast/index.js'
import errorField from '../../components/errorField/index.js'


class SigninPage {
    constructor() {
        this.toast = toast
        this.errorField = errorField
    }

    goToPage() {
        cy.visit('/')
    }

    fillForm(user) {     
        cy.get(el.email)
            .clear()
            .type(user.email)    
        cy.get(el.password)
            .clear()
            .type(user.password)  
    }

    submitForm() {
        cy.contains(el.signinButton)
            .click()
    }
}

export default new SigninPage()