
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
// Funktion zum Senden der API-Daten
function apisend() {
		const userAction = "Es wurde eine API gesendet.";
		logUserActivity(userAction);
var db = firebase.firestore();
    // Funktion zum Aktualisieren der Daten in Firestore
   
      // Firebase Authentication - Aktuell angemeldeter Benutzer
      var user = firebase.auth().currentUser;

      if (user) {
        // UID des angemeldeten Benutzers
        var userId = user.uid;

        // Wert aus dem Input-Feld apiKeyField abrufen
        var newApiKey = document.getElementById("textapi").value;
		var newtoken = document.getElementById("token").value;
		

        // Firestore-Dokument aktualisieren
        var userRef = db.collection("Nutzer").doc(userId);

        return userRef.set({
          apiKey: newApiKey,
		  maxtoken: newtoken
		  
		}, { merge: true })
        .then(function() {
          showalert("Aktion erfolgreich ausgeführt:", "Deine OpenAI API und die maximale Anzahl der Tokens, die für eine Antwort verwendet werden wurde geändert. Wir wünschen dir viel Spaß.", 5000); // Löse Funktion zum Zeigen des Alerts aus 
        })
        .catch(function(error) {
          console.error("Fehler beim Aktualisieren der Daten: ", error);
        });
      } else {
        console.log("Benutzer ist nicht angemeldet.");
      }

}

 

	var emaildauerhaft;
// Funktion zum automatischen eingeben der API
  async function getUserData() {
  try {
	alleverstecken()
	document.getElementById("loader").style.display = "block";
    const user = await getAuthenticatedUser();
    
    if (user) {
      const email = await getEmailFromFirestore(user.uid);
	   emaildauerhaft = email;
	  console.log(emaildauerhaft);
	  	if (!emaildauerhaft == undefined) {
		alleverstecken();
		showalert("Fehler:", "Wir konnten deine E-Mail Adresse leider nicht finden.", 5000);
		document.getElementById("Support").style.display = "block";
		document.getElementById("TextSP").style.display = "block";
		

		}
}
// Fals keine E-Mail vorhanden ist
	if (emaildauerhaft == undefined) {
  showalert("Fehler:", "Wir konnten keine passende E-Mail-Adresse finden. Bitte gebe deine E-Mail-Adresse manuell ein. Wir bitten um Verständnis", 5000);

	  
      console.log("Email aus Firestore-Dokument:", email);
    } else {
		showalert("Fehler:", "Es ist ein Fehler aufgetreten wir bitten um Verständnis.", 5000);
    }
  } catch (error) {
		const errorMessage = error.message || "Es ist ein Fehler aufgetreten. Wir bitten um Verständnis.";
		showalert("Fehler:", errorMessage, 5000);
  
  }
		document.getElementById("loader").style.display = "none";
		document.getElementById("Support").style.display = "none";
		document.getElementById("SP2").style.display = "block";

}

async function getAuthenticatedUser() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      resolve(user);
    });
  });
}

async function getEmailFromFirestore(uid) {
  const usersCollection = firestore.collection("Nutzer");
  const doc = await usersCollection.doc(uid).get();
  
  if (doc.exists) {
    const userData = doc.data();
    var email = userData.email;
    return email;
  } else {
    return null; // Wenn das Dokument nicht gefunden wird, gib null zurück
	emailtest = null;
	getUserData();
  }
}
// Funktion zum hinzufügen der Datenbank für den Support
function SPabgeben() {
	const userAction = "";
	logUserActivity(userAction);	
	alleverstecken();
	const emaildauerhaft1 = emaildauerhaft;
    document.getElementById("loader").style.display = "block";
	const Anfrage = document.getElementById('emailsupport').value;
	var timename = `${getCurrentTime()} ${getCurrentDate()}`;
	const generatedTimestamp = generattimestamp();
		if(emaildauerhaft ==  undefined) { 
		 email = document.getElementById('TextSP').value;
	}
	if(!emaildauerhaft ==  undefined) { 
		 email = emaildauerhaft;
	}
	if(Anfrage == "") {
		showalert("Fehler", "Bitte gebe eine gültige Angabe ein.", 5000);
		document.getElementById("loader").style.display = "none";
		var email = "test";
	var timename = `${getCurrentTime()} ${getCurrentDate()}`;
	var starttime = timename;
	var endtime = timename; 
	var data = {
			Email: email,
			Von: starttime,
			Bis: endtime, 
			Anfrage: Anfrage,
			Id: generatedTimestamp,
			Datum: timename,
	}
	const db = firebase.firestore();
                    db.collection('Support').doc(timename).set(data)
					   document.getElementById("loader").style.display = "none";
}
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

