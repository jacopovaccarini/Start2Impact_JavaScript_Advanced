//per nascondere la barra di scorrimento laterale
document.body.style.overflow = "hidden";

//variabili oggetti documento
const search = document.querySelector('[button-search]');
const main = document.querySelector('[main]');

//richiesta dei valori al server
async function get(url, city) {
  const response = await fetch(url);
  if (response.ok) {
    let json = await response.json();
    print(json);
  } else {
    if ( main.lastElementChild.hasAttribute("result") ) {
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

//stampa a video dei valori
async function print(text) {
  if ( main.lastElementChild.hasAttribute("result") ) {
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
  main.append(div_result);
}

//click sul pulsante "search"
search.onclick = function() {
  let textbox = document.querySelector('[textbox-city]').value;
  if ( textbox == "" ) {
    Swal.fire({ //messaggio avviso città non trovata
      title: "You have not entered any city name",
      showCancelButton: false,
      confirmButtonColor: "#ff0000"
    });
  } else {
    let city = textbox.replace(/\s+/g, '-').toLowerCase();
    get(`https://api.teleport.org/api/urban_areas/slug:${city}/scores/`, textbox);
  }
}
