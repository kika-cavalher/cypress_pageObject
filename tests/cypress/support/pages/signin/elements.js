exports.el = {       
    email: 'input[placeholder$="mail"]',       
    password: 'input[placeholder*="Senha"]', 
    signinButton: ('button[type="submit"]', 'Entrar'),
    aForgotPass: ('a[href="/forgot-password"]', 'Esqueci minha senha'), 
    forgotButton: '//div[@class="form-input"]/following-sibling::button[1]',
    newPassword: 'input[placeholder*="Nova"]', 
    confirmPassword: 'input[placeholder*="Confirmação"]', 
    submitNewPass: '//button[text()="Alterar senha"]',
}