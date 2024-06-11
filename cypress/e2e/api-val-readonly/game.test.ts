describe('Read', () => {
  it('should respond 200 and an array with 3 items', () => {
    const params = new URLSearchParams({
      page_offset: '0',
      page_length: '3',
      sort_field: 'date',
      sort_order: 'descending',
    });
    cy.request({
      method: 'GET',
      url: `/api/web/games?${params}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length(3);
    });
  });
});

describe('Create', () => {
  it('should respond 401', () => {
    cy.request({
      method: 'POST',
      url: '/api/web/game',
      body: {},
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});

describe('Update', () => {
  it('should respond 401', () => {
    cy.request({
      method: 'PATCH',
      url: '/api/web/games/1/teams/1',
      body: {},
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});