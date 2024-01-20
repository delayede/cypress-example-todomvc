
// beforeEach (function(){

//     cy.visit('/')
    
// })

    describe('Test', () => {

        // it('Register API', () => {
        //     cy.request('POST', '/users/register',
        //     {
        //         name: 'test',
        //         email: 'fortcontentt@gmail.com',
        //         password: '123456'
        //     }
        //     ).then((RegisterResponse) =>{

        //         expect(RegisterResponse.status).to.equal(201)
        //         expect(RegisterResponse.success).to.equal('true')
        //         expect(RegisterResponse.message).to.equal("User account created successfully")
        //         expect(RegisterResponse.data.name).to.equal('test')
        //         expect(RegisterResponse.data.email).to.equal('fortcontentt@gmail.com')

        //     })
        // });
        
        it('Login API', () => {
            cy.request('POST', '/users/login',
            {
                email: 'fortcontentt@gmail.com',
                password: '123456'
            }
            ).then((RegisterResponse) =>{
                const authToken = RegisterResponse.body.data.token;
                expect(RegisterResponse.status).to.equal(200)
                expect(RegisterResponse.body.success).to.equal(true)
                expect(RegisterResponse.body.message).to.equal('Login successful')
                expect(RegisterResponse.body.data.name).to.equal('test')
                expect(RegisterResponse.body.data.email).to.equal('fortcontentt@gmail.com')
                
                
                cy.request({
                    method: 'DELETE',
                    url: '/users/delete-account',
                    headers: { 'x-auth-token': authToken }
            })
        });
        

    })











        
        // it('Register', () => {
        //     cy.get('#email').type('fortcontentt@gmail.com')
        //     cy.get('#name').type('test')
        //     cy.get('#password').type('123456')
        //     cy.get('#confirmPassword').type('123456')
        //     cy.get('button[data-testid="register-submit"]').click()
        //     cy.get('.alert-success b').should('have.be.visible')
        // });
        
        // it('Login', () => {
        //     cy.visit('https://practice.expandtesting.com/notes/app/login')
        //     cy.get('#email').type('fortcontentt@gmail.com')
        //     cy.get('#password').type('123456')
        //     cy.get('button[data-testid="login-submit"]').click()
        //     cy.get('[data-testid="profile"]').click()
        //     cy.get('button[data-testid="delete-account"]').click()
        //     cy.get('button[data-testid="note-delete-confirm"').click()

                
        // });
        
        // it('Try registedd with empty fields', () => {
        //     cy.get('button[data-testid="register-submit"]').click()
        //     cy.get('.col-md-6').find('.invalid-feedback').should('have.be.visible')
        // });










    });








        // // it('Auth', () => {
        // //     cy.get('#email').type('simpleForm@authenticationtest.com')
        // //     cy.get('#password').type(' pa$$w0rd')
        // //     cy.get('input[type="submit"]').click()
        // //     cy.url().should('contain', '/loginSuccess/')
        // // });
        
        // it('Auth', () => {
        //     cy.request('POST', 'https://authenticationtest.com//login/?mode=simpleFormAuth'),
        //     {
        //     mode:'simpleFormAuth',
        //     email:'simpleForm@authenticationtest.com',
        //     password:'pa$$w0rd'
        //     }

        //     // cy.request('GET', 'https://authenticationtest.com/loginSuccess/').then((loginStatus) =>{

        //     // expect(loginStatus.status).to.be.equal(200) 
        //     // expect(loginStatus.isOkStatusCode).to.be.equal(true)



        //     // })
        // });






                // it('Fields validation', () => {
        //     cy.get('#validationCustom01').type("Testing")
        //     cy.get('#validationCustom05').type("012-3456233")
        //     cy.get('#validationCustom04').select(1)
        //     cy.get('input[type="date"]').type("1999-12-31")
        //     cy.get('button.btn-primary').click()
        //     cy.get('.alert-info p').should('be.visible')
        //     // cy.get('.valid-feedback').should('be.visible')
        // });
        
        // it('POST', () => {
        //     cy.request('POST','https://practice.expandtesting.com/form-confirmation',{
        //         ContactName: 'dodo',
        //         contactnumber: '122-1233333',
        //         pickupdate: '2024-01-11',
        //         payment: 'cashondelivery'
        //     }).then((stat) => {
                
        //         expect(stat.status).to.be.equal(200)
        //         console.log(stat.status) // 200
        //     });
        // it('Enter valid Contact name', () => {
            
        // });

        // it('Enter valid Contact name', () => {
            
        // });
        
        

    
  