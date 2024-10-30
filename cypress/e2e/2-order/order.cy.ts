describe('오더를 테스트 한다.', () => {
  it('사용자는 딜리버리/픽업 중 원하는 유형을 선택할 수 있다.', () => {
    cy.visit("/")

    cy.get("[data-cy=deliveryBtn]").should("be.visible").as("deliveryBtn")
    cy.get("[data-cy=pickupBtn]").should("be.visible").as("pickupBtn")

    cy.get("@deliveryBtn").click()
    cy.url().should("include", "/food-type")

  })

  it("사용자는 음식 종류를 선택할 수 있다", () => {
    cy.visit("/food-type");

    cy.intercept(
      {
        method: "GET",
        url: "/restaurant/food-type",
      },
      [
        {
          id: 1,
          name: "Pizza",
          icon: "https://kr.object.ncloudstorage.com/icons/ic-pizza.png",
        },
        {
          id: 2,
          name: "Thai",
          icon: "https://kr.object.ncloudstorage.com/icons/ic-asian.png",
        },
        {
          id: 3,
          name: "Burger",
          icon: "https://kr.object.ncloudstorage.com/icons/ic-burger.png",
        },
        {
          id: 4,
          name: "Dessert",
          icon: "https://kr.object.ncloudstorage.com/icons/ic-cake.png",
        },
        {
          id: 5,
          name: "Chicken",
          icon: "https://kr.object.ncloudstorage.com/icons/ic-chicken.png",
        },
        {
          id: 6,
          name: "Stew",
          icon: "https://kr.object.ncloudstorage.com/icons/ic-hotpot.png",
        },
        {
          id: 7,
          name: "Meet",
          icon: "https://kr.object.ncloudstorage.com/icons/ic-meat.png",
        },
        {
          id: 8,
          name: "Chinese",
          icon: "https://kr.object.ncloudstorage.com/icons/ic-noodle.png",
        },
        {
          id: 9,
          name: "Salad",
          icon: "https://kr.object.ncloudstorage.com/icons/ic-salad.png",
        },
      ]
    );

    cy.get("[data-cy=1]").should("be.visible").as("pizzaBtn");
    cy.get("@pizzaBtn").click();

    cy.url().should("include", "/food-type/1");
  });

  it("사용자는 원하는 레스토랑을 선택할 수 있다", () => {
    cy.visit("/food-type/1");
    cy.intercept(
      {
        method: "GET",
        url: "/restaurant/food-type/1",
      },
      {
        fixture: "restaurant-list.json",
      }
    );

    // fixture 사용
    cy.fixture("restaurant-list.json").then((restaurantList) => {
      cy.get(`[data-cy=${restaurantList[0].id}]`)
        .should("be.visible")
        .as("restaurantBtn");
      cy.get("@restaurantBtn").click();

      cy.url().should("include", "/restaurant/1");
    });
  });
})