import moment from 'moment'

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

Cypress.Commands.add('apiLoginCostumerToken', (user) => {

    // Para pegar somente os dados que eu preciso
    const payload = {
        email: user.email,
        password: user.password
    }

    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/sessions',
        body: payload
    }).then(function(response) {
        expect(response.status).to.eq(200);
        Cypress.env('apiToken', response.body.token)
    })
});


Cypress.Commands.add('handleBarberId', (emailBarber) => {
    const header = {
        authorization: 'Bearer ' + Cypress.env('apiToken')
    }

    cy.request({
        method: 'GET',
        url: 'http://localhost:3333/providers',
        headers: header
    }).then(response => {
        expect(response.status).to.eq(200);

        const list = response.body;
        let barberId;

        list.forEach(barber => {
            if (barber.email === emailBarber.email) {
                barberId = barber.id;
                Cypress.env('barberId', barber.id);
            }
        });

        // Retorna o barberId encontrado
        return barberId;
    });
});

Cypress.Commands.add('createAppointment', () => {
    const header = {
        authorization: 'Bearer ' + Cypress.env('apiToken')
    };

    let now = new Date();
    now.setDate(now.getDate() + 1);
    const date = moment(now).format('YYYY-MM-DD 14:00:00');
    
    const appointment = {
        provider_id: Cypress.env('barberId'),
        date: date
    };

    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/appointments',
        headers: header,
        body: appointment,
        failOnStatusCode: false // Adiciona isso para não falhar no código de status
    }).then(function(response) {
        expect(response.status).to.eq(200);
    });
});