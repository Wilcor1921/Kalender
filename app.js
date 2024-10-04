let events = [];

function toggleRecurOptions() {
    const recurOptions = document.getElementById('recur-options');
    const recurEventChecked = document.getElementById('recur-event').checked;
    recurOptions.style.display = recurEventChecked ? 'block' : 'none';
}

function addEvent() {
    const title = document.getElementById('event-title').value;
    const startDate = new Date(document.getElementById('start-datetime').value);
    const duration = document.getElementById('duration').value;

    if (!title || isNaN(startDate.getTime())) {
        alert('Vänligen fyll i alla fält korrekt.');
        return;
    }

    let endDate;
    if (duration === "full-day") {
        endDate = new Date(startDate);
        endDate.setHours(23, 59, 0, 0);
    } else {
        const durationMinutes = {
            "15min": 15, "30min": 30, "1h": 60, "1.5h": 90, "2h": 120,
            "3h": 180, "4h": 240, "5h": 300, "6h": 360, "7h": 420, "8h": 480
        };
        endDate = new Date(startDate.getTime() + durationMinutes[duration] * 60000);
    }

    const start = startDate.toISOString().replace(/-|:|\.\d+/g, '');
    const end = endDate.toISOString().replace(/-|:|\.\d+/g, '');

    let event = `BEGIN:VEVENT\nUID:${Date.now()}@yourdomain.com\n`;
    event += `DTSTAMP:${new Date().toISOString().replace(/-|:|\.\d+/g, '')}\n`;
    event += `DTSTART:${start}\nDTEND:${end}\n`;
    event += `SUMMARY:${title}\n`;

    if (document.getElementById('recur-event').checked) {
        const frequency = document.getElementById('frequency').value;
        const occurrences = document.getElementById('occurrences').value || 1;
        event += `RRULE:FREQ=${frequency.toUpperCase()};COUNT=${occurrences}\n`;
    }

    event += `END:VEVENT\n`;

    events.push(event);

    const li = document.createElement('li');
    li.textContent = `Titel: ${title}, Start: ${startDate.toLocaleString()}, Slut: ${endDate.toLocaleString()}`;
    document.getElementById('added-events').appendChild(li);
}

function generateICS() {
    if (events.length === 0) {
        alert("Lägg till minst en händelse innan du genererar filen.");
        return;
    }

    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Your Organization//EN\n";
    icsContent += events.join('');
    icsContent += "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const filename = document.getElementById('filename').value || 'calendar';
    const downloadLink = document.getElementById('download-link');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${filename}.ics`;
    downloadLink.style.display = 'block';
    downloadLink.click();

    events = [];
    document.getElementById('added-events').innerHTML = '';
}
