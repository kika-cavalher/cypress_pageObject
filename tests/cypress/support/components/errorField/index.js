require('cypress-xpath');

import { el } from './elements.js'


class ErrorField {
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

export default new ErrorField()