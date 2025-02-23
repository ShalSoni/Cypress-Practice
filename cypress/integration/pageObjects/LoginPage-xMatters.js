class LoginPageXmatters
{
    getEmailEditBox()
  {
    return cy.get('[data-testid="login-form-username"]') //attribute-value pair

  }

    getPasswordEditBox()
    {
      return cy.get('[data-testid="login-form-password"]')
    }

    getLoginButton()
    {
      cy.get('#submitButton').click()
    }
  
}

export default LoginPageXmatters; //make class available to all other files in framework