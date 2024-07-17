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

    enterForgotPassword() {
        cy.contains(el.aForgotPass)
            .click()
    }

    fillFormEmailForget(user) {     
        cy.get(el.email)
            .clear()
            .type(user.email)
    }

    submitForgotEmail() {
        cy.xpath(el.forgotButton)
            .click()
    }

    goToForgotEmailPage() {
        cy.then(() => {
            const token = Cypress.env('recoveryToken');
            expect(token).to.not.be.undefined; // Assegura que o token foi definido
            cy.log(`Token recuperado: ${token}`);

            cy.visit('/reset-password?token='+ token)
        });
    }

    fillFormNewPass(user) {     
        cy.get(el.newPassword)
            .clear()
            .type(user.newPassword)
        cy.get(el.confirmPassword)
            .clear()
            .type(user.newPassword)
    }

    submitNewPass() {
        cy.xpath(el.submitNewPass)
            .click()
    }

    fillFormAfterChangePass(user) {     
        cy.get(el.email)
            .clear()
            .type(user.email)    
        cy.get(el.password)
            .clear()
            .type(user.newPassword)  
    }

    // loginBarber(user) {
    //     goToPage()
    //     fillForm(user)
    //     submitForm()
    //     header.userLoggedIn(user.name)
    // }

}

export default new SigninPage()