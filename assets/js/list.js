export default class List {
  constructor() {
    this.categories = []
  }

  generateList() {
    fetch('http://127.0.0.1:3000/yelp', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })    
    .then(response => response.json())
    .then(data => {
      console.log('data successfully retrieved', data);
      this.insertList(data.categories);
    })
  }

  insertList(array) {
    let arrayLength = array.length;
    for(let i = 0; i < arrayLength; i++) {
      let current = array[i];
      if(current.parent_aliases.includes('restaurants')) {
        this.categories.push(current.alias);
        let option = document.createElement('option');
        option.innerHTML += current.alias;
        document.querySelector('#categories').appendChild(option);
      }
    }

    //document.getElementsByClassName('testclass')[0].classList.add('testclass');
    //document.getElementById('testid').classList.add('testclass2');
  }
}