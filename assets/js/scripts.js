//per nascondere la barra di scorrimento laterale
document.body.style.overflow = "hidden";

//variabili oggetti documento
let search = document.querySelector('[button-search]');
let div_result = document.querySelector('[result]');

let number;

// richiesta dei valori al server
async function get(url, city) {
  let response = await fetch(url);
  if (response.ok) {
    let json = await response.json();
    print(json);
  } else {
    div_result.setAttribute("style","visibility: hidden");
    Swal.fire({ //messaggio avviso città non trovata
      title: `The city "${city}" was not found`,
      showCancelButton: false,
      confirmButtonColor: "#ff0000"
    });
  }
}

// stampa a video dei valori
async function print(text) {
  div_result.innerHTML = "";
  for (i = 0; i <= 18; i++) {
    if (i <= 16) {
      div_result.innerHTML += `<p style="color: ${text.categories[i].color}">${text.categories[i].name}: ${text.categories[i].score_out_of_10.toPrecision(3)}</p>`;
    } else if (i == 17) {
      div_result.innerHTML += `<p>Teleport City Score: ${text.teleport_city_score.toPrecision(3)}</p>`
    } else {
      div_result.innerHTML += `${text.summary}`
    }
  }
  div_result.removeAttribute("style");
}

// click sul pulsante "search"
search.onclick = function() {
  let textbox = document.querySelector('[textbox-city]').value;
  let city = textbox.replace(/\s+/g, '-').toLowerCase();
  get(`https://api.teleport.org/api/urban_areas/slug:${city}/scores/`, textbox);
}
