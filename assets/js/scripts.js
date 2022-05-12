//per nascondere la barra di scorrimento laterale
document.body.style.overflow = "hidden";


//creazione oggetti documento
const div_main = document.querySelector('[main]');

let div_title = document.createElement('div');
div_title.className = "title";
div_title.innerHTML = "<p>Life Quality</p>";
div_main.append(div_title);

let div_textbox = document.createElement('div');
div_textbox.className = "textbox";
div_textbox.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i><input type="text" value="Write here the city" autofocus textbox-city><i class="fa-solid fa-city"></i>';
div_main.append(div_textbox);

let div_button = document.createElement('div');
div_button.className = "button";
div_main.append(div_button);

let div_search = document.createElement('div');
div_search.className = "search";
div_search.innerHTML = "<p>SEARCH</p>";
div_search.setAttribute("button-search","");
div_button.append(div_search);

let div_random = document.createElement('div');
div_random.className = "random";
div_random.innerHTML = "<p>RANDOM</p>";
div_random.setAttribute("button-random","");
div_button.append(div_random);


//variabile oggetto documento
const textbox = document.querySelector('[textbox-city]');


//variabile oggetto elenco città
let city_list = [];

//richiesta dell'elenco città al server
window.onload = async function() {
  const response = await fetch("https://api.teleport.org/api/urban_areas/")
  if (response.ok) {
    let json = await response.json();
    for (i = 0; i < json.count; i++) {
      city_list[i] = json["_links"]["ua:item"][i]["name"];
    }
  } else {
    Swal.fire({ //messaggio avviso elenco città non trovato
      title: `The city list was not found`,
      showCancelButton: false,
      confirmButtonColor: "#ff0000"
    });
  };
};

//richiesta dei valori al server
async function get(url, city) {
  const response = await fetch(url);
  if (response.ok) {
    let json = await response.json();
    print(json);
  } else {
    if ( div_main.lastElementChild.hasAttribute("result") ) {
      div_result = document.querySelector('[result]');
      div_result.remove();
    }
    Swal.fire({ //messaggio avviso città non trovata
      title: `The city "${city}" was not found`,
      showCancelButton: false,
      confirmButtonColor: "#ff0000"
    });
  }
}


//stampa dei valori
async function print(text) {
  if ( div_main.lastElementChild.hasAttribute("result") ) {
    div_result.innerHTML = "";
  } else {
    div_result = document.createElement('div');
    div_result.className = "result";
    div_result.setAttribute("result","");
  }
  for (i = 0; i <= 18; i++) {
    if ( i <= 16 ) {
      div_result.innerHTML += `<p style="color: ${text.categories[i].color}">${text.categories[i].name}: ${text.categories[i].score_out_of_10.toPrecision(3)}</p>`;
    } else if ( i == 17 ) {
      div_result.innerHTML += `<p>Teleport City Score: ${text.teleport_city_score.toPrecision(3)}</p>`
    } else {
      div_result.innerHTML += `${text.summary}`
    }
  }
  div_main.append(div_result);
}


//controllo textbox e invio ricerca
async function search() {
  if ( textbox.value == "" ) {
    textbox.blur();
    Swal.fire({ //messaggio avviso città non inserita
      title: "You have not entered any city name",
      showCancelButton: false,
      confirmButtonColor: "#ff0000"
    }).then((result) => {
      textbox.focus();
    });
  } else {
    let city = textbox.value.replace(/\s+/g, '-').replace(',', '').replace('.', '').toLowerCase();
    get(`https://api.teleport.org/api/urban_areas/slug:${city}/scores/`, textbox.value);
    textbox.focus();
  }
}


//click sul pulsante "search"
div_search.onclick = function() {
  search();
}


//click sul tasto "invio"
textbox.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    div_search.click();
  }
});


//clisk sul pulsante "random"
div_random.onclick = function() {
  let num = Math.round(Math.random() * (Object.keys(city_list).length - 1)); //pescaggio del numero random
  textbox.value = city_list[num]; //settaggio della textbox con la città "pescata"
  search();
}
