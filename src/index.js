let pups = []
let filterOn = false

const filterButton = document.querySelector("#good-dog-filter")
filterButton.addEventListener("click", () => {
  filterOn = !filterOn
  if (filterOn) {
    filterButton.innerText = "Filter good dogs: On"
  } else {
    filterButton.innerText = "Filter good dogs: OFF"
  }

  const filteredPups = pups.filter(pup => {
    if (filterOn) {
      return pup.isGoodDog
    } else {
      return true
    }
  })

  let pupsList = document.querySelector("#dog-bar")
  pupsList.innerHTML = ""
  displayPups(filteredPups)
})


fetch(`http://localhost:3000/pups`)
    .then(r => r.json())
    .then(pupsArray => {
        pups = pupsArray
        displayPups(pupsArray)
    })

function displayPups(pupsArray) {
    const dogBar = document.getElementById('dog-bar');
    pupsArray.forEach(pup => {
      const span = document.createElement('span');
      span.innerHTML = pup.name;
      dogBar.appendChild(span);

      span.addEventListener('click', () => {
        const dogInfo = document.getElementById('dog-info');
        dogInfo.innerHTML = `<img src=${pup.image}><h2>${pup.name}</h2><button>${pup.isGoodDog} Dog!</button>`

        const button = dogInfo.querySelector('button')

        if (pup.isGoodDog === true) {
            button.innerHTML = 'Good Dog!'
        } else {
            button.innerHTML = 'Bad Dog!'
        }

        button.addEventListener('click', () => {
            pup.isGoodDog = !pup.isGoodDog
            const toggle = {isGoodDog: pup.isGoodDog}
       
        fetch(`http://localhost:3000/pups/${pup.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(toggle)
        })
            .then(r => r.json())
            .then(togglePup => {
                if (togglePup.isGoodDog === true) {
                    button.innerHTML = 'Good Dog!'
                } else {
                    button.innerHTML = 'Bad Dog!'
                }
            })

        })
       
    })
    })
 
}

//https://mkhan11417.medium.com/solving-the-woof-woof-javascript-challenge-3a3c302719a8


