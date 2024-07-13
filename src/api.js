import { cryptoData, myCrypto } from './data'

export function fakeFetchAllCrypto() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoData)
    }, 1)
  })
}

export function fetchMyCrypto() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(myCrypto)
    }, 1)
  })
}
