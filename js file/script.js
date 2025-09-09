
fetch("https://marks-hotel-backend.onrender.com//api/bookings/")
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            // console.log(item);
        });
    })

// Modal image viewer logic
const modalImage = document.getElementById("modalImage");
document.querySelectorAll(".gallery-item").forEach(item => {
    item.addEventListener("click", () => {
        const imgSrc = item.getAttribute("data-img");
        modalImage.src = imgSrc;
    });
});

// Optional: Delay fade-in animation for effect
document.querySelectorAll(".fade-in").forEach((el, i) => {
    el.style.animationDelay = `${i * 0.2}s`;
});