
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
    
});