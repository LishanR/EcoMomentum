window.addEventListener('scroll', function() {
    var navbar = document.getElementById('navbar');
    if (window.scrollY > 50) { // Adjust as needed
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const stepBoxes = document.querySelectorAll('.step-box');
        const prevButton = document.getElementById('prev');
        const nextButton = document.getElementById('next');
        const submitButton = document.getElementById('submit');
        const progressBar = document.querySelector('.progress');
    
        let currentStep = 0;
        const totalSteps = stepBoxes.length;
        const answers = [];
    
    
        function showStep(n) {
            for (let i = 0; i < stepBoxes.length; i++) {
                stepBoxes[i].style.display = 'none';
            }
    
            stepBoxes[n].style.display = 'block';
    
            if (n === 0) {
                prevButton.disabled = true;
                nextButton.disabled = false;
                submitButton.style.display = 'none';
            } else if (n === totalSteps - 1) {
                prevButton.disabled = false;
                nextButton.style.display = 'none';
                submitButton.style.display = 'inline-block';
            } else {
                prevButton.disabled = false;
                nextButton.disabled = false;
                submitButton.style.display = 'none';
            }
        }

        function nextStep() {
            const answerTextareas = stepBoxes[currentStep].querySelectorAll('textarea');
            const stepAnswers = [];

            let isValid = true;
            answerTextareas.forEach(textarea => {
                if (textarea.value.trim() === '') {
                    isValid = false;
                    textarea.classList.add('error'); 
                } else {
                    textarea.classList.remove('error');
                }
                stepAnswers.push(textarea.value);
            });

            if (isValid) {
                answers[currentStep] = stepAnswers;
                currentStep++;
                showStep(currentStep);
                updateProgressBar();
            } else {
                alert("Please fill in all fields before proceeding.");
            }
        }

        function prevStep() {
            currentStep--;
            showStep(currentStep);
        }
    
        function updateProgressBar() {
            const percent = ((currentStep ) / 4) * 100;
            progressBar.style.width = percent + '%';
        }

        function submitQuiz() {
            const answerTextareas = stepBoxes[currentStep].querySelectorAll('textarea');
            const stepAnswers = [];
    
            answerTextareas.forEach(textarea => {
                stepAnswers.push(textarea.value);
            });
    
            answers[currentStep] = stepAnswers;

            progressBar.style.width = '100%';
    
            const formattedAnswers = answers.map((stepAnswers, index) => {
                return `Step ${index + 1}:\n${stepAnswers.map((answer, i) => `Question ${i + 1}: ${answer}`).join('\n')}\n`;
            });
    
            alert("Your answers have been successfully submitted:\n\n" + formattedAnswers.join('\n'));
            
        }
    
        nextButton.addEventListener('click', nextStep);
        prevButton.addEventListener('click', prevStep);
        submitButton.addEventListener('click', submitQuiz);

