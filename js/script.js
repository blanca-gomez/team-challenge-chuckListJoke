
const buttonjoke = document.getElementById('fetchJoke');
const jokeContainer = document.getElementById('jokeList');

const endpoint = 'https://api.chucknorris.io/jokes/random';

let chuckNorrisJokes = [];

//evento de click obtener chiste
buttonjoke.addEventListener('click', getJoke);

//función para obtener chiste
function getJoke(){
    fetch(endpoint)
        .then((res) => res.json())
        .then((data) => {
            const joke = data.value; 
            chuckNorrisJokes.push(joke);
            renderJokes();
            saveJoke();
            listJoke();
        })
        .catch(error => console.log('Error en la solicitud', error));
}

//función para renderizar la lista
function renderJokes (){
    jokeContainer.innerHTML= '';
    chuckNorrisJokes.forEach((joke, index) =>{
        const jokeelement = document.createElement('li');
        jokeelement.textContent = joke;
        jokeContainer.appendChild(jokeelement); 

        const deleteButton = document.createElement('button');
        deleteButton.innerText ='Eliminar';
        deleteButton.classList = 'deleteButton'
        deleteButton.addEventListener('click', () => deleteJoke (index))
        jokeContainer.appendChild(deleteButton);
    })    
}


//guardar la lista de chiste en localStorage
function saveJoke(){
    localStorage.setItem('chuckNorrisJokes', JSON.stringify(chuckNorrisJokes))
}

//función para cargar la lista de chistes desde localStorage
function listJoke(){
    const data = localStorage.getItem('chuckNorrisJokes');
    if (data) chuckNorrisJokes = JSON.parse(data)
}

function deleteJoke (index){
    chuckNorrisJokes.splice(index,1);
    renderJokes();
    saveJoke();
}