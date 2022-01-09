import BookCard from "./BookCard";
import {mount} from "@cypress/react";
import {ReactNode} from "react";

interface BookCardNodeParameters {
    mainAuthors?: string[];
    withAuthors?: string[];
    recommendingUsers?: string[];
    wishingUsers?: string[];
    userId?: string;
}

function BuildBookCardNode({
                               mainAuthors,
                               withAuthors,
                               recommendingUsers,
                               wishingUsers,
                               userId
                           }: BookCardNodeParameters): ReactNode {
    return <BookCard id="" title="" slug="" subtitle="" mains={mainAuthors?.map(author => ({name: author})) ?? []}
                     withs={withAuthors?.map(author => ({name: author})) ?? []} coverImageUrl=""
                     recommendations={recommendingUsers?.length ?? 0}
                     allRecommenders={recommendingUsers?.map(author => ({userId: author})) ?? []}
                     wished={wishingUsers?.length ?? 0}
                     allWishers={wishingUsers?.map(author => ({userId: author})) ?? []} userId={userId ?? ''}/>;
}

it('BookCard with empty fields renders appropriately', () => {
    mount(BuildBookCardNode({}));
    cy.get('[aria-label="Book author"]').should('be.empty');
});
describe('Render author names correctly', () => {
    it('Single author text', () => {
        const mainAuthors = ['Person'];
        mount(BuildBookCardNode({mainAuthors}));
        cy.get('[aria-label="Book author"]').should('have.text', 'by Person');
    });

    it('Single author with single "with" author text', () => {
        const mainAuthors = ['Person A'];
        const withAuthors = ['Person B'];
        mount(BuildBookCardNode({mainAuthors, withAuthors}));
        cy.get('[aria-label="Book author"]').should('have.text', 'by Person A with Person B');
    });
});

describe('Checking the recommend button text', function () {
    it('should be a call to action when logged in', () => {
        mount(BuildBookCardNode({userId: 'a'}));
        cy.get('[aria-label="Recommend button"]').should('contain.text', 'Recommend');
    });
    it('should not be a button when not logged in', () => {
        mount(BuildBookCardNode({recommendingUsers: ['b']}));
        cy.get('[aria-label="Recommend button"]').should('not.exist');
    });
    it('should be celebratory when the logged in user has already recommended it', () => {
        mount(BuildBookCardNode({recommendingUsers: ['c'], userId: 'c'}));
        cy.get('[aria-label="Recommend button"]').should('contain.text', 'Recommended!');
    });
});