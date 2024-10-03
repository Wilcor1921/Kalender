// Funktion för att generera ICS fil
function generateICS() {
    const eventTitle = document.getElementById("event-title").value;
    const startDate = document.getElementById("start-datetime").value;
    const endDate = document.getElementById("end-datetime").value;

    if (!eventTitle || !startDate || !endDate) {
        alert("Fyll i alla fält!");
        return;
    }

    // Format av ICS-fil
    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${eventTitle}
DTSTART:${formatDateToICS(startDate)}
DTEND:${formatDateToICS(endDate)}
END:VEVENT
END:VCALENDAR
`;

    // Skapa en blob av ICS-innehållet
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);

    // Skapa en nedladdningslänk
    const a = document.createElement("a");
    a.href = url;
    a.download = "event.ics";
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

// Event listener för att hantera knappen
document.getElementById("generate-ics-button").addEventListener("click", generateICS);
