before(() => {
  cy.createSession();
});

describe('Create /player/stat', () => {
  it('should respond 404 for non-exist name', () => {
    cy.request({
      method: 'POST',
      url: '/api/web/player/stat',
      body: {
        name: 'undefined undefined',
        game_date: '2024-05-06',
        game_away_abbr: 'HOU',
        game_home_abbr: 'MEM',
        assist: 20,
        hit: 5,
        steal: 6,
        rebound: 25,
        free_throw: 3,
        score: 24,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('should respond 404 for non-exist game_date', () => {
    cy.request({
      method: 'POST',
      url: '/api/web/player/stat',
      body: {
        name: 'Precious Achiuwa',
        game_date: '0001-01-01',
        game_away_abbr: 'HOU',
        game_home_abbr: 'MEM',
        assist: 20,
        hit: 5,
        steal: 6,
        rebound: 25,
        free_throw: 3,
        score: 24,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('should respond 404 for non-exist game_date', () => {
    cy.request({
      method: 'POST',
      url: '/api/web/player/stat',
      body: {
        name: 'Precious Achiuwa',
        game_date: '0001-01-01',
        game_away_abbr: 'HOU',
        game_home_abbr: 'MEM',
        assist: 20,
        hit: 5,
        steal: 6,
        rebound: 25,
        free_throw: 3,
        score: 24,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});

before(() => {
  cy.createSession();
});
