
fetch("https://marks-hotel.vercel.app/api/bookings/")
.then(response => response.json())
.then(data => {
    data.forEach(item => {
        // console.log(item);
    });
})