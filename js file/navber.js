fetch("navber.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;

    const navElement = document.getElementById("auth");
    const token = localStorage.getItem("authToken");

    if (token) {
      fetch("http://127.0.0.1:8000/authontication/admins/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.is_admin) {
            navElement.innerHTML += `
                    <a href="#booking" class="booking-btn">Booking Now</a>
                        <div class="dropdown">
                            <a class="booking-btn dropdown-toggle dropdown-toggle-split" type="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                profile
                            </a>
                            <ul class="dropdown-menu dropdown-menu-dark">
                                <li><a class="dropdown-item" href="./edit_profie.html">Edit profile</a></li>
                                <li><a class="dropdown-item" href="./edit_profie.html">Change password</a></li>
                                <li><a class="dropdown-item" href="./admin deshboard.html">My deshboard</a></li>
                                <li><button class="dropdown-item" onclick="handleLogout(event)">Sign Out</button></li>
                            </ul>
                        </div>
            `;
          } else {
            navElement.innerHTML += `
                      <a href="#booking" class="booking-btn">Booking Now</a>
                        <div class="dropdown">
                            <a class="booking-btn dropdown-toggle dropdown-toggle-split" type="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                profile
                            </a>
                            <ul class="dropdown-menu dropdown-menu-dark">
                                <li><a class="dropdown-item" href="./edit_profie.html">Edit profile</a></li>
                                <li><a class="dropdown-item" href="./edit_profie.html">Change password</a></li>
                                <li><a class="dropdown-item" href="./user deshboard.html">My deshboard</a></li>
                                <li><button class="dropdown-item" onclick="handleLogout(event)">Sign Out</button></li>
                            </ul>
                        </div>
            `;
          }
        });
    } else {
      navElement.innerHTML += `
      <a href="./loginpage.html" class="booking-btn">Sign-in</a>
      `;
    }
  });

// // main nevber

  fetch("main navber.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("main_navbar").innerHTML = data;
    const navElement = document.getElementById("navbarNav");
    const token = localStorage.getItem("authToken");

    if (token) {
      fetch("http://127.0.0.1:8000/authontication/admins/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.is_admin) {
            navElement.innerHTML += `
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link active" href="./index.html">Home</a>
              </li>
              <li class="nav-item">
                    <a class="nav-link" href="./show reviews.html">Reviews</a>
                </li>
            </ul>
            `;
          } else {
            navElement.innerHTML += `
        
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link active" href="./index.html">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#room">Rooms</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#about">About Us</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#survice">Survice</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./show reviews.html">Reviews</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./contact.html">Contact</a>
                </li>
            </ul>
            `;
          }
        });
    } else {
      navElement.innerHTML += `
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link active" href="./index.html">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#survice">Survice</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#footer">News</a>
                </li>
            </ul>
      `;
    }
  });