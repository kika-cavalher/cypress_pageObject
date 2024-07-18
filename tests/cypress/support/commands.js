import moment from 'moment'
import { apiServer } from '../../cypress.json'
import signinPage from './pages/signin/index'
import header from './components/header/index.js'

Cypress.Commands.add('loginBarber', (user) => {
    signinPage.goToPage()
    signinPage.fillForm(user)
    signinPage.submitForm()
    header.userLoggedIn(user.name)
});

Cypress.Commands.add('postUser', function (user) {
    // Remover o usuário antes de tentar criar
    cy.task('removeUser', user.email).then((result) => {
        console.log(result);
    });

    // Fazer uma requisição POST para criar o usuário
    cy.request('POST', apiServer + '/users', user).then((response) => {
        expect(response.status).to.eq(200);
    });
});

Cypress.Commands.add('delUser', (user) => {
    cy.task('removeUser', user.email).then((result) => {
        console.log(result);
    });
});

Cypress.Commands.add('recoveryPass', (user) => {
    cy.request('POST', apiServer + '/password/forgot', { email: user.email }).then((response) => {
        expect(response.status).to.eq(204);
    });
});

Cypress.Commands.add('recoveryPass', (user) => {
    cy.request('POST', apiServer + '/password/forgot', { email: user.email }).then((response) => {
        expect(response.status).to.eq(204);

        cy.task('findToken', user.email).then((result) => {
            //Criar uma variavel de ambiente e salvar um valor. 
            Cypress.env('recoveryToken', result.token)
        });

    });
});

Cypress.Commands.add('apiLogin', (user, setLocalStorage = false) => {
    //setLocalStorage = false, com o = falte o argumento vira opcional. (user, setLocalStorage = false)
    // Para pegar somente os dados que eu preciso
    const payload = {
        email: user.email,
        password: user.password
    }

    cy.request({
        method: 'POST',
        //Interpolacao de valores
        url: `${apiServer}/sessions`,
        body: payload
    }).then(function (response) {
        expect(response.status).to.eq(200);
        Cypress.env('apiToken', response.body.token)

        if (setLocalStorage) {
            const { token, user } = response.body
            window.localStorage.setItem('@Samurai:token', token)
            window.localStorage.setItem('@Samurai:user', JSON.stringify(user))
        }
    })

    if (setLocalStorage) {
        cy.visit('/dashboard')
    }
});


Cypress.Commands.add('handleBarberId', (emailBarber) => {
    const header = {
        authorization: 'Bearer ' + Cypress.env('apiToken')
    }

    cy.request({
        method: 'GET',
        url: apiServer + '/providers',
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

Cypress.Commands.add('createAppointment', (hour) => {
    const header = {
        authorization: 'Bearer ' + Cypress.env('apiToken')
    };

    let now = new Date();
    // Para sempre escolher o dia de amanha
    now.setDate(now.getDate() + 1);

    // Para usar depois somente o dia selecionado. 
    Cypress.env('appointmentDay', now.getDate())

    const date = moment(now).format(`YYYY-MM-DD ${hour}:00`);

    const appointment = {
        provider_id: Cypress.env('barberId'),
        date: date
    };

    cy.request({
        method: 'POST',
        url: apiServer + '/appointments',
        headers: header,
        body: appointment,
        failOnStatusCode: false // Adiciona isso para não falhar no código de status
    }).then(function (response) {
        expect(response.status).to.eq(200);
    });
});