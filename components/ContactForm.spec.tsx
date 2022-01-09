import ContactForm from './ContactForm';
import {mount} from '@cypress/react';

it('should require a book title and author', () => {
    mount(<ContactForm/>)
    cy.get('input:invalid').should('have.length', 2);
    cy.get('#title').type('title');
    cy.get('input:invalid').should('have.length', 1);
    cy.get('#author').type('author');
    cy.get('input:invalid').should('have.length', 0);
});