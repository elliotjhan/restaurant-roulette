export default class List {
  constructor() {
    
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
    })
  
  }

  insertList() {
    //document.getElementsByClassName('testclass')[0].classList.add('testclass');
    document.getElementById('testid').classList.add('testclass2');
  }
}