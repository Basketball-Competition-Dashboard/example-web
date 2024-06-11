describe('GET', () => {
  it('should return 200 and "Pong!"', () => {
    cy.request('GET', '/api/web/ping').then((response) => {
      expect(response.status).to.eq(200);
      expect(typeof response.body).to.eq('string');
    });
  });
});
