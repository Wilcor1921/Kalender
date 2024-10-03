const addedEvents = [];

// Funktion för att lägga till händelse
function addEvent() {
    const eventTitle = document.getElementById("event-title").value;
    const startDate = document.getElementById("start-datetime").value;
    const endDate = document.getElementById("end-datetime").value;

    if (!eventTitle || !startDate || !endDate) {
        alert("Fyll i alla fält!");
        return;
    }

    // Lägg till händelsen i listan
    addedEvents.push({ title: eventTitle, start: startDate, end: endDate });
    updateAddedEventsList();

    // Rensa inmatningsfält
    document.getElementById("event-title").value = "";
    document.getElementById("start-datetime").value = "";
    document.getElementById("end-datetime").value = "";
}

// Uppdatera listan med tillagda händelser
function updateAddedEventsList() {
    const eventsList = document.getElementById("added-events");
    eventsList.innerHTML = ""; // Rensa listan

    addedEvents.forEach((event, index) => {
        const li = document.createElement("li");
        li.textContent = `${event.title}: ${event.start} - ${event.end}`;
        eventsList.appendChild(li);
    });
}

// Funktion för att generera ICS fil
function generateICS() {
    if (addedEvents.length === 0) {
        alert("Inga händelser att generera!");
        return;
    }

    let icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
`;

    addedEvents.forEach(event => {
        icsContent += `
BEGIN:VEVENT
SUMMARY:${event.title}
DTSTART:${formatDateToICS(event.start)}
DTEND:${formatDateToICS(event.end)}
END:VEVENT
`;
    });

    icsContent += `
END:VCALENDAR
`;

    // Skapa en blob av ICS-innehållet
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);

    // Skapa en nedladdningslänk
    const a = document.createElement("a");
    a.href = url;
    a.download = "events.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Funktion för att formatera datum till ICS format
function formatDateToICS(dateString) {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // månader är 0-indexerade
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    return `${year}${month}${day}T${hours}${minutes}00Z`; // Lägg till 'Z' för UTC
}

// Event listeners för knapparna
document.getElementById("add-event-button").addEventListener("click", addEvent);
document.getElementById("generate-ics-button").addEventListener("click", generateICS);
