// Auf die Datenbank zugreifen
    var database4 = firebase.database();

    // Auf das Dokument "disruptions" hören
    var ref = database4.ref("disruptions");

    // Eine Variable für den aktuellen Index der Störung
    var index = 0;

    // Eine Funktion, die die Leiste mit der nächsten Störung aktualisiert
    function updateBar() {
      // Die Leiste auswählen
      var bar = document.getElementById("bar");

      // Die Störungen aus der Datenbank lesen
      ref.once("value", function(snapshot) {
        // Die Störungen in ein Array umwandeln
        var disruptions = snapshot.val();

        // Die Anzahl der Störungen ermitteln
        var length = disruptions.length;

        // Die aktuelle Störung aus dem Array holen
        var disruption = disruptions[index];

        // Die Leiste mit der Störung füllen
        bar.innerHTML = disruption;

        // Die Leiste animieren
        bar.classList.add("animate");

        // Den Index um eins erhöhen
        index++;

        // Wenn der Index das Ende des Arrays erreicht hat, wieder von vorne anfangen
        if (index == length) {
          index = 0;
        }

          bar.classList.remove("animate");

      });
    }

    // Die Funktion zum ersten Mal aufrufen
    updateBar();
 const dbupdate = firebase.database().ref("updates");
 const dbupdatecoolgg = firebase.database().ref("updatesgg");

    // Die Funktion alle 2 Sekunden wiederholen
    setInterval(updateBar, 5000);
 function aufCoolGgWebApp() {
    // Lese den Wert der Variable updates aus der Datenbank
    firebase.database().ref("updatesgg").on("value", function(snapshot) {
      // Wenn updates true ist, leite zur Seite update.html weiter
      if (snapshot.val() === true) {
        window.location.href = "update.html";
      }
      // Wenn updates false ist, tue nichts
      else {
	
      }
    })
    }

function aufAndererSeite() {
    // Lese den Wert der Variable updates aus der Datenbank
    firebase.database().ref("updates").on("value", function(snapshot) {
      // Wenn updates true ist, leite zur Seite update.html weiter
      if (snapshot.val() === true) {
        window.location.href = "update.html";
      }
      // Wenn updates false ist, tue nichts
      else {
	
      }
    })
};

// Überprüfe, ob die aktuelle Seite auf "cool-gg.web.app" ist und nicht auf "/update.html"
if (window.location.hostname === 'cool-gg.web.app' && window.location.pathname !== '/update.html') {
    aufCoolGgWebApp();
}

    else {
      aufAndererSeite();
    }

