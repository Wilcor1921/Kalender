let events = [];

function addEvent() {
    const title = document.getElementById('event-title').value;
    const startDate = new Date(document.getElementById('start-datetime').value);
    const endDate = new Date(document.getElementById('end-datetime').value);
    
    // Kontrollera att start- och sluttid är ifyllda
    if (!startDate || !endDate || isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        alert('Vänligen fyll i både start- och sluttid.');
        return;
    }

    const start = startDate.toISOString().replace(/-|:|\.\d+/g, '');
    const end = endDate.toISOString().replace(/-|:|\.\d+/g, '');
    const recurring = document.getElementById('recur-event').checked;
    const frequency = document.getElementById('frequency').value;
    const occurrences = document.getElementById('occurrences').value || '';

    let event = `BEGIN:VEVENT\nUID:${Date.now()}@yourdomain.com\n`;
    event += `DTSTAMP:${new Date().toISOString().replace(/-|:|\.\d+/g, '')}\n`;
    event += `DTSTART:${start}\nDTEND:${end}\n`;
    event += `SUMMARY:${title}\n`;

    // Om det är återkommande, lägg till RRULE
    if (recurring) {
        event += `RRULE:FREQ=${frequency.toUpperCase()}`;
        if (occurrences) {
            event += `;COUNT=${occurrences}`;
        }
        event += '\n';
    }

    event += `END:VEVENT\n`;

    // Lägg till eventet i arrayen
    events.push(event);

    // Uppdatera tillagda händelser på sidan
    const eventList = document.getElementById('added-events');
    const li = document.createElement('li');
    li.textContent = `Titel: ${title}, Start: ${startDate.toLocaleString()}, Slut: ${endDate.toLocaleString()}`;
    if (recurring) {
        li.textContent += `, Frekvens: ${frequency}, Antal tillfällen: ${occurrences}`;
    }
    eventList.appendChild(li);

    // Rensa formulärfält efter tillägg
    document.getElementById('event-title').value = '';
    document.getElementById('start-datetime').value = '';
    document.getElementById('end-datetime').value = '';
    document.getElementById('recur-event').checked = false;
    document.getElementById('occurrences').value = '';
    document.getElementById('frequency').value = 'daily';
    document.getElementById('recur-options').style.display = 'none';
}

function generateICS() {
    let icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Your Organization//EN\n`;

    events.forEach(event => {
        icsContent += event;
    });

    icsContent += `END:VCALENDAR`;

    // Skapa en fil och tillåt nedladdning
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);

    const filename = document.getElementById('filename').value || 'kalenderfil';
    const downloadLink = document.getElementById('download-link');
    downloadLink.href = url;
    downloadLink.download = `${filename}.ics`;
    downloadLink.style.display = 'block';
    downloadLink.textContent = 'Ladda ner din ICS-fil';
}
