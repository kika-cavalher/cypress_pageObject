const { faker } = require('@faker-js/faker');

describe('signup', function () {

    // super constante para otimizar o uso de dados compartilhados
    const user = {
        name: 'Erica Cavalher',
        email: 'erica.cavalher@gmail.com',
        password: 'Kika1234'
    }

    it('Must signup remove of db and add new user ', function () {

        // Chamar a task que remove o dado no bd (foi criado no arquivo plugins -- index.js)
        cy.task('removeUser', user.email)
            .then(function (result) {
                console.log(result)
            })

        cy.visit('/signup')

        cy.get('input[placeholder="Nome"]').type(user.name)
        cy.get('input[placeholder="E-mail"]').type(user.email)
        cy.get('input[placeholder="Senha"]').type(user.password)
        cy.contains('button[type="submit"]', 'Cadastrar').click()

        cy.get('.toast')
            .should('be.visible')
            .find('p')
            .should('have.text', 'Agora você pode fazer seu login no Samurai Barbershop!')

    })

    // Mudando o status da requisição para aceitar e não adicionar no banco. 
    it('Must signup a new randon user and force status 200', function () {
        const email = faker.internet.email()

        cy.visit('/signup')

        cy.get('input[placeholder="Nome"]').type(user.name)
        cy.get('input[placeholder="E-mail"]').type(email)
        cy.get('input[placeholder="Senha"]').type(user.password)

        // Criamos um ouvinte para esperar a req POST e troca para 200
        cy.intercept('POST', '/users', {
            statuscode: 200
        }).as('postUser')

        cy.contains('button[type="submit"]', 'Cadastrar').click()

        // Espera o ouvinte fazer o req e pega o status 200 e coloca para a app achar que deu sucesso.
        cy.wait('@postUser')

        cy.get('.toast')
            .should('be.visible')
            .find('p')
            .should('have.text', 'Agora você pode fazer seu login no Samurai Barbershop!')

    })

    it('Is not possible add user with the same email', function () {

        cy.visit('/signup')

        cy.get('input[placeholder="Nome"]').type(user.name)
        cy.get('input[placeholder="E-mail"]').type(user.email)
        cy.get('input[placeholder="Senha"]').type(user.password)
        cy.contains('button[type="submit"]', 'Cadastrar').click()

        cy.get('.toast')
            .should('be.visible')
            .find('p')
            .should('have.text', 'Email já cadastrado para outro usuário.')

        // Pegar o body para ficar mais facil visualizar um elemento
        // cy.wait(1000)
        // cy.get('body')

    })
})
