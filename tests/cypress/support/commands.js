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

Cypress.Commands.add('recoveryPass', (user) => {
    cy.request('POST', 'http://localhost:3333/password/forgot', { email: user.email }).then((response) => {
        expect(response.status).to.eq(204);
    });
});

Cypress.Commands.add('recoveryPass', (user) => {
    cy.request('POST', 'http://localhost:3333/password/forgot', { email: user.email }).then((response) => {
        expect(response.status).to.eq(204);

        cy.task('findToken', user.email).then((result) => {
            //Criar uma variavel de ambiente e salvar um valor. 
            Cypress.env('recoveryToken', result.token)
        });

    });
});

