describe("Hacker Stories", () => {
  beforeEach(() => {
    cy.fixture("stories")
      .then(hits => {
        cy.server();
        cy.route({
          method: "GET",
          url: "**/search?query=React&page=0",
          response: hits
        }).as("get-stories");
    });

    cy.visit("/");

    cy.wait("@get-stories")
      .should("have.property", "status", 200);
  });

  it("shows two mocked stories in the list", () => {
    cy.get(".item").should("have.length", 2);

    cy.get(".item")
      .first()
      .should("contain", "React")
      .and("contain", "Jordan Walke");

    cy.get(".item")
      .last()
      .should("contain", "Redux")
      .and("contain", "Dan Abramov, Andrew Clark");
  });

  it("shows only one item after clicking the action button of one of them", () => {
    cy.get(".button-small")
      .first()
      .click();

    cy.get(".item").should("have.length", 1);
  });

  it("shows no item after clicking the action button of both of them", () => {
    cy.get(".button-small")
      .first()
      .click();
    cy.get(".button-small")
      .click();

    cy.get(".item").should("not.exist");
  });
});
