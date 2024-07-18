require('cypress-xpath');

import {el} from './elements.js'
import signinPage from '../signin/index.js'
import header from '../../components/header/index.js'

class DashPage {
    constructor() {
        this.header = header
        this.signinPage = signinPage
    }

    scheduleAnAppointmentByCostumer(userBarber, userCostumer, hour) {
        cy.postUser(userBarber)
        cy.postUser(userCostumer)
        cy.apiLoginCostumerToken(userCostumer)
        cy.handleBarberId(userBarber)
        cy.createAppointment(hour)
    }

    loginBarber(user) {
        signinPage.goToPage()
        signinPage.fillForm(user)
        signinPage.submitForm()
        header.userLoggedIn(user.name)
    }

    calendarShouldBeVisible() {
        cy.get(el.calendar, {timeout: 7000})
            .should('be.visible')
    }

    chooseNextDay(day) {

        // ^ -- começa com
        // $ -- termina com
        // g -- global
        const target = new RegExp('^' + day + '$', 'g')

        cy.contains(el.today, target)
            .click()
    }

    appointmentShouldBeVisible(customer, hour) {
        cy.contains('div', customer.name)
            .should('be.visible')
            .parent()

            .contains(el.appointmentHour, hour)
            .should('be.visible')
    }

}

export default new DashPage()