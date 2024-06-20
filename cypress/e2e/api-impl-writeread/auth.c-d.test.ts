describe('Create, Delete /auth/session', () => {
  it('session ID should exist after creating', () => {
    cy.getCookie('session_id').should('not.exist');
    cy.createSession();
    cy.getCookie('session_id').should('exist');
  });
  it('session ID should not exist after deleting', () => {
    cy.getCookie('session_id').should('exist');
    cy.deleteSession();
    cy.getCookie('session_id').should('not.exist');
  });
});
