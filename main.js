// 1. Napišite funkciju za asinkroni dohvat podataka sa servera.
// Dohvatite JSON sa linka: https://spark-test-apis.herokuapp.com/football-players - 5 bodova

var players = [];

function sendXHR(method, url, callback) {
	var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
  	if (this.status === 200 && this.readyState === 4) {
    	callback(JSON.parse(this.responseText))
    }
  }
  xhr.open(method, url, true);
  xhr.send();
}


sendXHR("GET", "https://spark-test-apis.herokuapp.com/football-players", function(data) {
	players = data.players;
	logPossiblePositions(data);
  calculateAges(data);
  calculateAveragePositions(data);
  sameKitNumbers(data);
})

// 2. Napravite funkciju koja prima podatke koje ste dohvatili sa servera.
// Funkcija treba za svakog igraca ispisati sve moguce pozicije iz niza "possiblePositions" sortirane po id-u pozicije( id je vrijednost elementa u nizu "possiblePositions" te svaki id odgovara key-u(property-u) pozicije unutar objekta "positions" od najveceg prema najmanjem id-u, primjer: pozicija "GK" ima id 1). Svaku poziciju iz niza ispisati u formatu: {ime i prezime igraca}: {id pozicije} - {ime pozicije}(informacije o pozicijama se nalaze u objektu "positions") - 20 bodova

function logPossiblePositions(data) {
	var players = [];
  data.players.forEach(function(player) {
  	player.stats.possiblePositions.sort(function(a, b) { return a - b});
    player.stats.possiblePositions.forEach(function(pos) {
    	console.log(`${player.name} ${player.lastName}: ${pos} - ${data.positions[pos]}`)
    })
  })
}


// 3. Napravite novu funkciju koja prima podatke koje ste dohvatili sa servera.
// Funkcija treba objektu dobivenom sa servera dodati metodu "calculatePlayerYears" koja ce primati objekt igraca, dinamicki provjeriti iz property-a "birthDate" koliko igrac ima godina i vratiti taj iznos. Proci kroz sve igrace i za svakog igraca u property "age" spremiti iznos dobiven pozivanjem metode "calculatePlayerYears" te nakon toga ispisati objekt svakog igraca. - 20 bodova
function calculateAges(data) {
	data.calculatePlayerYears = function (obj) {
  	var birthDate = new Date(obj.stats.birthDate);
  	var ageDifference = Date.now() - birthDate.getTime();
    var ageDate = new Date(ageDifference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  
  data.players.forEach(function(player) {
  	player.stats.age = data.calculatePlayerYears(player);
    console.log(player);
  });
}
// 4. Napravite novu funkciju koja prima podatke koje ste dohvatili sa servera.
// Funkcija treba dinamicki iz niza "players" izracunati prosjecan broj pozicija koje mogu igrati igraci te ispisati taj broj (pozicije koje moze igrat igrac se nalaze u nizu "possiblePositions". - 15 bodova
function calculateAveragePositions(data) {
	let numOfPositionsArr = [];
  let total = 0;
	data.players.forEach(function(player) {
  	numOfPositionsArr.push(player.stats.possiblePositions.length);
  	total += player.stats.possiblePositions.length;
  });
  let avg = total / numOfPositionsArr.length;
  //console.log(numOfPositionsArr.length);
  console.log(`Prosjecan broj pozicija koje igraci mogu igrati: ${Math.round(avg)}`);
  
}

// 5. Napraviti funkciju koja će dinamicki provjeriti koliko igraca nosi koji broj dresa(Primjer: broj 10 nose 3 igraca, broj 1 nosi 1 igrac itd...). Provjera brojeva ne smije bit hardkodirana (ne provjeravati na nacin if (broj === 10)) nego dinamicki prebrojati sve koristene dresove.(broj dresa se nalazi u property-u "kitNumber") - 20 bodova

function sameKitNumbers(data) {
  let kits = {}
	data.players.forEach(function(player) {
  if (!kits[player.stats.kitNumber]) {
  	kits[player.stats.kitNumber] = 1;
  } else {
  	kits[player.stats.kitNumber] += 1;
  }
  });

  for (let prop in kits) {
  	console.log(`Dres broj ${prop} - ${kits[prop]} igrača`);
  }
}


function generatePlayer() {
	let item = players[Math.floor(Math.random() * players.length)];
  document.getElementById("player").innerHTML = `${item.name} ${item.lastName} - ${item.stats.club}`

}