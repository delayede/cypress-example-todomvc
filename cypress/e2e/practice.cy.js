beforeEach (function(){

cy.visit('/')

})

let ToDoLetters = 'qwerty';
let ToDoNumbers = '0123';
let ToDoMix = 'qwe0123.4!@#@$^&*';


describe('When ToDo page opened', () => {
    it('Todo title has red style', () => {
        cy.get('h1').should('have.css', 'color', 'rgb(184, 63, 69)' || '#b83f45')
    });
    
    it('Focus should fall on todo input field', () => {
        cy.focused().should('have.class', 'new-todo')
    });
    
    it('Todo input field should contain placeholder', () => {
        cy.get('input.new-todo').should('have.attr', 'placeholder', 'What needs to be done?')
    });

});


describe('Create multiple todos', () => {
    it('Create todo with letters,numbers,symbols', () => {
        cy.getTodoInput().type(ToDoLetters).type('{enter}')

        //check that text of first added toDo the same as entered
        cy.get('.todo-list li').
        eq(0).
        find('label').
        should('have.text', ToDoLetters)

        cy.getTodoInput().type(ToDoNumbers).type('{enter}')

        //check that text of second added toDo the same as entered
        cy.get('.todo-list li').
        eq(1).
        find('label').
        should('have.text', ToDoNumbers)

        cy.getTodoInput().type(ToDoMix).type('{enter}')
        
        //check that text of third added toDo the same as entered
        cy.get('.todo-list li').
        eq(2).
        find('label').
        should('have.text', ToDoMix)
    });
    
    it('Todo count increases with each added todo', () => {
        cy.getTodoInput().type(ToDoLetters).type('{enter}')
        cy.get('.todo-list li').should('have.length', 1)
        cy.get('.todo-count').
        find('strong').
        should('have.text', 1)

        cy.getTodoInput().type(ToDoLetters).type('{enter}')
        cy.get('.todo-list li').should('have.length', 2)
        cy.get('.todo-count').
        find('strong').
        should('have.text', 2)
    });

    it('Todo added to the end of the list', () => {
        cy.getTodoInput().type(ToDoLetters).type('{enter}')
        cy.getTodoInput().type(ToDoNumbers).type('{enter}')
        cy.get('.todo-list li').last().
        find('label').
        should('have.text', ToDoNumbers)
    });
   
    // it('Todo added by clicking outside of input field', () => {
    //     cy.getTodoInput().type(ToDoLetters).focus()
    //     cy.get('h1').click()
    //     cy.get('.todo-list li').should('have.length', 0)
    // });
    

    //NEGATIVE TEST CASE
    it('Unable to add empty todo', () => {
        cy.getTodoInput().type('{enter}')
        cy.get('.todoapp').should('not.contain', 'ul')
    });
    
});

describe('Delete Todos', () => {
    it('Delete just added todo ', () => {
        cy.createTodo(ToDoLetters)
        cy.get('.todo-list li button').last().invoke('show').click()
        cy.get('.todoapp div section').should('not.exist')
    });
    
    it('Todo moves up in the list after todo is deleted', () => {
        cy.createTodo(ToDoLetters)
        cy.createTodo(ToDoMix)
        cy.createTodo(ToDoNumbers)
        cy.get('.todo-list li button').eq(1).invoke('show').click()
        cy.get('.todo-list li label').eq(1).should('have.text', ToDoNumbers)
    });
    

    it('Todo count decreases with each deleted todo', () => {
        cy.createTodo(ToDoLetters)
        cy.createTodo(ToDoMix)
        cy.get('.todo-list li button').last().invoke('show').click()
        cy.get('.todo-count').
        find('strong').
        should('have.text', 1)
    });
    

    it('Delete Todo with ClearCompleted button', () => {
        cy.createTodo(ToDoLetters)
        cy.createTodo(ToDoMix)
        cy.get('.todo-list li .toggle').last().click()
        cy.get('.footer button.clear-completed').click()
        cy.get('.todo-list li').should('have.length', 1)
    });
   
    it('Delete all todos with ClearCompleted button', () => {
        cy.createTodo(ToDoLetters)
        cy.createTodo(ToDoMix)
        cy.get('#toggle-all').click()
        cy.get('.footer button.clear-completed').click()
        cy.get('.todoapp div section').should('not.exist')


    it('Delete completed todo while editing', () => {
        
    });
    

    });
  
    
    describe('Edit todos', () => {
        it('Editing canceled by pressing ESC', () => {
            cy.createTodo(ToDoLetters)
            cy.get('.todo-list li')
            .dblclick()
            .type('qwerty')
            .type('{esc}')
            cy.get('.todo-list li').should('have.text', ToDoLetters)
            
        });

        it('Edit todo', () => {
            cy.createTodo(ToDoLetters)
            cy.get('.todo-list li')
            .dblclick()
            .type('qwerty{enter}')
            .should('have.text', ToDoLetters +'qwerty')

        });

        it('To do is deleted if edited to empty string', () => {
            cy.createTodo(ToDoLetters)
            cy.get('.todo-list li')
            .dblclick()
            .type('{selectall}{backspace}{enter}')
            cy.get('.todoapp div section').should('not.exist')
        });
        
        it('Delete and toggle buttons removed when editing todo', () => {
        
            cy.createTodo(ToDoLetters).as('Todo')
            cy.get('@Todo').dblclick()
            cy.get('@Todo').find('.toggle').should('not.be.visible')
            cy.get('@Todo').find('button').should('not.be.visible')
    
        });

    describe('filters', () => {
   

        it('Completed todos are crossed out and checked', () => {
               
            cy.createDefaultTodos().as('Todos')
            cy.get('#toggle-all').click()
            cy.get('@Todos').find('input[type="checkbox"]').should('be.checked')
            cy.get('@Todos').find('input[type="checkbox"]').should('be.checked')
            cy.get('section.main ul.todo-list li').should('have.class', 'completed')
                   
        });

        //Try to compare text of created and then todo that was filtered
        it('Filter todos by completed', () => {
            cy.createDefaultTodos().as('Todos')
            cy.get('#toggle-all').click()
            cy.get('@Todos').eq(1).find('input.toggle').click()
            cy.get('.filters >li').contains('Completed').click()
            cy.get('.filters >li').contains('Completed').should('have.class', 'selected')
            cy.get('@Todos').should('have.length', 2)
         });
    
        it('Filter todos by completed', () => {
            cy.createDefaultTodos().as('Todos')
            cy.get('#toggle-all').click()
            cy.get('@Todos').eq(1).find('input.toggle').click()
            cy.get('.filters >li').contains('Active').click()
            cy.get('@Todos').should('have.length', 1)
            
    
        });

        it('Toggle all todos', () => {
            cy.createDefaultTodos().as('Todos')
            cy.get('@Todos').find('input.toggle').eq(1).click()
            cy.get('#toggle-all').click()
            cy.get('@Todos').filter('.completed').should('have.length', 3)
            
    
    });
        

    });
    


        // Filter
        //Mark todos as completed
        //Edit completed todo
        //Mark todos as compelted while Active filter applied
        //Add todo while completed filter enabled
        //unmark todo while completed filter enabled
        
    });
    


})

    

