// POST   http://localhost:2053/companies       {name: 'Dishoom', logoURL: '//dishoom.com/assets/logo.png'}
// GET    http://localhost:2053/company/1       
// GET    http://localhost:2053/companies
// POST   http://localhost:2053/restaurants/1   {location: 'Shoreditch', capacity: 80, manager: 'John Doe'}
// POST   http://localhost:2053/menus/1         {title: 'All Day'}
// GET    http://localhost:2053/menus/1         
// DELETE http://localhost:2053/company/1
// POST   http://localhost:2053/meals/1         {name: 'Salmon'}
// GET    http://localhost:2053/meals/1
// PATCH  http://localhost:2053/company/1       {newName: 'Johns Restaurant'. newLogoURL: '//johns.com/assets/logo.svg'}




// POST   https://playground.nanode.one/companies       {name: 'Dishoom', logoURL: '//dishoom.com/assets/logo.png'}
// GET    https://playground.nanode.one/company/1       
// GET    https://playground.nanode.one/companies
// POST   https://playground.nanode.one/restaurants/1   {location: 'Shoreditch', capacity: 80, manager: 'John Doe'}
// POST   https://playground.nanode.one/menus/1         {title: 'All Day'}
// GET    https://playground.nanode.one/menus/1         
// DELETE https://playground.nanode.one/company/1
// POST   https://playground.nanode.one/meals/1         {name: 'Salmon'}
// GET    https://playground.nanode.one/meals/1
// PATCH  https://playground.nanode.one/company/1       {newName: 'Johns Restaurant'. newLogoURL: '//johns.com/assets/logo.svg'}





// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// async function APIFetch(url, method, data) {
//   return await fetch(`http://localhost:2053`, {
//     method,
//     body: data
//   })
// }

// const run = async() => {
//   let company = await APIFetch('/companies', 'POST', {name: 'Dishoom', logoURL: '//dishoom.com/assets/logo.png'})
//   console.log(company);
// }


// module.exports = {run};