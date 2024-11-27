document.addEventListener('DOMContentLoaded', function() {
    var clearPaymentBtn = document.getElementById('clearPaymentBtn');
    var clearBillingBtn = document.getElementById('clearBillingBtn');
    var clearContactBtn = document.getElementById('clearContactBtn');

    clearPaymentBtn.onclick = function() {
        clearInputFields(['cardNumber', 'cardHolderName', 'expireDate', 'cvv']);
    };

    clearBillingBtn.onclick = function() {
        clearInputFields(['addressLine1', 'addressLine2', 'townCity', 'province', 'postalCode', 'country']);
    };

    clearContactBtn.onclick = function() {
        clearInputFields(['firstName', 'surname', 'phoneNumber', 'emailAddress']);
    };

    function clearInputFields(ids) {
        for (var i = 0; i < ids.length; i++) {
            var element = document.getElementById(ids[i]);
            if (element) {
                element.value = '';
            }
        }
    }

    var cardHolderNameInput = document.getElementById('cardHolderName');

    cardHolderNameInput.oninput = function(event) {
        this.value = this.value.replace(/[^A-Za-z\s]/g, '');
    };

    var cardNumberInput = document.getElementById('cardNumber');

    cardNumberInput.oninput = function(event) {
        var inputValue = this.value.replace(/\D/g, '');
        var formattedValue = '';
        for (var i = 0; i < inputValue.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += '-';
            }
            formattedValue += inputValue[i];
        }
        this.value = formattedValue.slice(0, 19);
    };

    var expireDateInput = document.getElementById('expireDate');

    expireDateInput.oninput = function(event) {
        var inputValue = this.value.replace(/\D/g, '');
        if (inputValue.length > 2) {
            inputValue = inputValue.slice(0, 2) + '/' + inputValue.slice(2);
        }
        this.value = inputValue.slice(0, 7);
    };

    var cvvInput = document.getElementById('cvv');

    cvvInput.oninput = function(event) {
        var inputValue = this.value.replace(/\D/g, '');
        this.value = inputValue.slice(0, 3);
    };

    var townCityInput = document.getElementById('townCity');
    var provinceInput = document.getElementById('province');
    var countryInput = document.getElementById('country');
    var firstNameInput = document.getElementById('firstName');
    var lastNameInput = document.getElementById('surname');
    var phoneNumberInput = document.getElementById('phoneNumber');

    phoneNumberInput.oninput = function(event) {
        var inputValue = this.value.replace(/\D/g, '');
        this.value = inputValue;
    };

    var inputsToValidate = [townCityInput, provinceInput, countryInput, firstNameInput, lastNameInput];

    inputsToValidate.forEach(function(input) {
        input.oninput = function(event) {
            var inputValue = this.value.replace(/[^A-Za-z\s]/g, '');
            this.value = inputValue;
        };
    });

    document.querySelector('.checkoutForm').onsubmit = function(event) {
        event.preventDefault();
        var cardNumber = document.getElementById('cardNumber').value.trim();
        var cardHolderName = document.getElementById('cardHolderName').value.trim();
        var expireDate = document.getElementById('expireDate').value.trim();
        var cvv = document.getElementById('cvv').value.trim();
        var addressLine1 = document.getElementById('addressLine1').value.trim();
        var townCity = document.getElementById('townCity').value.trim();
        var province = document.getElementById('province').value.trim();
        var postalCode = document.getElementById('postalCode').value.trim();
        var country = document.getElementById('country').value.trim();
        var firstName = document.getElementById('firstName').value.trim();
        var surname = document.getElementById('surname').value.trim();
        var phoneNumber = document.getElementById('phoneNumber').value.trim();
        var emailAddress = document.getElementById('emailAddress').value.trim();

        if (cardNumber !== '' && cardHolderName !== '' && expireDate !== '' && cvv !== '' &&
            addressLine1 !== '' && townCity !== '' && province !== '' && postalCode !== '' &&
            country !== '' && firstName !== '' && surname !== '' && phoneNumber !== '' && emailAddress !== '') {
                showOrderSuccessModal();
            } else {
                alert('Please fill in all fields.');
            }
        };
        
        function showOrderSuccessModal() {
            var modal = document.getElementById("orderSuccessModal");
            var span = document.getElementsByClassName("close")[0];
        
            modal.style.display = "block";
        
            span.onclick = function() {
                modal.style.display = "none";
            }
        
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        }
    }
)
