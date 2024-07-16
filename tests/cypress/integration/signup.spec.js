const { faker } = require('@faker-js/faker');

import signupPage from '../support/pages/signup/index.js'

// it.only(texto) -- para executar somente 1 teste
//Como se fosse o plano de teste.
describe('signup', function () {

    beforeEach(function () {
        cy.fixture("user").then((user) => {
          // Armazena os dados do fixture no contexto de teste
          this.success = user.success;
          this.emailRandom = user.emailRandom;
          this.emailInv = user.emailInv;
          this.passInv = user.passInv;
        });
      });

    // Mudando o status da requisição para aceitar e não adicionar no banco. 
    it('Must signup a new randon user and force status 200', function () {
        this.emailRandom.email = faker.internet.email()

        signupPage.goToPage()
        signupPage.fillForm(this.emailRandom)

        // Criamos um ouvinte para esperar a req POST e troca para 200
        cy.intercept('POST', '/users', {
            statuscode: 200
        }).as('postUser')

        signupPage.submitForm()

        // Espera o ouvinte fazer o req e pega o status 200 e coloca para a app achar que deu sucesso.
        cy.wait('@postUser')
        signupPage.toast.textConfirm('Agora você pode fazer seu login no Samurai Barbershop!')
    })

    //Para preparar um contexto de teste, usars os its como cenarios dentro de um teste. 
    context('Its a new user', function () {
        // Usa beforeEach para garantir que o contexto esteja disponível
        beforeEach(function () {
            // Chama o comando personalizado com os dados do fixture
            cy.delUser(this.success);
        });

        it('Must signup remove of db and add new user ', function () {
            signupPage.goToPage()
            signupPage.fillForm(this.success)
            signupPage.submitForm()
            signupPage.toast.textConfirm('Agora você pode fazer seu login no Samurai Barbershop!')
        })
    })

    context('The user already exist', function () {
        before(function () {
            cy.postUser(this.success)
        })

        it('Is not possible add user with the same email', function () {
            signupPage.goToPage()
            signupPage.fillForm(this.success)
            signupPage.submitForm()
            signupPage.toast.textConfirm('Email já cadastrado para outro usuário.')

            // Pegar o body para ficar mais facil visualizar um elemento
            // cy.wait(1000)
            // cy.get('body')
        })
    })

    context('Password incorrect', function () {
        it('Must be visible error mensage', function () {
            signupPage.goToPage()
            signupPage.fillForm(this.emailInv)
            signupPage.submitForm()
            signupPage.errorField.alertErrorEmail()
        })
    })

    context('Senha incorreta', function () {
        const passwords = ['1', '2', '3', 'a4', 'a^%',]

        beforeEach(function () {
            signupPage.goToPage()
        })

        passwords.forEach(function (pass) {
            it('Nao deve executar com a senha:' + pass, function () {
                this.passInv.password = pass

                signupPage.fillForm(this.passInv)
                signupPage.submitForm()
            })
        })

        afterEach(function () {
            signupPage.errorField.alertErrorPassword()
        })

    })

    context('Filds required', function () {
        it('Must be visible error mensage', function () {
            signupPage.goToPage()
            signupPage.submitForm()
            signupPage.errorField.alertErrorName()
            signupPage.errorField.alertErrorEmail()
            signupPage.errorField.alertErrorPassword()
        })
    })
    
})