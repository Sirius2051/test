const public_key = '402f677a892f7dabf4bc9276f16ac2a5';
const private_key = 'c9f215ffe1d1de1c26e1fa2501151ac82e4d75ea';
let offset = 0; // Offset inicial

const getData = async (url, offset = 0) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const hash = md5(timestamp + private_key + public_key);

  const response = await fetch(`${url}?ts=${timestamp}&apikey=${public_key}&hash=${hash}&offset=${offset}`);
  const data = await response.json();
  return data;
}

function addData(data, type) {
  const dataContainer = document.getElementById('data');
  dataContainer.innerHTML = ""; // Limpia el contenedor
  if (type == 'characters') {
    data.forEach(item => {
      dataContainer.innerHTML += `
        <div class="card">
          <h2 class="name">${item.name}</h2>
          <img class="image" src="${item.thumbnail.path}.${item.thumbnail.extension}">
          <p class="description">${item.description}</p>
        </div>
      `;
    });
  }
  else if (type ='comics') {
    data.forEach(item => {
      dataContainer.innerHTML += `
        <div class="card">
          <h2 class="name">${item.name}</h2>
          <img class="image" src="${item.thumbnail.path}.${item.thumbnail.extension}">
          <p class="description">${item.description}</p>
        </div>
      `;
    });
  }
}


const personajes = 'https://gateway.marvel.com/v1/public/characters';
const comics = 'https://gateway.marvel.com/v1/public/comics';
// Botones de paginación
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');




// Inicializar con la primera carga de datos
getData(personajes)
  .then(response => {
    console.log(response.data.results);
    addData(response.data.results, 'characters');

    prevButton.onclick = () => {
      if (offset > 0) offset -= 20; // Retrocede 20
      getData(personajes, offset)
        .then(response => {
          console.log(response.data.results);
          addData(response.data.results, 'characters');
        });
    };
    
    nextButton.onclick = () => {
      offset += 20; // Avanza 20
      getData(personajes, offset)
        .then(response => {
          console.log(response.data.results);
          addData(response.data.results, 'characters');
        });
    };
  });


  getData(comics)
  .then(response => {
    console.log(response.data.results);
    addData(response.data.results);

    prevButton.onclick = () => {
      if (offset > 0) offset -= 20; // Retrocede 20
      getData(comics, offset)
        .then(response => {
          console.log(response.data.results);
          addData(response.data.results);
        });
    };
    
    nextButton.onclick = () => {
      offset += 20; // Avanza 20
      getData(comics, offset)
        .then(response => {
          console.log(response.data.results);
          addData(response.data.results);
        });
    };
  });
