// Konstanten für Mindest- und Maximalwerte der Vorgangsnummer
const MIN_VORGANGSNUMMER = 100;
const MAX_VORGANGSNUMMER = 99999;

// Funktion zur Generierung einer zufälligen Vorgangsnummer
function generateVorgangsnummer() {
  return Math.floor(Math.random() * (MAX_VORGANGSNUMMER - MIN_VORGANGSNUMMER + 1)) + MIN_VORGANGSNUMMER;
}

// Funktion zur Ermittlung des aktuellen Benutzers
function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      resolve(currentUser);
    } else {
      reject('Benutzer ist nicht angemeldet.');
    }
  });
}

// Funktion zur Ermittlung der IP-Adresse
async function getIPAddress() {
  try {
    const response = await fetch('https://api64.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    throw error;
  }
}

// Funktion zur Ermittlung der Geoposition durch eine externe API
async function getGeoPoint() {
  try {
    const response = await fetch('https://ipinfo.io/json');
    const data = await response.json();
    const [latitude, longitude] = data.loc.split(',').map(parseFloat);
    const geoPoint = new firebase.firestore.GeoPoint(latitude, longitude);
    return geoPoint;
  } catch (error) {
    throw error;
  }
}

// Funktion zur Protokollierung von Aktivitäten
async function logActivity(uid, ipAddress, action, geoPoint) {
  try {
    const vorgangsnummer = generateVorgangsnummer();
    const vn = vorgangsnummer.toString();

    console.log('Eindeutige Vorgangsnummer:', vn);

    const timestampStart = firebase.firestore.FieldValue.serverTimestamp();
    const timestampEnd = firebase.firestore.Timestamp.now();

    const docRef = await db.collection("log").doc(vn).set({
      uid: uid,
      startTime: timestampStart,
      endTime: timestampEnd,
      ipAddress: ipAddress,
      action: action,
      location: geoPoint
    });

    console.log("Aktivität protokolliert in Dokument:", vn);
  } catch (error) {
    console.error("Fehler beim Protokollieren der Aktivität:", error);
  }
}

// Hauptfunktion zur Protokollierung
async function logUserActivity(userAction) {
  try {
    const [currentUser, ipAddress, geoPoint] = await Promise.all([
      getCurrentUser(),
      getIPAddress(),
      getGeoPoint(),
    ]);

    await logActivity(currentUser.uid, ipAddress, userAction, geoPoint);
  } catch (error) {
    console.error("Fehler bei der Protokollierung der Benutzeraktivität:", error);
  }
}


