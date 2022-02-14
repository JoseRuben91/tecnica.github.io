
async function fetchRover() {
  try {
    //Petición a la API de la nasa para conocer los datos del rover Curiosity
    const response = await axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity?api_key=zA6lqZWflc9FE2YwBrE0AxaMaRu7OFzzhlktodkg');
    //console.log(`GET: Datos del rover`, response.data);
    //Hacer que la función regrese los datos del rover obtenidos de la petición a la API para poderlos utilizar
    return response.data.rover;
  } catch (errors) {
    console.error(errors);
  }
};

//representación de la función asíncrona que ejecutara el código contenido dentro de la función.

async function fetchNasa(maxSol) {
  try {
    
     const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${maxSol}&api_key=zA6lqZWflc9FE2YwBrE0AxaMaRu7OFzzhlktodkg&page=1`);
    //especifica el valor para ser devuelto quien llama a la función.
    return response.data.photos;
  } catch (errors) {
    console.error(errors);
  }
};

var row = document.querySelector('.row');

//await provoca que la ejecución sea pausada hasta que sea terminada o rechazada
async function mostrarFoto() {
  const datosRover = await fetchRover();
  console.log(datosRover.name);
  console.log(datosRover.max_sol.toString());
  const maxSol = datosRover.max_sol;
  var solesRover = document.getElementById('datos-rover');//seleccionara el elemento datos-rover para contar los dias 
  solesRover.setAttribute('class', 'datos-rover')
  solesRover.innerHTML = `El rover ${datosRover.name} lleva ${datosRover.max_sol.toString()} en Marte <br><br> 
                          En seguida se muestran algunas imágenes tomadas durante el último sol`
  const arregloFotos = await fetchNasa(maxSol);
  console.log(arregloFotos);
  //ciclo ford para contar las fotos a mostrar dentro de nuestro arregloFotos donde se guardaran.
  for (var i = 0; i < arregloFotos.length; i++) {
    //Creación del contenedor de la tarjeta
    var col = document.createElement('div');
    col.setAttribute('class', "col-md-4 mt-5");
    row.appendChild(col);
    //inserccion del nodo card
    var card = document.createElement('div');
    card.setAttribute('class', "card");
    col.appendChild(card);
    //fotografia que se mostrara
    var img = document.createElement('img');
    img.setAttribute("class", "card-img-top")
    img.setAttribute("src", arregloFotos[i].img_src);
    card.appendChild(img);
    //contenedor de la tarjeta
    var cuerpo = document.createElement('div');
    cuerpo.setAttribute('class', "card-body");
    card.appendChild(cuerpo);
    //ID de cada fotografia
    var numero = document.createElement('p');
    numero.setAttribute('class', "card-text");
    numero.innerHTML = 'Fotografía: ' + arregloFotos[i].id;
    cuerpo.appendChild(numero);
    //Nombre el Rover que tomo la fotografia
    var rov = document.createElement('p');
    rov.setAttribute('class', "card-text");
    rov.innerHTML = 'ROVER: ' + arregloFotos[i].rover.name;
    cuerpo.appendChild(rov);
    //Camara con la que fue tomada la frotografia
    var camra = document.createElement('p');
    camra.setAttribute('class', "card-text");
    camra.innerHTML = 'Camara: ' + arregloFotos[i].camera.name;
    cuerpo.appendChild(camra);
    ////////////////////////////////////////////////////////////

  }
}

mostrarFoto();


