require('cypress-xpath');

import {el} from './elements.js'

class DashPage {
    scheduleAnAppointmentByCostumer(userBarber, userCostumer) {
        cy.postUser(userBarber)
        cy.postUser(userCostumer)
        cy.apiLoginCostumerToken(userCostumer)
        cy.handleBarberId(userBarber)
        cy.createAppointment()
    }

}

export default new DashPage()