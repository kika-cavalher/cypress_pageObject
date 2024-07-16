Cypress.Commands.add('postUser', function (user) {
    // Remover o usuário antes de tentar criar
    cy.task('removeUser', user.email).then((result) => {
        console.log(result);
    });

    // Fazer uma requisição POST para criar o usuário
    cy.request('POST', 'http://localhost:3333/users', user).then((response) => {
        expect(response.status).to.eq(200);
    });
});

Cypress.Commands.add('delUser', (user) => {
    cy.task('removeUser', user.email).then((result) => {
        console.log(result);
    });
});