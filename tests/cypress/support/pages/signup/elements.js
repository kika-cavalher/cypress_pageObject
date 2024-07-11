exports.el = {
    name: 'input[placeholder^="Nome"]',          // REGEX ^ para quando começa com o texto.
    email: 'input[placeholder$="E-mail"]',       // & para quando termina com o texto.
    password: 'input[placeholder*="Senha"]',     // * para quando contain em qualquer poisçao o texto.
    signupButton: ('button[type="submit"]', 'Cadastrar'),
    errorEmail: '//input[@placeholder="E-mail"]/following-sibling::div[contains(@class, "required-erro")]',
    errorPassword: '//input[@placeholder="Senha"]/following-sibling::div[contains(@class, "required-erro")]',
    errorName: '//input[@placeholder="Nome"]/following-sibling::div[contains(@class, "required-erro")]',
}