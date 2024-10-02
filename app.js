let events = [];

function addEvent() {
    const title = document.getElementById('title').value;
    const start = new Date(document.getElementById('start').value).toISOString().replace(/-|:|\.\d+/g, '');
    const end = new Date(document.getElementById('end').value).toISOString().replace(/-|:|\.\d+/g, '');
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
    alert('Händelse tillagd!');
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
