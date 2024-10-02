let events = [];

function addEvent() {
    const title = document.getElementById('title').value;
    const startDate = new Date(document.getElementById('start').value);
    const endDate = new Date(document.getElementById('end').value);
    const start = startDate.toISOString().replace(/-|:|\.\d+/g, '');
    const end = endDate.toISOString().replace(/-|:|\.\d+/g, '');
    const recurring = document.getElementById('recurring').checked;
    const frequency = document.getElementById('frequency').value;
    const count = document.getElementById('count').value;

    let event = `BEGIN:VEVENT\nUID:${Date.now()}@yourdomain.com\n`;
    event += `DTSTAMP:${new Date().toISOString().replace(/-|:|\.\d+/g, '')}\n`;
    event += `DTSTART:${start}\nDTEND:${end}\n`;
    event += `SUMMARY:${title}\n`;

    if (recurring) {
        event += `RRULE:FREQ=${frequency};COUNT=${count}\n`;
    }

    event += `END:VEVENT\n`;

    events.push(event);
    
    // Uppdatera listan på sidan
    const eventList = document.getElementById('eventList');
    const li = document.createElement('li');
    li.textContent = `Titel: ${title}, Start: ${startDate.toLocaleString()}, Slut: ${endDate.toLocaleString()}`;
    if (recurring) {
        li.textContent += `, Återkommande: ${frequency}, Antal: ${count}`;
    }
    eventList.appendChild(li);

    // Rensa fälten efter tillägg
    document.getElementById('title').value = '';
    document.getElementById('start').value = '';
    document.getElementById('end').value = '';
    document.getElementById('recurring').checked = false;
    document.getElementById('count').value = '';
    document.getElementById('frequency').value = 'DAILY';
}

function generateICS() {
    let icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Your Organization//Your Product//EN\n`;
    
    events.forEach(event => {
        icsContent += event;
    });

    icsContent += `END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = url;
    downloadLink.download = 'events.ics';
    downloadLink.style.display = 'block';
    downloadLink.textContent = 'Ladda ner din ICS-fil';
}
