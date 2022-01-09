import {authorArrayToString} from '../components/BookCard';
import {expect} from '@jest/globals';

describe('Author Array to String', function () {
    it('should return an empty string from an empty array', function () {
        const authors: string[] = [];
        expect(authorArrayToString(authors)).toEqual('');
    });

    it('should return the one author from a single-item array', function () {
        const authors: string[] = ['A'];
        expect(authorArrayToString(authors)).toEqual('A');
    });

    it('should place an ampersand between two authors', function () {
        const authors: string[] = ['A', 'B'];
        expect(authorArrayToString(authors)).toEqual('A & B');
    });

    it('should place commas between more than two authors, plus an ampersand', function () {
        const authors: string[] = ['A', 'B', 'C'];
        expect(authorArrayToString(authors)).toEqual('A, B, & C');
    });
});