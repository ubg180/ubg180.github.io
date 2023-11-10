// Firebase-Konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyBH_lgpYQtF0KHodq0DXdSOonchWJwMS4Y",
  authDomain: "cool-gg.firebaseapp.com",
  databaseURL: "https://cool-gg-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cool-gg",
  storageBucket: "cool-gg.appspot.com",
  messagingSenderId: "135757861223",
  appId: "1:135757861223:web:95b00a581cb07df494dfc2",
  measurementId: "G-V74EHYKZK3"
};
var $ = jQuery.noConflict();


// Funktion zur Initialisierung von Firebase
function initializeFirebase() {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    console.log("Firebase wurde initialisiert."); // Informative Meldung
}
initializeFirebase();

// Funktion zur Validierung und Registrierung des Benutzers
function validateAndRegister() {
    console.log("Validierung und Registrierung gestartet...");

    // Benutzerdaten aus den Eingabefeldern abrufen
    const nameInput = document.getElementById('name');
    const lastNameInput = document.getElementById('lastName');
    const genderInput = document.getElementById('gender');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Überprüfen, ob die Elemente im DOM vorhanden sind
    if (!emailInput || !passwordInput) {
        showalert("Fehler:", "Ein oder mehrere Eingabefelder wurden nicht gefunden.", 5000);
        console.error("Ein oder mehrere Eingabefelder wurden nicht gefunden.");
        return;
    }

    // Benutzerdaten aus den Eingabefeldern abrufen
    const name = nameInput.value;
    const lastName = lastNameInput.value;
    const gender = genderInput.value;
    const phoneNumber = phoneNumberInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    // Überprüfung, ob alle erforderlichen Felder ausgefüllt sind
    if (!email || !password) {
        showalert("Fehler:", "Bitte fülle alle Felder aus.", 5000);
        console.error("Bitte fülle alle Felder aus.");
        return;
    }

    // Registrierung des Benutzers mit Firebase Auth
firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        const user = userCredential.user;

        // E-Mail-Verifizierung senden
        return user.sendEmailVerification()
            .then(() => {
                console.log("E-Mail-Verifizierung gesendet.");
            })
            .catch((error) => {
                console.error("Fehler beim Senden der E-Mail-Verifizierung:", error);
                throw error; // Fehler weitergeben, um im nächsten catch-Block behandelt zu werden
            });
    })
    .then(() => {
        // Code, der nach erfolgreicher E-Mail-Verifizierung ausgeführt wird
        scheduleCheckAndRedirect();
        showalert("Erfolgreich registriert:", "Bitte überprüfe den Posteingang, auch den Spam-Ordner.", 5000);
        console.log("Benutzer wurde erfolgreich registriert."); // Informative Meldung
    })
    .catch((error) => {
        // Code für die Fehlerbehandlung
        showalert("Fehler:", error.message || "Fehler bei der Registrierung.", 5000);
        console.error('Fehler bei der Registrierung:', error.message || "Fehler bei der Registrierung.");
    });
}

// Funktion zur Überprüfung der Benutzerdaten und Weiterleitung
function checkAndRedirect() {
    console.log("Überprüfung und Weiterleitung gestartet...");

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            user.reload()
                .then(() => {
                    if (user.emailVerified) {
                        showalert("Erfolg:", "E-Mail-Verifizierung erfolgreich abgeschlossen.", 5000);
                        console.log("E-Mail-Verifizierung erfolgreich abgeschlossen."); // Informative Meldung
                        window.location.href = 'index.html'; // Weiterleitung zur Startseite
                    }
                })
                .catch((error) => {
                    showalert("Fehler:", error.message || "Fehler beim Aktualisieren des Benutzers.", 5000);
                    console.error('Fehler beim Aktualisieren des Benutzers:', error.message || "Fehler beim Aktualisieren des Benutzers.");
                });
        }
    });
}

// Die Funktion checkAndRedirect alle 60 Sekunden aufrufen (60 Sekunden = 60.000 Millisekunden)
function scheduleCheckAndRedirect() {
    checkAndRedirect();
    setTimeout(scheduleCheckAndRedirect, 6000);
}

console.log("Überprüfung und Weiterleitung wird alle 60 Sekunden gestartet."); // Informative Meldung
scheduleCheckAndRedirect();

// Funktion zur Aktualisierung des Fortschritts
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

// Funktion zur Anzeige von Benachrichtigungen
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
