describe('Login', () => {
  it('should respond 400', () => {
    cy.request({
      method: 'POST',
      url: '/api/web/auth/session',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('should respond 404', () => {
    cy.request({
      method: 'POST',
      url: '/api/web/auth/session',
      body: {
        name: '',
        credential: '',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});

describe('Logout', () => {
  it('should respond 401', () => {
    cy.request({
      method: 'DELETE',
      url: '/api/web/auth/session',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});
