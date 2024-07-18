import _ from 'underscore'

exports.costumer = {
    name: 'Erica Costumer',
    is_provider: true,
    email: 'ericavalher@gmail.com',
    password: 'Kika1234'
}

exports.barber = {
    name: 'Erica Cavalher',
    is_provider: true,
    email: 'erica.cavalher@gmail.com',
    password: 'Kika1234'
}

exports.appointmentHour = {
    //Sorteia um valor unico dentro de um array a cada teste. 
    hour: _.sample(['08:00', '10:00', '14:00'])
}