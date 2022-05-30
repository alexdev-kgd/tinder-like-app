describe('Choice Card', () => {
  it('Like Button', () => {
    cy.visit('/');
  
    let arr = Array.from({length:3})

    cy.wrap(arr).each((index) => {
      cy.get('[data-testid="like-btn"]').first().click();
      cy.get('[data-testid="overlay"]').find('p').should('have.text', 'You got match!')
      cy.get('[data-testid="ok-btn"]').first().click();
    })
  })

  it('Disike Button', () => {
    cy.visit('/')

    let arr = Array.from({length:3})

    cy.wrap(arr).each((index) => {
      cy.get('[data-testid="dislike-btn"]').first().click();
    });

    cy.get('[data-testid="overlay"]').find('p').should('have.text', 'There are no more items!')
  })
})
