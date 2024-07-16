import { myCrypto } from './data';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-KEY': 'lCtprjbZMc47Qp+t37OVPDJTbrhkYjEvCRwndZbnmGg='
  }
};

export function fetchAllCrypto() {
  return fetch('https://openapiv1.coinstats.app/coins', options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      return data; 
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

export function fetchMyCrypto() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(myCrypto)
    }, 1000)
  })
}
