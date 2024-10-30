describe('오더를 테스트 한다.', () => {
  it('사용자는 딜리버리/픽업 중 원하는 유형을 선택할 수 있다.', () => {
    cy.visit("/")

    cy.get("[data-cy=deliveryBtn]").should("be.visible").as("deliveryBtn")
    cy.get("[data-cy=pickupBtn]").should("be.visible").as("pickupBtn")

    cy.get("@deliveryBtn").click()
    cy.url().should("include", "/food-type")

  })
})