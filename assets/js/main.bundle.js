/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/scripts.js":
/*!******************************!*\
  !*** ./assets/js/scripts.js ***!
  \******************************/
/***/ (() => {

eval("//per nascondere la barra di scorrimento laterale\r\ndocument.body.style.overflow = \"hidden\";\r\n\r\n//creazione oggetti documento\r\nconst div_main = document.querySelector('[main]');\r\n\r\nlet div_title = document.createElement('div');\r\ndiv_title.className = \"title\";\r\ndiv_title.innerHTML = \"<p>Life Quality</p>\";\r\ndiv_main.append(div_title);\r\n\r\nlet div_textbox = document.createElement('div');\r\ndiv_textbox.className = \"textbox\";\r\ndiv_textbox.innerHTML = '<i class=\"fa-solid fa-magnifying-glass\"></i><input type=\"text\" value=\"Write here the city\" autofocus textbox-city><i class=\"fa-solid fa-city\"></i>';\r\ndiv_main.append(div_textbox);\r\n\r\nlet div_button = document.createElement('div');\r\ndiv_button.className = \"button\";\r\ndiv_main.append(div_button);\r\n\r\nlet div_search = document.createElement('div');\r\ndiv_search.className = \"search\";\r\ndiv_search.innerHTML = \"<p>SEARCH</p>\";\r\ndiv_search.setAttribute(\"button-search\",\"\");\r\ndiv_button.append(div_search);\r\n\r\nlet div_random = document.createElement('div');\r\ndiv_random.className = \"random\";\r\ndiv_random.innerHTML = \"<p>RANDOM</p>\";\r\ndiv_random.setAttribute(\"button-random\",\"\");\r\ndiv_button.append(div_random);\r\n\r\n\r\n//variabile oggetto textbox documento\r\nconst textbox = document.querySelector('[textbox-city]');\r\n\r\n//variabile oggetto elenco città\r\nlet city_list = [];\r\n\r\n\r\n//richiesta dell'elenco città al server\r\nwindow.onload = async function() {\r\n  await axios.get(\"https://api.teleport.org/api/urban_areas/\")\r\n    .then(response => {\r\n      for (i = 0; i < response.data.count; i++) { //costruzione dell'array con l'elenco delle città disponibili\r\n        city_list[i] = response[\"data\"][\"_links\"][\"ua:item\"][i][\"name\"];\r\n      }\r\n    })\r\n    .catch(error => {\r\n      Swal.fire({ //messaggio avviso elenco città non trovato\r\n        title: `The city list was not found`,\r\n        showCancelButton: false,\r\n        confirmButtonColor: \"#ff0000\"\r\n      });\r\n    });\r\n};\r\n\r\n\r\n//richiesta dei valori al server\r\nasync function get(url, city) {\r\n  await axios.get(url)\r\n    .then(response => {\r\n      print(response.data);\r\n    })\r\n    .catch(error => {\r\n      if ( div_main.lastElementChild.hasAttribute(\"result\") ) {\r\n        div_result = document.querySelector('[result]');\r\n        div_result.remove();\r\n      }\r\n      Swal.fire({ //messaggio avviso città non trovata\r\n        title: `The city \"${city}\" was not found`,\r\n        showCancelButton: false,\r\n        confirmButtonColor: \"#ff0000\"\r\n      });\r\n    })\r\n};\r\n\r\n\r\n//stampa dei valori\r\nasync function print(text) {\r\n  if ( div_main.lastElementChild.hasAttribute(\"result\") ) {\r\n    div_result.innerHTML = \"\";\r\n  } else {\r\n    div_result = document.createElement('div');\r\n    div_result.className = \"result\";\r\n    div_result.setAttribute(\"result\",\"\");\r\n  }\r\n  for (i = 0; i <= 18; i++) {\r\n    if ( i <= 16 ) {\r\n      div_result.innerHTML += `<p style=\"color: ${text.categories[i].color}\">${text.categories[i].name}: ${text.categories[i].score_out_of_10.toPrecision(3)}</p>`;\r\n    } else if ( i == 17 ) {\r\n      div_result.innerHTML += `<p>Teleport City Score: ${text.teleport_city_score.toPrecision(3)}</p>`\r\n    } else {\r\n      div_result.innerHTML += `${text.summary}`\r\n    }\r\n  }\r\n  div_main.append(div_result);\r\n}\r\n\r\n\r\n//controllo textbox e invio ricerca\r\nasync function search() {\r\n  if ( textbox.value == \"\" ) {\r\n    textbox.blur();\r\n    Swal.fire({ //messaggio avviso città non inserita\r\n      title: \"You have not entered any city name\",\r\n      showCancelButton: false,\r\n      confirmButtonColor: \"#ff0000\"\r\n    }).then((result) => {\r\n      textbox.focus();\r\n    });\r\n  } else {\r\n    let city = textbox.value.replace(',', '').replace('.', '').replace('.', '').replace(/\\s+/g, '-').toLowerCase(); //sostituzione di alcuni caratteri non letti dal server\r\n    if (city == \"galway\") { //città nel server listata con un altro nome\r\n      city = \"gaillimh\";\r\n    }\r\n    get(\"https://api.teleport.org/api/urban_areas/\" + `slug:${city}/scores/`, textbox.value);\r\n    textbox.focus();\r\n  }\r\n}\r\n\r\n\r\n//click sul pulsante \"search\"\r\ndiv_search.onclick = function() {\r\n  search();\r\n}\r\n\r\n\r\n//click sul tasto \"invio\"\r\ntextbox.addEventListener(\"keypress\", function(event) {\r\n  if (event.key === \"Enter\") {\r\n    event.preventDefault();\r\n    div_search.click();\r\n  }\r\n});\r\n\r\n\r\n//clisk sul pulsante \"random\"\r\ndiv_random.onclick = function() {\r\n  let num = Math.round(Math.random() * (Object.keys(city_list).length - 1)); //pescaggio del numero random\r\n  textbox.value = city_list[num]; //settaggio della textbox con la città \"pescata\"\r\n  search();\r\n}\r\n\n\n//# sourceURL=webpack://start2impact_javascript_advanced/./assets/js/scripts.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./assets/js/scripts.js"]();
/******/ 	
/******/ })()
;