import signinPage from '../support/pages/signin/index.js'
import dashPage from '../support/pages/header'

describe('signin', function () {
    beforeEach(function () {
        cy.fixture("user").then((user) => {
          // Armazena os dados do fixture no contexto de teste
          this.success = user.success;
          this.emailInv = user.emailInv;
          this.passInv = user.passInv;
          this.passWrong = user.passWrong
        });
      });

    context('When the user is top das galaxias', function () {
        // Simplificando a chamada de remover e adicionar o user novamente colocando como comando nativo. 
        beforeEach(function () {
            cy.postUser(this.success)
        });

        it('Must login with success ', function () {
            signinPage.goToPage()
            signinPage.fillForm(this.success)
            signinPage.submitForm()

            dashPage.header.userLoggedIn(this.success.name)
        })
    })

    context('When the user is top but the password is incorrect', function () {

        beforeEach(function () {
            // Para fazer um call back e executar um antes do outro e nao tudo junto)
            cy.postUser(this.success).then(function () {
                this.success.password = 'Kika1111'
            })
        })

        it('Must warning error in credentials', function () {
            signinPage.goToPage()
            signinPage.fillForm(this.success)
            signinPage.submitForm()

            signinPage.toast.textConfirm('Ocorreu um erro ao fazer login, verifique suas credenciais.')
        })
    })

    context('When the user write a incorrect email', function () {
        const emails = [
            'erica.cavalhergmail.com',
            'gmail.com',
            '@gmail.com',
            '@',
            'erica@',
            '1111',
            '#$%^&*("',
            'xpTo123'
        ]

        before(function () {
            signinPage.goToPage()
        })

        emails.forEach(function (email) {
            it('Must warning error in email:' + email, function () {

                this.emailInv.email = email

                signinPage.fillForm(this.emailInv)
                signinPage.submitForm()

                signinPage.errorField.alertErrorEmail()
            })
        })
    })

    context('When the user write a incorrect password', function () {
        it('Must warning error in password:', function () {
            signinPage.goToPage()
            signinPage.fillForm(this.passWrong)
            signinPage.submitForm()

            signinPage.toast.textConfirm('Ocorreu um erro ao fazer login, verifique suas credenciais.')
        })

    })

    context('When the user try to enter without fill the forms', function () {
        it('Must warning error in email:', function () {
            signinPage.goToPage()
            signinPage.submitForm()

            signinPage.errorField.alertErrorEmail()
            signinPage.errorField.alertErrorPassword()
        })
    })

    context('I forgot my password and I need a new one', function () {
        beforeEach(function () {
            cy.postUser(this.success)
        })
        
        it('Must show toast send email for new password:', function () {
            signinPage.goToPage()
            signinPage.enterForgotPassword()
            signinPage.fillFormEmailForget(this.success)
            signinPage.submitForgotEmail()
            signinPage.toast.textConfirm('Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.')
        })

        it.only('Can change the password and create new one', function () {
            signinPage.goToPage()
            signinPage.enterForgotPassword()
            signinPage.fillFormEmailForget(this.success)
            signinPage.submitForgotEmail()
            signinPage.toast.textConfirm('Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.')
        
            cy.recoveryPass(this.success)
            
        })
    })

})