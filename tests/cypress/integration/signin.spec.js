import signinPage from '../support/pages/signin/index.js'
import dashPage from '../support/pages/header'

describe('signin', function () {
    context('When the user is top das galaxias', function () {
        const user = {
            name: 'Erica Cavalher',
            is_provider: true,
            email: 'erica.cavalher@gmail.com',
            password: 'Kika1234'
        }

        // Simplificando a chamada de remover e adicionar o user novamente colocando como comando nativo. 
        before(function () {
            cy.postUser(user)
        })

        it('Must login with success ', function () {
            signinPage.goToPage()
            signinPage.fillForm(user)
            signinPage.submitForm()

            dashPage.header.userLoggedIn(user.name)
        })
    })
})