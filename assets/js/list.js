export default class List {
  constructor() {
    
  }

  generateList() {
    fetch('https://api.yelp.com/v3/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer w6a5yOrFUI42Y7kKdWDZvCT-SSIQmRTusNSK08EOZBE7TduWBjDCji0jMnM9Gz5KAcm9BM-HY5_Q7hoKHJgWtaeyhM9gi0y87g389yLJ3FC5GxAV1neaeTTVa7BtYnYx'
      }
    })
      .then(response => response.text())
      .then(data => console.log(data))
  
  }

  insertList() {
    //document.getElementsByClassName('testclass')[0].classList.add('testclass');
    document.getElementById('testid').classList.add('testclass2');
  }
}