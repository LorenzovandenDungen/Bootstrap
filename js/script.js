// js/script.js
document.addEventListener('DOMContentLoaded', function() {
    const reservationForm = document.getElementById('reservationForm');
    const customerDetailsDiv = document.getElementById('customerDetails');
    const lessonsDiv = document.getElementById('lessons');
    const totalCostDiv = document.getElementById('totalCost');

    let customerDetails = {};
    let lessons = [];
    let totalCost = 0;
    const lessonCost = 10;

    function updateCustomerDetails() {
        customerDetailsDiv.innerHTML = `
            <p>Naam: ${customerDetails.name}</p>
            <p>Klantnummer: ${customerDetails.customerNumber}</p>
            <p>Telefoon: ${customerDetails.phone}</p>
            <p>Emailadres: ${customerDetails.email}</p>
            <hr>
        `;
    }

    function updateLessons() {
        lessonsDiv.innerHTML = '';
        lessons.forEach((lesson, index) => {
            lessonsDiv.innerHTML += `
                <h4>Les ${index + 1}:</h4>
                <p>Soort: ${lesson.lessonType}</p>
                <p>Kosten: €${lesson.cost.toFixed(2)}</p>
                <p>Dag en tijd: ${new Date(lesson.dateAndTime).toLocaleString('nl-NL')}</p>
                <hr>
            `;
        });
    }

    function updateTotalCost() {
        totalCostDiv.innerHTML = `<h4>Totale kosten: €${totalCost.toFixed(2)}</h4>`;
    }

    reservationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const customerNumber = document.getElementById('customerNumber').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const lessonType = document.getElementById('lessonType').value;
        const dateAndTime = document.getElementById('dateAndTime').value;

        if (lessons.length >= 3) {
            alert('U kunt maximaal drie lessen reserveren.');
            return;
        }

        if (!customerDetails.name) {
            customerDetails = { name, customerNumber, phone, email };
            updateCustomerDetails();
        }

        const existingLesson = lessons.find(lesson => lesson.dateAndTime === dateAndTime);
        if (existingLesson) {
            alert('U kunt niet meerdere lessen op hetzelfde tijdstip boeken.');
            return;
        }

        const lessonTime = new Date(dateAndTime).getHours();
        let discountedCost = lessonCost;
        if (lessonTime >= 11 && lessonTime < 16) {
            discountedCost *= 0.7; // Apply 30% discount
        }

        lessons.push({
            lessonType: lessonType,
            dateAndTime: dateAndTime,
            cost: discountedCost
        });

        totalCost += discountedCost;

        updateLessons();
        updateTotalCost();

        reservationForm.elements['lessonType'].value = '';
        reservationForm.elements['dateAndTime'].value = '';
    });
});
