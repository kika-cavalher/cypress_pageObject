import {el} from './elements.js'

class Toast {
    textConfirm(msg) {
        cy.get(el.toastMsg, {timeout: 10000})
            .should('be.visible')
            .find('p')
            .should('have.text', msg)
    }
}

export default new Toast()