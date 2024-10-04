// Array för att lagra alla händelser
let events = [];

// Funktion för att lägga till en händelse
function addEvent() {
    const title = document.getElementById('event-title').value;
    const startDate = new Date(document.getElementById('start-datetime').value);
    const duration = document.getElementById('duration').value;

    // Kontrollera att alla fält är korrekt ifyllda
    if (!title || isNaN(startDate.getTime())) {
        alert('Vänligen fyll i alla fält korrekt.');
        return;
    }

    // Om användaren har valt "heldag", sätt sluttiden till samma dag kl 23:59
    let endDate;
    if (duration === "full-day") {
        endDate = new Date(startDate);
        endDate.setHours(23, 59, 0, 0);  // Sätt till 23:59 samma dag
    } else {
        // Lägg till duration i minuter till startDate för att få endDate
        endDate = new Date(startDate.getTime() + parseInt(duration) * 60000);
    }

    // Formatera start och slut tid enligt ICS-format
    const start = startDate.toISOString().replace(/-|:|\.\d+/g, '');
    const end = endDate.toISOString().replace(/-|:|\.\d+/g, '');

    // Skapa en ny händelse i ICS-format
    let event = `BEGIN:VEVENT\nUID:${Date.now()}@yourdomain.com\n`;
    event += `DTSTAMP:${new Date().toISOString().replace(/-|:|\.\d+/g, '')}\n`;
    event += `DTSTART:${start}\nDTEND:${end}\n`;
    event += `SUMMARY:${title}\nEND:VEVENT\n`;

    // Lägg till händelsen i events-arrayen
    events.push(event);

    // Uppdatera listan över tillagda händelser
    const li = document.createElement('li');
    li.textContent = `Titel: ${title}, Start: ${startDate.toLocaleString()}, Slut: ${endDate.toLocaleString()}`;
    document.getElementById('added-events').appendChild(li);
}

// Funktion för att generera ICS-fil
function generateICS() {
    if (events.length === 0) {
        alert("Lägg till minst en händelse innan du genererar filen.");
        return;
    }

    // Skapa ICS-kalender-strukturen
    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Your Organization//EN\n";
    icsContent += events.join("");  // Lägg till alla händelser
    icsContent += "END:VCALENDAR";

    // Skapa en blob av innehållet för att ladda ner som fil
    const blob = new Blob([icsContent], { type: 'text/calendar' });

    // Skapa en nedladdningslänk och "klicka" på den
    const filename = document.getElementById('filename').value || 'calendar';  // Standardnamn om inget filnamn anges
    const downloadLink = document.getElementById('download-link');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${filename}.ics`;  // Lägg till .ics som filändelse
    downloadLink.style.display = 'block';  // Visa länken tillfälligt
    downloadLink.click();  // Simulera klick för nedladdning

    // Rensa events-arrayen efter nedladdning
    events = [];
    document.getElementById('added-events').innerHTML = '';  // Töm listan över tillagda händelser
}
