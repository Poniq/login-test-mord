describe('Login Test - Simple Start', () => {
  
    it('Should load the login page', () => {
      // Visit your HTML file
      cy.visit('index.html') // This will look for index.html in your project root
      
      // Check if basic elements are visible
      cy.get('#email').should('be.visible')
      cy.get('#password').should('be.visible')
      cy.get('#loginBtn').should('be.visible')
      
      // Check page title
      cy.title().should('contain', 'Login')
    })
  
    it('Should login with valid credentials', () => {
      // Visit the page
      cy.visit('index.html')
      
      // Type in the email and password
      cy.get('#email').type('user@example.com')
      cy.get('#password').type('password123')
      
      // Click login button
      cy.get('#loginBtn').click()
      
      // Check if we see the dashboard
      cy.get('#dashboard').should('be.visible')
      cy.contains('Welcome').should('be.visible')
    })
  
    it('Should show error for wrong password', () => {
      // Visit the page
      cy.visit('index.html')
      
      // Type wrong credentials
      cy.get('#email').type('user@example.com')
      cy.get('#password').type('wrongpassword')
      
      // Click login button
      cy.get('#loginBtn').click()
      
      // Check for error message
      cy.get('#errorMessage').should('be.visible')
      cy.get('#errorMessage').should('contain', 'Invalid')
    })
  
    it('Should show error for short password', () => {
      // Visit the page
      cy.visit('index.html')
      
      // Type short password (less than 8 characters)
      cy.get('#email').type('user@example.com')
      cy.get('#password').type('123') // Only 3 characters
      
      // Click login button
      cy.get('#loginBtn').click()
      
      // Check for password length error
      cy.get('#errorMessage').should('be.visible')
      cy.get('#errorMessage').should('contain', '8 characters')
    })
  
    it('Should lock account after 3 failed attempts', () => {
      // Visit the page
      cy.visit('index.html')
      
      // First failed attempt
      cy.get('#email').type('user@example.com')
      cy.get('#password').type('wrongpass1')
      cy.get('#loginBtn').click()
      cy.get('#errorMessage').should('contain', '2 attempts remaining')
      
      // Second failed attempt  
      cy.get('#email').clear().type('user@example.com')
      cy.get('#password').clear().type('wrongpass2')
      cy.get('#loginBtn').click()
      cy.get('#errorMessage').should('contain', '1 attempts remaining')
      
      // Third failed attempt - should trigger lockout
      cy.get('#email').clear().type('user@example.com')
      cy.get('#password').clear().type('wrongpass3')
      cy.get('#loginBtn').click()
      
      // Check account is locked
      cy.get('#errorMessage').should('contain', 'Account locked')
      
    })
  
  })