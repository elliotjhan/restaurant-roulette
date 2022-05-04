export default class List {
  constructor() {
    this.categories = []
    this.findRestaurant = this.findRestaurant.bind(this);
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
    fetch('http://localhost:3000/restaurants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        categories
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('restaurant data retrieved', data);

    })
  }
  //document.getElementsByClassName('testclass')[0].classList.add('testclass');
  //document.getElementById('testid').classList.add('testclass2');
}