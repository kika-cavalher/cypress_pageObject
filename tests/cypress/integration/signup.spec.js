const { faker } = require('@faker-js/faker');

import signupPage from '../support/pages/signup/index.js'

// it.only(texto) -- para executar somente 1 teste
//Como se fosse o plano de teste.
describe('signup', function () {

    //Para preparar um contexto de teste, usars os its como cenarios dentro de um teste. 
    context('quando o user é novo', function () {
        // super constante para otimizar o uso de dados compartilhados
        const user = {
            name: 'Erica Cavalher',
            email: 'erica.cavalher@gmail.com',
            password: 'Kika1234'
        }

        before(function () {
            // Chamar a task que remove o dado no bd (foi criado no arquivo plugins -- index.js)
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('Must signup remove of db and add new user ', function () {
            signupPage.goToPage()
            signupPage.fillForm(user)
            signupPage.submitForm()
            signupPage.toast.textConfirm('Agora você pode fazer seu login no Samurai Barbershop!')
        })
    })

    context('quando o user ja existe', function () {
        const userPost = {
            email: 'erica.cavalher@gmail.com',
            is_provider: true,
            name: 'Erica Cavalher',
            password: 'Kika1234'
        }

        before(function () {
            // Chamar a task que remove o dado no bd (foi criado no arquivo plugins -- index.js)
            cy.task('removeUser', userPost.email)
                .then(function (result) {
                    console.log(result)
                })
            // Adicionar um user no banco antes do teste para ter certeza que funciona sem dependencia de outros steps.
            cy.request(
                'POST',
                'http://localhost:3333/users',
                userPost
            ).then(function (response) {
                expect(response.status).to.eq(200)
            })
        })

        it('Is not possible add user with the same email', function () {
            signupPage.goToPage()
            signupPage.fillForm(userPost)
            signupPage.submitForm()
            signupPage.toast.textConfirm('Email já cadastrado para outro usuário.')

            // Pegar o body para ficar mais facil visualizar um elemento
            // cy.wait(1000)
            // cy.get('body')
        })
    })

    // Mudando o status da requisição para aceitar e não adicionar no banco. 
    it('Must signup a new randon user and force status 200', function () {
        const userRandon = {
            email: faker.internet.email(),
            name: 'Erica Cavalher',
            password: 'Kika1234'
        }

        signupPage.goToPage()
        signupPage.fillForm(userRandon)

        // Criamos um ouvinte para esperar a req POST e troca para 200
        cy.intercept('POST', '/users', {
            statuscode: 200
        }).as('postUser')

        signupPage.submitForm()

        // Espera o ouvinte fazer o req e pega o status 200 e coloca para a app achar que deu sucesso.
        cy.wait('@postUser')
        signupPage.toast.textConfirm('Agora você pode fazer seu login no Samurai Barbershop!')
    })
})

context('Password incorreta', function () {
    const userErrorEmail = {
        email: 'erica.cavalhergmail.com',
        name: 'Erica Cavalher',
        password: 'KIka1234'
    }

    it('Must be visible error mensage', function () {
        signupPage.goToPage()
        signupPage.fillForm(userErrorEmail)
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

        const userErrorPassword = {
            email: 'erica.cavalher@gmail.com',
            name: 'Erica Cavalher',
            password: pass
        }
        it('Nao deve executar com a senha:' + pass, function () {
            signupPage.fillForm(userErrorPassword)
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