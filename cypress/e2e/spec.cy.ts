const mockGameRounds = [
  { value: 'a', userCorrect: null },
  { value: 'b', userCorrect: null },
  { value: 'c', userCorrect: null },
  { value: 'd', userCorrect: null },
  { value: 'c', userCorrect: null },
];

describe('N-Back Game', () => {
  // it('starts the game', () => {
  //   cy.stub(GameSetup, 'gameSetup').returns(mockGameRounds);

  //   cy.visit('/gameplay');
  // });

  it('User enters name and gives two incorrect answers', () => {
    cy.clock();

    cy.visit('/');
    cy.get('a').contains('Enter a username').click();

    // Enter Username
    cy.get('input').type('John Doe');
    cy.get('button').contains('Enter').click();

    // Takes user to Homepage displaying Welcome message
    cy.get('p').contains('Welcome back John Doe');

    // Takes user to the game page
    cy.get('a').contains('Lets Play!').click();

    // Starts the game
    cy.get('p').contains('Get Ready').should('be.visible');
    cy.get('div').contains('2').should('be.visible');
    cy.tick(2500);
    cy.get('p').contains('Get Ready').should('be.visible');
    cy.get('div').contains('1').should('be.visible');

    // Select Two Incorrect
    cy.tick(2500);
    cy.get('p').contains('Round 1');
    cy.get('button').contains('Select').click();
    cy.tick(2500);
    cy.get('p').contains('Round 2');
    cy.get('button').contains('Select').click();
    cy.tick(2500);

    // Game Ends
    cy.get('h1').contains('Game Over').should('be.visible');
  });

  it('User enters name and gets all answers correct', () => {
    cy.clock();

    cy.visit('/');
    cy.get('a').contains('Enter a username').click();

    // Enter Username
    cy.get('input').type('John Doe');
    cy.get('button').contains('Enter').click();

    // Takes user to Homepage displaying Welcome message
    cy.get('p').contains('Welcome back John Doe');

    // Takes user to the game page
    cy.get('a').contains('Lets Play!').click();

    // Starts the game
    cy.get('p').contains('Get Ready').should('be.visible');
    cy.get('div').contains('2').should('be.visible');
    cy.tick(2500);
    cy.get('p').contains('Get Ready').should('be.visible');
    cy.get('div').contains('1').should('be.visible');

    // Selects correct answers
    cy.tick(2500);
    cy.get('p').contains('Round 1');
    cy.tick(2500);
    cy.get('p').contains('Round 2');
    cy.tick(2500);
    cy.get('p').contains('Round 3');
    cy.get('button').contains('Select').click();
    cy.tick(2500);

    // Game Ends
    cy.get('h1').contains('Game Over').should('be.visible');
  });

  it('Complete run through of app', () => {
    cy.clock();

    cy.visit('/');
    cy.get('a').contains('Enter a username').click();

    // Enter Username
    cy.get('input').type('John Doe');
    cy.get('button').contains('Enter').click();

    // Takes user to Homepage displaying Welcome message
    cy.get('p').contains('Welcome back John Doe');

    // Takes user to the game page
    cy.get('a').contains('Lets Play!').click();

    // Starts the game
    cy.get('p').contains('Get Ready').should('be.visible');
    cy.get('div').contains('2').should('be.visible');
    cy.tick(2500);
    cy.get('p').contains('Get Ready').should('be.visible');
    cy.get('div').contains('1').should('be.visible');

    // Select Two Incorrect
    cy.tick(2500);
    cy.get('p').contains('Round 1');
    cy.get('button').contains('Select').click();
    cy.tick(2500);
    cy.get('p').contains('Round 2');
    cy.get('button').contains('Select').click();
    cy.tick(2500);

    // Game Ends
    cy.get('h1').contains('Game Over').should('be.visible');
    cy.get('p').contains('You got 0 correct and 2 wrong').should('be.visible');
    cy.get('p').contains("That's a 0% success rate!").should('be.visible');

    // Enter New Username
    cy.get('a').contains('Enter new User').click();

    // Enter Username
    cy.get('input').type('Jane Doe');
    cy.get('button').contains('Enter').click();

    // Takes user to Homepage displaying Welcome message
    cy.get('p').contains('Welcome back Jane Doe');

    // Rename User
    cy.get('a').contains('Not you?').click();

    // Enter Username
    cy.get('input').type('John Smith');
    cy.get('button').contains('Enter').click();

    // Takes user to the game page
    cy.get('a').contains('Lets Play!').click();

    // Starts the game
    cy.get('p').contains('Get Ready').should('be.visible');
    cy.get('div').contains('2').should('be.visible');
    cy.tick(2500);
    cy.get('p').contains('Get Ready').should('be.visible');
    cy.get('div').contains('1').should('be.visible');

    // Selects correct answers
    cy.tick(2500);
    cy.get('p').contains('Round 1');
    cy.tick(2500);
    cy.get('p').contains('Round 2');
    cy.tick(2500);
    cy.get('p').contains('Round 3');
    cy.get('button').contains('Select').click();
    cy.tick(2500);

    // Game Ends
    cy.get('h1').contains('Game Over').should('be.visible');
    cy.get('p').contains('You got 3 correct and 0 wrong').should('be.visible');
    cy.get('p').contains("That's a 100% success rate!").should('be.visible');
  });
});
