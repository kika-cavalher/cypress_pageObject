require('cypress-xpath');

import { el } from './elements.js'


class Header {
    userLoggedIn(userName) {
        cy.get(el.elfullName, { timeout: 7000 })
            .should('be.visible')
            .should('have.text', userName)
    }
}

export default new Header()