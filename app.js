let events = [];

document.getElementById('add-event-button').addEventListener('click', function() {
    const title = document.getElementById('event-title').value;
    const startDatetime = new Date(document.getElementById('start-datetime').value);
    const endDatetime = new Date(document.getElementById('end-datetime').value);
    const recurEvent = document.getElementById('recur-event').checked;
    const frequency = document.getElementById('frequency').value;
    const occurrences = document.getElementById('occurrences').value;

    if (!title || isNaN(startDatetime) || isNaN(endDatetime)) {
        alert('Vänligen fyll i alla fält korrekt.');
        return;
    }

    let event = `BEGIN:VEVENT\nSUMMARY:${title}\nDTSTART:${startDatetime.toISOString().replace(/-|:|\.\d+/g, '')}\nDTEND:${endDatetime.toISOString().replace(/-|:|\.\d+/g, '')}\n`;

    if (recurEvent) {
        event += `RRULE:FREQ=${frequency.toUpperCase()};COUNT=${occurrences}\n`;
    }

    event += `END:VEVENT\n`;
    events.push(event);

    // Lägg till händelse till listan
    const addedEvents = document.getElementById('added-events');
    const li = document.createElement('li');
    li.textContent = `Händelse: ${title}, Start: ${startDatetime.toLocaleString()}, Slut: ${endDatetime.toLocaleString()}`;
    addedEvents.appendChild(li);

    // Rensa formulärfälten efter tillägg
    document.getElementById('event-title').value = '';
    document.getElementById('start-datetime').value = '';
    document.getElementById('end-datetime').value = '';
    document.getElementById('recur-event').checked = false;
    document.getElementById('recur-options').style.display = 'none';
});

document.getElementById('generate-ics-button').addEventListener('click', function() {
    let filename = document.getElementById('filename').value.trim();
    if (filename === "") {
        filename = "kalender";  // Standard filnamn om inget anges
    }
    filename += ".ics";  // Lägg till filändelsen

    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//example//EN\n";

    events.forEach(event => {
        icsContent += event;
    });

    icsContent += "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
});

// Funktion för att visa/dölja återkommande inställningar
function toggleRecurOptions() {
    const recurOptions = document.getElementById('recur-options');
    const recurEvent = document.getElementById('recur-event');
    
    if (recurEvent.checked) {
        recurOptions.style.display = 'block';
    } else {
        recurOptions.style.display = 'none';
    }
}
