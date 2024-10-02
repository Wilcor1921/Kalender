function generateICS() {
    const title = document.getElementById('title').value;
    const start = new Date(document.getElementById('start').value).toISOString().replace(/-|:|\.\d+/g, '');
    const end = new Date(document.getElementById('end').value).toISOString().replace(/-|:|\.\d+/g, '');
    const recurring = document.getElementById('recurring').checked;
    const frequency = document.getElementById('frequency').value;
    const count = document.getElementById('count').value;

    let icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Your Organization//Your Product//EN\n`;
    icsContent += `BEGIN:VEVENT\nUID:${Date.now()}@yourdomain.com\n`;
    icsContent += `DTSTAMP:${new Date().toISOString().replace(/-|:|\.\d+/g, '')}\n`;
    icsContent += `DTSTART:${start}\nDTEND:${end}\n`;
    icsContent += `SUMMARY:${title}\n`;

    if (recurring) {
        icsContent += `RRULE:FREQ=${frequency};COUNT=${count}\n`;
    }

    icsContent += `END:VEVENT\nEND:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = url;
    downloadLink.download = 'event.ics';
    downloadLink.style.display = 'block';
    downloadLink.textContent = 'Click here to download your ICS file';
}