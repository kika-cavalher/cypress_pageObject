require('cypress-xpath');

import {el} from './elements.js'
import toast from '../../components/toast/index.js'
import errorField from '../../components/errorField/index.js'


class SignupPage {
    constructor() {
        this.toast = toast
        this.errorField = errorField
    }

    goToPage() {
        cy.visit('/signup')
    }

    fillForm(user) {
        cy.get(el.name).type(user.name)       
        cy.get(el.email).type(user.email)    
        cy.get(el.password).type(user.password)  
    }

    submitForm() {
        cy.contains(el.signupButton).click()
    }
}

export default new SignupPage()