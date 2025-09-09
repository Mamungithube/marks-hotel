const handleRegister = (event) => {
    event.preventDefault();
    const form = document.getElementById("register-form");
    const formData = new FormData(form);
  
    const registerData = {
      username: formData.get("username"),
      first_name: formData.get("FirstName"),
      last_name: formData.get("LastName"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirm_password: formData.get("confirmPassword"),
    };
  
    console.log("Registration data", registerData);
  
    fetch("https://marks-hotel-backend.onrender.com//authontication/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    })
      .then((res) => {
        alert(
          "Registration Successful. Please check your email for a confirmation."
        );
        window.location.href = "https://mark-s.netlify.app/chack_mail.html";
      })
      .catch((error) => console.log("Registration Error", error));
  };
  
  
  
  // login
  
  const handleLogin = (event) => {
    event.preventDefault();
    const form = document.getElementById("login-form");
    const formData = new FormData(form);
  
    const loginData = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    fetch("https://marks-hotel-backend.onrender.com//authontication/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.detail || "Login failed");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        console.log("Auth token received:", data.token);
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user_id", data.user_id);
    
        return Swal.fire({
          icon: 'success',
          title: 'Login!',
          text: 'Login successfully!',
          confirmButtonText: 'OK'
        });
      })
      .then(() => {
        window.location.href = "./index.html";
      })
      .catch((err) => {
        console.log("Login error", err.message);
        alert("Login failed: " + err.message);
      });
  };
  document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.querySelector(".dropdown-item");
    if (logoutButton) {
        logoutButton.addEventListener("click", handleLogout);
    }
});


function handleLogout(event) {
    event.preventDefault();
    console.log(event);
    const token = localStorage.getItem("authToken");
    if (!token) {
        console.error("No token found! User might not be logged in.");
        return;
    }

    fetch("https://marks-hotel-backend.onrender.com//authontication/logout/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
    })
    .then((res) => {
        if (res.status === 204) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("user_id");
            window.location.href = "loginpage.html";
        } else {
            return res.json();
        }
    })
    .then((data) => {
        if (data) {
            console.error("Logout Failed:", data);
        }
    })
    .catch((error) => console.error("Fetch Error:", error));
}

