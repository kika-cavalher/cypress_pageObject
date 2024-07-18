require('cypress-xpath');

import { el } from './elements.js'
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
        cy.apiLogin(userCostumer, true)
        cy.handleBarberId(userBarber)
        cy.createAppointment(hour)
    }

    calendarShouldBeVisible() {
        cy.get(el.calendar, { timeout: 7000 })
            .should('be.visible')
    }

    chooseNextDay(day) {

        let today = new Date()
        //Para pegar o ultimo dia do mes. 
        let lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)

        if (today.getDate() === lastDay.getDate()) {
            cy.get(el.nextPageCalendar)
                .should('be.visible')
                .click()

            let now = new Date();
            // Para sempre escolher o dia de amanha
            now.setDate(now.getDate() + 1);

            let monthName
            switch (now.getMonth()) {
                case 0:
                    monthName: 'Janeiro'
                    break
                case 1:
                    monthName: 'Fevereiro'
                    break
                case 2:
                    monthName: 'Março'
                    break
                case 3:
                    monthName: 'Abril'
                    break
                case 4:
                    monthName: 'Maio'
                    break
                case 5:
                    monthName: 'Junho'
                    break
                case 6:
                    monthName: 'Julho'
                    break
                case 7:
                    monthName: 'Agosto'
                    break
                case 8:
                    monthName: 'Setembro'
                    break
                case 9:
                    monthName: 'Outubro'
                    break
                case 10:
                    monthName: 'Novembro'
                    break
                case 11:
                    monthName: 'Dezembro'
                    break
            }

            //Checkpoint que trocou o calendario.
            cy.xpath(el.mounthTitle, monthName)
                .should('be.visible')

        }

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