function addContact(event) {
    event.preventDefault();

    const name = document.querySelector('input[name="name"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const message = document.querySelector('textarea[name="message"]').value.trim();

    // ফিল্ড খালি থাকলে সাবমিট না করা
    if (!name || !email || !message) {
        document.getElementById('con-message').textContent = "All fields are required.";
        document.getElementById('con-message').style.color = "red";
        return;
    }

    const data = {
        name: name,
        email: email,
        problem: message
    };

    fetch('https://marks-hotel.vercel.app/gust/contect/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(JSON.stringify(err)); });
        }
        return response.json();
    })
    .then(data => {
        console.log("Success:", data);
        document.getElementById('con-message').textContent = "Thank you! Your message has been sent.";
        document.getElementById('con-message').style.color = "green";
        document.getElementById('contact-form').reset(); // ফর্ম খালি করা
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById('con-message').textContent = "Submission failed. Check console for details.";
        document.getElementById('con-message').style.color = "red";
    });
}