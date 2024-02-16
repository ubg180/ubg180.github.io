 // Aktuelle Uhrzeit
     // Aktuelle Uhrzeit
function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

// Aktuelles Datum
function getCurrentDate() {
  const now = new Date();
  const weekdays = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const weekday = weekdays[now.getDay()];
  return `${weekday}, der ${day}.${month}.${year}`;
}

// Aktualisiere Uhrzeit und Datum
function updateDateTime() {
  document.getElementById('current-time').textContent = getCurrentTime();
  document.getElementById('current-date').textContent = getCurrentDate();
  var timename = `${getCurrentTime()} ${getCurrentDate()}`;
}

setInterval(updateDateTime, 1000); // Aktualisiere Zeit und Datum alle 1000 ms (1 Sekunde)

function generattimestamp() {
  const timename = "timestamp"; // Konstante für den Namen
  let timestamp = timename; // Beginne mit dem Wert der Konstanten

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?"; // Zeichenfolge mit Zeichen
  const charactersLength = characters.length;

  // Füge zufällige Zeichen aus der Zeichenfolge hinzu, bis die Länge 1000 erreicht
  while (timestamp.length < 1000) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    timestamp += characters.charAt(randomIndex); // Füge das zufällige Zeichen zum Timestamp hinzu
  }

  return timestamp; // Gib den generierten Timestamp zurück
}

var generatedTimestamp = generattimestamp();
