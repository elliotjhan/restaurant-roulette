export default class List {
  constructor() {
    this.categories = [];
    this.currentRestaurantList = [];
    this.findRestaurant = this.findRestaurant.bind(this);
    this.pickRestaurant = this.pickRestaurant.bind(this);
  }

  initializeList() {
    this.generateList();
    this.submitList();
  }

  generateList() {
    fetch('http://localhost:3000/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })    
    .then(response => response.json())
    .then(data => {
      console.log('category data successfully retrieved', data);
      this.insertList(data.categories);
    })
  }

  insertList(array) {
    let arrayLength = array.length;;
    for(let i = 0; i < arrayLength; i++) {
      let current = array[i];
      if(current.parent_aliases.includes('restaurants')) {
        this.categories.push(current.alias);
        let option = document.createElement('option');
        option.innerHTML += current.alias;
        option.setAttribute("value", current.alias);
        document.querySelector('#categories').appendChild(option);
      }
    }
  }
  
  submitList() {
    document.querySelector('#submit').addEventListener('click', this.findRestaurant);
  }

  findRestaurant() {
    let categories = document.querySelector('#categories').value;
    let location = document.querySelector('#zipcode').value;
    fetch('http://localhost:3000/restaurants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        categories,
        location
      })
    })
    .then(response => response.json())
    .then(data => {
      if(data.businesses) this.displayRestaurants(data.businesses);
    })
  }

  displayRestaurants(list) {
    this.deleteRestaurantList();
    for(let i = 0; i < list.length; i++) { //loop to create list
      let element = document.createElement('div');
      element.setAttribute('class', 'restaurantItem');
      element.innerHTML += list[i].name; //name of the restaurant
      this.currentRestaurantList.push(list[i].name); //store names of current list for randomizer
      document.querySelector('#outputContainer').appendChild(element);
    }
    let button = document.createElement('button');
    button.setAttribute('id', 'randomButton');
    button.innerHTML += 'random';
    button.addEventListener('click', this.pickRestaurant);
    document.querySelector('#outputContainer').appendChild(button);
  }

  deleteRestaurantList() {
    let restaurantItems = document.getElementsByClassName('restaurantItem');
    //returns html collection which is different from an array
    //so forEach would not work
    if(restaurantItems[0]) { //conditional and loop to delete existing list
      while(restaurantItems.length > 0) {
        restaurantItems[0].parentNode.removeChild(restaurantItems[0]);
      }
      document.querySelector('#randomButton').remove();
    }
  }

  pickRestaurant() {
    let rng = Math.floor(Math.random() * this.currentRestaurantList.length);
    let selection = this.currentRestaurantList[rng];
    this.deleteRestaurantList();
    let element = document.createElement('div');
    element.setAttribute('class', 'restaurantItem');
    element.innerHTML += selection; //name of the restaurant
    document.querySelector('#outputContainer').appendChild(element);
  }

}