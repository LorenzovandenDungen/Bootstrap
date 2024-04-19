// script.js

document.addEventListener('DOMContentLoaded', function () {
    // Hier kun je JavaScript-functionaliteit toevoegen
    const form = document.getElementById('reservationForm');
    const outputName = document.getElementById('outputName');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Voorkom standaardgedrag van het formulier

        // Verkrijg ingevoerde waarden
        const name = document.getElementById('name').value;

        // Toon de reserveringsdetails
        outputName.textContent = name;
    });
});
