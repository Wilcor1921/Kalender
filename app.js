document.getElementById('recurring').addEventListener('change', function() {
    const recurringOptions = document.getElementById('recurring-options');
    if (this.checked) {
        recurringOptions.style.display = 'block';
    } else {
        recurringOptions.style.display = 'none';
    }
});

// Funktion för att lägga till händelse
document.getElementById('add-event').addEventListener('click', function() {
    const title = document.getElementById('event-title').value;
    const start = document.getElementById('start-datum').value;
    const end = document.getElementById('slut-datum').value;

    // Kontrollera om sluttid ska justeras
    if (start) {
        const startDate = new Date(start);
        const adjustedEnd = new Date(startDate);
        adjustedEnd.setHours(adjustedEnd.getHours() + 1); // Justera till en timme senare

        document.getElementById('slut-datum').value = adjustedEnd.toISOString().slice(0, 16); // Justera sluttiden

        const eventList = document.getElementById('event-list');
        const li = document.createElement('li');
        li.textContent = `Titel: ${title}, Start: ${start}, Slut: ${adjustedEnd.toISOString().slice(0, 16)}`;
        eventList.appendChild(li);
    } else {
        alert("Vänligen ange en starttid.");
    }
});

// Funktion för att generera ICS
document.getElementById('generate-ics').addEventListener('click', function() {
    // Här skulle du lägga till logik för att generera en ICS-fil
    alert("ICS-fil skulle genereras här.");
});
