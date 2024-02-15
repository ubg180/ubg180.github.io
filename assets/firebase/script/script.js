
function login() {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const rememberMeCheckbox = document.getElementById("rememberMe");

    const email = emailInput.value;
    const password = passwordInput.value;

    // Anzeige des Ladezustands
    const loginButton = document.getElementById("login");
    const loader = document.getElementById("loader");
    const home = document.getElementById("home");

    loginButton.style.display = "none";
    loader.style.display = "block";

    const signIn = function() {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function (user) {
                // Erfolgreiche Anmeldung
                loader.style.display = "none";
		     document.getElementById("widget").style.display = "block";
                home.style.display = "block";
		document.getElementById("widget").style.display = "block";
		
            })
            .catch(function (error) {
                // Fehler bei der Anmeldung
				const userAction = "Anmeldung fehlgeschlagen";
				logUserActivity(userAction);
                console.log(error);
                loader.style.display = "none";
                loginButton.style.display = "block";
				showalert("Fehler:", "Bitte überprüfe dein Passwort oder deine E-Mail Adresse", 5000); // Löse Funktion zum Zeigen des Alerts aus 
            });
    };

    if (rememberMeCheckbox.checked) {
        // Speichere E-Mail und Passwort in localStorage
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("rememberedPassword", password);
        signIn();
    } else {
        // Entferne E-Mail und Passwort aus localStorage
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
        signIn();
    }
}

// Laden Sie Firebase und überprüfen Sie, ob ein Benutzer angemeldet ist
window.addEventListener("load", function () {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPassword = localStorage.getItem("rememberedPassword");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const rememberMeCheckbox = document.getElementById("rememberMe");

    if (rememberedEmail && rememberedPassword) {
        emailInput.value = rememberedEmail;
        passwordInput.value = rememberedPassword;
        rememberMeCheckbox.checked = true;
        login();
    }
});


 

	var emaildauerhaft;
// Funkti
async function getAuthenticatedUser() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      resolve(user);
    });
  });
}



    function anonAnmelden() {
      firebase.auth().signInAnonymously()
        .then((userCredential) => {
          // Der Benutzer wurde erfolgreich angemeldet
          const user = userCredential.user;
          console.log('Angemeldeter Benutzer:', user);
		  document.getElementById("home").style.display = "block";
		document.getElementById("widget").style.display = "block";
        })
        .catch((error) => {
          // Bei einem Fehler während der Anmeldung
          const errorCode = error.code;
          const errorMessage = error.message;
          
        });
    }

