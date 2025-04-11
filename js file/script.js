
fetch("http://127.0.0.1:8000/api/bookings/")
.then(response => response.json())
.then(data => {
    data.forEach(item => {
        // console.log(item);
    });
})