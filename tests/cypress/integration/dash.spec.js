import dashPage from '../support/pages/dash/index.js'

describe('dashBarber', function () {

    beforeEach(function () {
        cy.fixture("costumer").then((user) => {
          // Armazena os dados do fixture no contexto de teste
          this.success = user.success;
        });
      });

    context('When the costumer did a apointment in the app', function () {
        it('Must show the appointment in the dash', function () {
            

        })
    })
})
