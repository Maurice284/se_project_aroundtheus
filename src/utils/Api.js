class Api {
  constructor() {}
  getCardList() {
    fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "9be0dbf9-27c2-4836-ae55-e53d3f0122ee",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  }
}
export default Api;
