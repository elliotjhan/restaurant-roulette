export default class List {
  constructor() {
    this.categories = [];
    this.currentRestaurantList = [];
  }

  initializeList() {
    this.generateList();
    this.submitList();
  }

  generateList() {
    fetch("http://localhost:3001/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.insertList(data.categories);
      });
  }

  insertList(array) {
    let arrayLength = array.length;
    for (let i = 0; i < arrayLength; i++) {
      let current = array[i];
      if (current.parent_aliases.includes("restaurants")) {
        this.categories.push(current.alias);
        let option = document.createElement("option");
        option.innerHTML += current.alias;
        option.setAttribute("value", current.alias);
        option.setAttribute("class", "restaurantCategory");
        document.querySelector("#categories").appendChild(option);
      }
    }
  }

  submitList() {
    document
      .querySelector("#submit")
      .addEventListener("click", () => this.findRestaurant());
  }

  findRestaurant() {
    let categories = document.querySelector("#categories").value;
    let location = document.querySelector("#zipcode").value;
    if (!categories || !location) return null;
    if ((location + "").length !== 5) return null;
    fetch("http://localhost:3001/restaurants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categories,
        location,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.businesses) {
          this.displayRestaurants(data.businesses);
        } else if (data === "Bad Request") {
          alert("Please enter valid zipcode");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  displayRestaurants(list) {
    this.deleteRestaurantList();
    for (let i = 0; i < list.length; i++) {
      //loop to create list
      let element = document.createElement("div");
      element.setAttribute("class", "restaurantItem");
      element.innerHTML += list[i].name; //name of the restaurant
      this.currentRestaurantList.push(list[i]); //store names of current list for randomizer
      element.addEventListener("click", () => this.linkToURL(list[i].url));
      document.querySelector("#outputContainer").appendChild(element);
    }
    this.createRandomButton();
  }

  createRandomButton() {
    let button = document.createElement("button");
    button.setAttribute("id", "randomButton");
    button.setAttribute("class", "col-sm-1");
    button.innerHTML += "Pick For Me!";
    button.addEventListener("click", () => this.pickRestaurant());
    document.querySelector("#outputContainer").appendChild(button);
  }

  deleteRestaurantList() {
    let restaurantItems = document.getElementsByClassName("restaurantItem");
    //returns html collection which is different from an array, cannot use array methods
    if (restaurantItems[0]) {
      //conditional and loop to delete existing list
      while (restaurantItems.length > 0) {
        restaurantItems[0].parentNode.removeChild(restaurantItems[0]);
      }
    }
    let button = document.querySelector("#randomButton"); //code below checks and clears for already randomized restaurant
    let outputTitle = document.querySelector(".restaurantItemSelection");
    let outputImage = document.querySelector(".restaurantImage");
    if (button) button.remove();
    if (outputTitle) outputTitle.remove();
    if (outputImage) outputImage.remove();
  }

  pickRestaurant() {
    let rng = Math.floor(Math.random() * this.currentRestaurantList.length);
    let selection = this.currentRestaurantList[rng];
    this.deleteRestaurantList();
    let restaurantName = document.createElement("div");
    restaurantName.setAttribute(
      "class",
      "restaurantItemSelection col-12 text-start"
    );
    restaurantName.addEventListener("click", () =>
      this.linkToURL(selection.url)
    );
    restaurantName.innerHTML += selection.name; //name of the restaurant
    let restaurantImageContainer = document.createElement("div");
    restaurantImageContainer.setAttribute("class", "col-sm-12");
    let restaurantImage = document.createElement("img");
    restaurantImage.setAttribute("src", selection.image_url);
    restaurantImage.setAttribute("class", "restaurantImage pointer");
    restaurantImage.addEventListener("click", () =>
      this.linkToURL(selection.url)
    );
    document.querySelector("#outputContainer").appendChild(restaurantName);
    restaurantImageContainer.appendChild(restaurantImage);
    document
      .querySelector("#outputContainer")
      .appendChild(restaurantImageContainer);
  }

  linkToURL(url) {
    window.open(url, "_blank");
  }
}
