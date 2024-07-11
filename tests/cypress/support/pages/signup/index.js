require('cypress-xpath');

import {el} from './elements.js'
import toast from '../../components/toast/index.js'


class SignupPage {
    constructor() {
        this.toast = toast
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

    alertErrorEmail() {
        cy.xpath(el.errorEmail)
            .should('be.visible')
    }

    alertErrorPassword() {
        cy.xpath(el.errorPassword)
            .should('be.visible')
    }

    alertErrorName() {
        cy.xpath(el.errorName)
            .should('be.visible')
    }
}

export default new SignupPage()