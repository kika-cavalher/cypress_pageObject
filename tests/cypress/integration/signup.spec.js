const { faker } = require('@faker-js/faker');

it('Must signup a new user', function(){

    const name = 'Erica Cavalher'
    const email = faker.internet.email()
    const password = 'Kika.1234'

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