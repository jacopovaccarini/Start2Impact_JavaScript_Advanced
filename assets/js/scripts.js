let search = document.querySelector('[button-search]');

async function get(url) {
  let response = await fetch(url);
  if (response.ok) {
    let json = await response.json();
    for (i = 0; i <= 16; i++) {
      alert(json.categories[i].color);
      alert(json.categories[i].name);
      alert(json.categories[i].score_out_of_10);
    }
    alert(json.summary);
    alert(json.teleport_city_score);
  } else {
    alert("HTTP-Error: " + response.status);
  }
}

search.onclick = function() {
  let textbox = document.querySelector('[textbox-city]').value;
  let city = textbox.replace(/\s+/g, '-').toLowerCase();
  get(`https://api.teleport.org/api/urban_areas/slug:${city}/scores/`);
}
