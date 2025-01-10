document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.newsletter-form');
    const formStatus = document.getElementById('form-status');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const email = form.querySelector('input[type="email"]').value;
        const submitButton = form.querySelector('button');
        
        // Disable the submit button during submission
        submitButton.disabled = true;
        submitButton.textContent = 'Subscribing...';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                // Success
                formStatus.textContent = 'Thanks for subscribing!';
                formStatus.className = 'success-message';
                form.reset();
            } else {
                // Error
                formStatus.textContent = 'Oops! There was a problem. Please try again.';
                formStatus.className = 'error-message';
            }
        } catch (error) {
            formStatus.textContent = 'Oops! There was a problem. Please try again.';
            formStatus.className = 'error-message';
        }

        // Re-enable the submit button
        submitButton.disabled = false;
        submitButton.textContent = 'Subscribe';
    });
});