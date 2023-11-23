
  

	const loginButton = document.getElementById("login");
    const loader = document.getElementById("loader");
    const home = document.getElementById("home");
// Funktion zum Einblenden des Home-Menüs
function alleverstecken() {
    const elementsToHide = [
        "SP2",
        "Support",
        "login",
        "API",
        "response",
        "email",
        "password",
       	"hometext",
        "chat",
       	"gamesMenu"
    ];

    // Verstecke alle Elemente in der Liste
    elementsToHide.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = "none";
        }
    });

    // Zeige das Home-Menü an
    document.getElementById("home").style.display = "block";
}


// Funktion zum Anzeigen des Support 
function Support() {
	const timename = `${getCurrentTime()} ${getCurrentDate()}`; // Bekomme const timename
	var starttime = timename; // Bekomme Startzeit
    alleverstecken();
    document.getElementById("Support").style.display = "block";
    document.getElementById("TextSP").style.display = "block";
}



// Funktion zur Anzeige der Kontoübersicht
function showAccountOverview() {
    var userId = firebase.auth().currentUser.uid;

    // Firestore-Datenbankreferenz
    var db = firebase.firestore();

    // Daten aus Firestore abrufen
    db.collection("Nutzer").doc(userId).get().then(function(doc) {
        if (doc.exists) {
            // Dokument gefunden, Daten abrufen
            var userData = doc.data();

            // Kontoübersicht erstellen und Daten einfügen
            var accountOverviewHtml = `
                <div class="modal fade" id="accountModal" tabindex="-1" aria-labelledby="accountModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="accountModalLabel">Kontoübersicht</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Schließen">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p><strong>Name:</strong> ${userData.firstName}</p>
                                <p><strong>Nachname:</strong> ${userData.lastName}</p>
                                <p><strong>Geschlecht:</strong> ${userData.gender}</p>
                                <p><strong>E-Mail Adresse:</strong> ${userData.email}</p>
                                <p><strong>Telefonnummer:</strong> ${userData.phoneNumber}</p>
                                <p><strong>Chat-GPT API:</strong> ${userData.apiKey}</p>
                                <p><strong>Tokens:</strong> ${userData.maxtoken}</p>
                                
                            </div>
                            <div class="modal-footer">
								<button type="button" class="btn btn-danger" data-dismiss="modal" onClick="confirmLogout()">Ausloggen</button>
								<button type="button" class="btn btn-secondary" onClick="passwordreset()">Passwort zurücksetzen</button>
								<button type="button" class="btn btn-secondary" data-dismiss="modal">Schließen</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Das Modal-HTML zur Seite hinzufügen
            $('body').append(accountOverviewHtml);

            // Das Modal anzeigen
            $('#accountModal').modal('show');
        } else {
            // Dokument nicht gefunden
            showalert("Fehler:", "Wir konnten das Dokument nicht finden. Wir bitten um Verständiss. Wenn das Problem öffters Auftrit kontaktiere bitte den Support.", 5000);;
        }
    }).catch(function(error) {
    const errorMessage = error.message || "Es tut uns leid. Es ist ein Fehler aufgetreten. Wir bitten um Verständnis. Hier sind Informationen zum Fehler.";
    showalert("Fehler:", errorMessage, 5000);
});
}

// Funktion zur Bestätigung des Ausloggens
function confirmLogout() {
    const confirmationMessage = "Möchtest du dich wirklich Ausloggen?";
    const confirmAlertHTML = `
        <div class="modal fade" id="alertmodal" tabindex="-1" aria-labelledby="accountModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="accountModalLabel">Logout bestätigen</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Schließen">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>${confirmationMessage}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" data-dismiss="modal">Abbrechen</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal" id="confirmLogoutButton">Ausloggen</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    const $confirmAlertModal = $(confirmAlertHTML);
    const $confirmLogoutButton = $confirmAlertModal.find('#confirmLogoutButton');
    $('body').append($confirmAlertModal);

    $confirmLogoutButton.on('click', function () {
        // Führen Sie das Ausloggen durch, wenn der Benutzer bestätigt
        logout();
    });

    $confirmAlertModal.modal('show');
}


// Funktion zum Ausloggen
function showSuccessAlert(message) {
  const successAlert = document.getElementById("success-alert");
  const alertText = successAlert.querySelector(".alert-text");
  alertText.textContent = message;
  successAlert.classList.add("show-alert");

  setTimeout(() => {
    successAlert.classList.remove("show-alert");
  }, 30); // Verstecke den Erfolgs-Alert nach 3 Sekunden
}

function showErrorAlert(message) {
  const errorAlert = document.getElementById("error-alert");
  const alertText = errorAlert.querySelector(".alert-text");
  alertText.textContent = "Fehler beim Ausloggen: " + message;
  errorAlert.classList.add("show-alert");

  setTimeout(() => {
    errorAlert.classList.remove("show-alert");
  }, 3000); // Verstecke den Fehler-Alert nach 3 Sekunden
}
// Funktion zum Ausloge 
function logout() {
	logUserActivity("Ausloggen");
  const loginButton = document.getElementById("login");
  const loader = document.getElementById("loader");
  const home = document.getElementById("home");
  const email = document.getElementById("email");
  const pass = document.getElementById("password");
  

  // Verstecke den Inhalt der Seite und zeige den Ladebildschirm
  alleverstecken();
  home.style.display = "none";
  loader.style.display = "block";

  // Versuche, den Benutzer abzumelden
  firebase.auth().signOut()
    .then(() => {
      // Erfolgreich ausgeloggt
      showSuccessAlert("Du wurdest erfolgreich ausgeloggt!");

      // Verstecke den Ladebildschirm und zeige den Anmeldebutton wieder an
      loader.style.display = "none";
	  email.style.display = "block"
	  pass.style.display = "block";
      loginButton.style.display = "block";
    })
    .catch((error) => {
      // Fehler beim Ausloggen
      showErrorAlert(error.message);

      // Verstecke den Ladebildschirm und zeige den Inhalt der Seite wieder an
      loader.style.display = "none";
      home.style.display = "block";
    });
}
// Funktion zum zurücksetzten des Passwort
function passwordreset() {
    const passwordresetHtml = `
        <div class="modal fade" id="passwordModal" tabindex="-1" aria-labelledby="accountModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="accountModalLabel">Passwort vergessen?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Schließen">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Bitte gebe deine E-Mail Adresse ein. </p>
                            <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1"><i class="fas fa-at"></i></span>
                            </div>
                            <input type="text" class="form-control" id="email" placeholder="E-Mail-Adresse" aria-label="Username" aria-describedby="basic-addon1" required>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" id="submitBtn">Absenden</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Schließen</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    $('body').append(passwordresetHtml);

    // Das Modal anzeigen
    $('#passwordModal').modal('show');

    // Event-Listener für den Absenden-Button hinzufügen
    document.getElementById('submitBtn').addEventListener('click', resetpass);
}

function resetpass() {
    const email = document.getElementById("email").value;

    // Überprüfen Sie, ob die E-Mail-Adresse gültig ist
    if (!isValidEmail(email)) {
		showalert("Fehler:", "Dies ist keine gültige E-Mail Adresse. Bitte gebe eine gültige E-Mail Adresse ein.", 5000);;
        return;
    }

    // Firebase Passwort zurücksetzen Funktion aufrufen
    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
        showalert("Aktion erfolgreich ausgeführt:", "Es wurde eine E-Mail zum Zurücksetzten des Passwort an deine eingegebene E-Mail Adresse gesendet.", 5000);;

        })
      .catch(function(error) {
    const errorMessage = error.message || "Es ist ein Fehler aufgetreten. Wir bitten um Verständnis.";
    showalert("Fehler:", errorMessage, 5000);
});


}
// Funktion zum überpfüfen der Gültigkeit der E-Mail Aftesse
function isValidEmail(email) {
    // Eine einfache E-Mail-Validierung, Sie können sie an Ihre Anforderungen anpassen
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function updateProgress($progressBar, duration) {
    let progressValue = 0;
    const interval = (duration / 100); // 100 Schritte in der angegebenen Zeit

    function step() {
        if (progressValue < 100) {
            progressValue += 1; // Erhöhe den Fortschritt um 1%
            $progressBar.css('width', `${progressValue}%`);
            setTimeout(step, interval);
        }
    }

    step();
}

function showalert(AlertÜberschrift1, AlertText1, duration) {
    const alertHTML = `
        <div class="modal fade" id="alertmodal" tabindex="-1" aria-labelledby="accountModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="accountModalLabel">${AlertÜberschrift1}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Schließen">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>${AlertText1}</p>
                        <div class="progress">
                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" style="width: 0%;" id="progressBar"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    const $alertModal = $(alertHTML);
    const $progressBar = $alertModal.find('#progressBar');
    $('body').append($alertModal);

    // Das Modal anzeigen
    $alertModal.modal('show');

    // Starte die Aktualisierung des Fortschritts
    updateProgress($progressBar, duration);

    // Schließe das Alert-Fenster nach der angegebenen Dauer
    setTimeout(function () {
        $alertModal.modal('hide');
    }, duration);
}


function fs() {
        window.location.href = "http://laserbrawl.c1.biz/flappybird.html";
        }
function chat() {
        window.location.href = "http://laserbrawl.c1.biz/chat.html";
        }
function gl() {
        window.location.href = "http://laserbrawl.c1.biz/gamelist.html";
        }
function ps() {
        window.location.href = "http://laserbrawl.c1.biz/snake.html";
        }
    function pb() {
            window.location.href = "http://laserbrawl.c1.biz/bubbleshoter.html";
        }

        function hideGamesMenu() {
            var gamesMenu = document.getElementById("gamesMenu");
            gamesMenu.style.display = "none";
        }

        function showGamesMenu() {
            var gamesMenu = document.getElementById("gamesMenu");
            alleverstecken();
            gamesMenu.style.display = "block";
        }

function st() {
        alleverstecken();
        document.getElementById("hometext").style.display = "block";
        }





    // Get a reference to the disruptions node
    var disruptionsRef = database.ref('disruptions');

    // Listen for value changes
    disruptionsRef.on('value', function(snapshot) {
      // Get the value of the snapshot
      var disruptions = snapshot.val();

      // Get the marquee element
      var marquee = document.getElementById('marquee');

      // Update the marquee text with the disruptions
      marquee.textContent = disruptions;
    })
