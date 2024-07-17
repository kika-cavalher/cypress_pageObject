import dashPage from '../support/pages/dash/index.js'
import signinPage from '../support/pages/signin/index.js'
import header from '../support/components/header/index.js'


describe('dashBarber', function () {

    beforeEach(function () {
        cy.fixture("costumer").then((user) => {
          // Armazena os dados do fixture no contexto de teste
          this.successCostumer = user.success;
        });
        cy.fixture("user").then((user) => {
            // Armazena os dados do fixture no contexto de teste
            this.successBarber = user.success;
          });
      });

    context('When the costumer did a apointment in the app', function () {

        beforeEach(function () {
            dashPage.scheduleAnAppointmentByCostumer(this.successBarber, this.successCostumer)
        });

        it.only('Must show the appointment in the dash', function () {
            
            // signinPage.loginBarber(this.successBarber)

            signinPage.goToPage()
            signinPage.fillForm(this.successBarber)
            signinPage.submitForm()
            header.userLoggedIn(this.successBarber.name)

        





    
        });
    })
})
