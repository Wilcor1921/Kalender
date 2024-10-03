let events = [];

function toggleRecurOptions() {
    const recurOptions = document.getElementById('recur-options');
    recurOptions.classList.toggle('hidden');
}

document.getElementById('add-event-button').addEventListener('click', function() {
    const title = document.getElementById('event-title').value;
    const start = document.getElementById('start-datetime').value;
    const end = document.getElementById('end-datetime').value;
    const recurring = document.getElementById('recur-event').checked;
    const frequency = document.getElementById('frequency').value;
    const occurrences = document.getElementById('occurrences').value;

    let eventDetails = {
        title,
        start,
        end,
        recurring: recurring ? { frequency, occurrences } : null
    };

    events.push(eventDetails);
    displayEvents();
});

function displayEvents() {
    const eventList = document.getElementById('added-events');
    eventList.innerHTML = '';

    events.forEach((event, index) => {
        const li = document.createElement('li');
        li.textContent = `${event.title} | Start: ${event.start} | Slut: ${event.end}`;
        if (event.recurring) {
            li.textContent += ` | Frekvens: ${event.recurring.frequency} | Antal: ${event.recurring.occurrences}`;
        }
        eventList.appendChild(li);
    });
}

document.getElementById('generate-ics-button').addEventListener('click', function() {
    let icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Your Organization//EN\n`;

    events.forEach(event => {
        icsContent += `BEGIN:VEVENT\nSUMMARY:${event.title}\nDTSTART:${event.start.replace(/-|:|\.\d+/g, '')}\nDTEND:${event.end.replace(/-|:|\.\d+/g, '')}\n`;
        if (event.recurring) {
            icsContent += `RRULE:FREQ=${event.recurring.frequency.toUpperCase()};COUNT=${event.recurring.occurrences}\n`;
        }
        icsContent += `END:VEVENT\n`;
    });

    icsContent += `END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const filename = document.getElementById('filename').value || 'kalender';
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.ics`;
    link.click();
});

function updateEndDate() {
    const startDatetime = new Date(document.getElementById('start-datetime').value);
    const duration = parseInt(document.getElementById('duration').value);
    
    if (!isNaN(startDatetime)) {
        // Beräkna slutdatum baserat på valda minuter
        const endDatetime = new Date(startDatetime.getTime() + duration * 60000);
        document.getElementById('end-datetime').value = endDatetime.toISOString().slice(0, 16);
    }
}
;
