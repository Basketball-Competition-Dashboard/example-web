describe('Read', () => {
  it('should respond 200 and an array', () => {
    const params = new URLSearchParams({
      page_offset: '0',
      page_length: '3',
      sort_field: 'name',
      sort_order: 'descending',
    });
    cy.request({
      method: 'GET',
      url: `/api/web/players/stats?${params}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });
});

describe('Create', () => {
  it('should respond 401', () => {
    cy.request({
      method: 'POST',
      url: '/api/web/player/stat',
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
      url: '/api/web/players/1/stats/1',
      body: {},
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});

describe('Delete', () => {
  it('should respond 401', () => {
    cy.request({
      method: 'DELETE',
      url: '/api/web/players/1/stats/1',
      body: {},
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});
