import { App } from '@/spa/App';

beforeEach(() => {
  window.history.pushState({}, '', '/app');
});

describe('App', () => {
  it('Mount App without errors', () => {
    cy.mount(<App />);
    setTimeout(function(){
        cy.get("[data-test='login-page-heading']").should('contain.text', 'Log In');
    }, 5000);
    
  });
});
