describe('Read', () => {
  it('should respond 200 and "Pong!"', () => {
    cy.request({
      method: 'GET',
      url: '/api/web/ping',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.a('string');
    });
  });
});
