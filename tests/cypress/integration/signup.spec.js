const { faker } = require('@faker-js/faker');

it('Must signup a new randon user', function(){

    const name = 'Erica Cavalher'
    // const email = faker.internet.email()
    const email = 'erica.cavalher@gmail.com'
    const password = 'Kika1234'

    // Chamar a task que remove o dado no bd (foi criado no arquivo plugins -- index.js)
    cy.task('removeUser', email)
        .then(function(result){
            console.log(result)
        })

    cy.visit('/signup')

    cy.get('input[placeholder="Nome"]').type(name)
    cy.get('input[placeholder="E-mail"]').type(email)
    cy.get('input[placeholder="Senha"]').type(password)
    cy.contains('button[type="submit"]', 'Cadastrar').click()

    cy.get('.toast')
        .should('be.visible')
        .find('p')
        .should('have.text', 'Agora você pode fazer seu login no Samurai Barbershop!')

    // cy.wait(1000)
    // cy.get('body')

})

// Mudando o status da requisição para aceitar e não adicionar no banco. 
// it('Must signup a new user', function(){

//     const name = 'Erica Cavalher'
//     const email = 'erica.cavalher@gmail.com'
//     const password = 'Kika.1234'

//     cy.visit('/signup')

//     cy.get('input[placeholder="Nome"]').type(name)
//     cy.get('input[placeholder="E-mail"]').type(email)
//     cy.get('input[placeholder="Senha"]').type(password)

//     // Criamos um ouvinte para esperar a req POST e troca para 200
//     cy.intercept('POST', '/users', {
//         statuscode: 200
//     }).as('postUser')

//     cy.contains('button[type="submit"]', 'Cadastrar').click()

//     // Espera o ouvinte fazer o req e pega o status 200 e coloca para a app achar que deu sucesso.
//     cy.wait('@postUser')

//     cy.get('.toast')
//         .should('be.visible')
//         .find('p')
//         .should('have.text', 'Agora você pode fazer seu login no Samurai Barbershop!')

//     // cy.wait(1000)
//     // cy.get('body')

// })