document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    // Option 1: Log the form data to the console (for testing purposes)
    console.log('Form Data:', formObject);

    // Option 2: Send the form data to a server endpoint using Fetch API
    fetch('https://jsonplaceholder.typicode.com/posts', { // Mock server endpoint for testing
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formObject)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('Thank you for contacting us. We will get back to you shortly.');
        document.getElementById('contactForm').reset();
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Sorry, there was an error sending your message. Please try again later.');
    });
});
