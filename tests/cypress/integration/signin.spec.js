import signinPage from '../support/pages/signin/index.js'
import dashPage from '../support/pages/header'

describe('signin', function () {
    context('quando o user é top das galaxias', function () {
        const user = {
            name: 'Erica Cavalher',
            email: 'erica.cavalher@gmail.com',
            password: 'Kika1234'
        }

        it('Must login with success ', function () {
            signinPage.goToPage()
            signinPage.fillForm(user)
            signinPage.submitForm()

            dashPage.header.userLoggedIn(user.name)
        })
        
    })
})