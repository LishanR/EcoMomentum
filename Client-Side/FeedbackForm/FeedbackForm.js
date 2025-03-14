window.addEventListener('scroll', function() {
    var navbar = document.getElementById('navbar');
    if (window.scrollY > 50) { // Adjust as needed
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('feedbackForm');
    const FNameInput = document.getElementById('FName');
    const SurnameInput = document.getElementById('Surname');
    const emailInput = document.getElementById('email');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const feedbackInput = document.getElementById('feedbackArea');
    const ratingInput = document.getElementsByName('rate');

    const FNameError = document.getElementById('FNameError');
    const SurnameError = document.getElementById('SurnameError');
    const emailError = document.getElementById('emailError');
    const phoneNumberError = document.getElementById('phoneNumberError');
    const feedbackError = document.getElementById('feedbackError');
    const ratingError = document.getElementById('ratingError');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        // Reset error messages
        FNameError.textContent = '';
        SurnameError.textContent = '';
        emailError.textContent = '';
        phoneNumberError.textContent = '';
        feedbackError.textContent = '';
        ratingError.textContent = '';

        let isValid = true;

        // Validate First Name
        if (FNameInput.value.trim() === '') {
            FNameError.textContent = 'Please enter your first name.';
            isValid = false;
        }

        // Validate Surname
        if (SurnameInput.value.trim() === '') {
            SurnameError.textContent = 'Please enter your surname.';
            isValid = false;
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        // Validate Phone Number
        const phoneRegex = /^\d+$/;
        if (!phoneRegex.test(phoneNumberInput.value.trim())) {
            phoneNumberError.textContent = 'Please enter a valid phone number.';
            isValid = false;
        }

        // Validate Feedback
        if (feedbackInput.value.trim() === '') {
            feedbackError.textContent = 'Please provide your feedback.';
            isValid = false;
        }

        // Validate Rating
        let isRatingSelected = false;
        for (let i = 0; i < ratingInput.length; i++) {
            if (ratingInput[i].checked) {
                isRatingSelected = true;
                break;
            }
        }
        if (!isRatingSelected) {
            ratingError.textContent = 'Please select a rating.';
            isValid = false;
        }

        if (isValid) {
            // Display a prompt with a "Thank you" message
            alert('Thank you for your feedback!');

            // Optionally, reset the form after submission
            form.reset();
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        // Display a prompt with a "Thank you" message
        // alert('Thank you for your feedback!');
        alert('Please note that the form is idle and does not submit any data! Data submission will be added soon.');

        // Optionally, reset the form after submission
        form.reset();
    });
});

