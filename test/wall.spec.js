/**
 * @jest-environment jsdom
 */

 import { wall } from '../src/views/wall.js';

 jest.mock('../src/index.js');
 jest.mock('../src/firebase.js');

 describe ('wall', () =>{
    it('deberia mostrar el boton de publicar', () =>{
        document.body.appendChild(wall());
        const btnPostComment = document.querySelector('.post-btnpost');
        expect(btnPostComment instanceof HTMLElement).toBe(true);
    
    })
 })