fetch('https://marks-hotel.vercel.app/authontication/api/profile/', {
  headers: {
    'Authorization': `Token ${localStorage.getItem('authToken')}`
  }
})
.then(res => res.json())
.then(data => {
  document.getElementById('userName').innerText = `User Name : ${data.username}`;
});

// right code 
async function changePassword(event) {
    event.preventDefault();
    console.log("Change password function called"); // Debug log

    // Get form values
    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirm_password = document.getElementById("confirmPassword").value;
    const passwordError = document.getElementById("passwordError");
    const changePassBtn = document.getElementById("changePassBtn");

    // Validate passwords match
    if (newPassword !== confirm_password) {
        passwordError.style.display = "block";
        return;
    }
    passwordError.style.display = "none";

    // Check authentication
    const token = localStorage.getItem("authToken");

    if (!token) {
        alert("লগইন করা নেই! প্রথমে লগইন করুন।");
        window.location.href = "/login.html"; // লগইন পেজে রিডাইরেক্ট করুন
        return;
    }

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Token ${token.trim()}`, // টোকেনের সাথে whitespace থাকলে trim() করুন
    };

    // Prepare request data
    const requestData = {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirm_password
    };

    // Update button state
    changePassBtn.innerText = "Changing...";
    changePassBtn.disabled = true;

    try {
        console.log("Sending request to server..."); // Debug log
        const response = await fetch("https://marks-hotel.vercel.app/authontication/change_pass/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            },
            body: JSON.stringify(requestData)
        });

        console.log("Response received:", response); // Debug log

        if (response.ok) {
            const data = await response.json().catch(() => ({}));
            alert(data.message || "Password changed successfully!");
            document.getElementById("changePasswordForm").reset();
        } else {
            const errorData = await response.json().catch(() => ({ detail: "Unknown error occurred" }));
            console.error("Error details:", errorData); // Debug log
            alert(`Error: ${errorData.detail || Object.values(errorData).join("\n")}`);
        }
    } catch (error) {
        console.error("Network error:", error); // Debug log
        alert("Network error: Please check your connection and try again.");
    } finally {
        changePassBtn.innerText = "Change Password";
        changePassBtn.disabled = false;
    }
}

// Add this helper function if you need CSRF token
const token = localStorage.getItem("authToken"); // or you can directly set token value here

// API GET: Fetch profile info
fetch("https://marks-hotel.vercel.app/authontication/api/profile/", {
  headers: {
    "Authorization": `Token ${token}`
  }
})
  .then(res => res.json())
  .then(data => {
    console.log(data);
    // Pre-fill form with data
    document.getElementById("id").value = data.id || '';
    document.getElementById("firstName").value = data.first_name || '';
    document.getElementById("lastName").value = data.last_name || '';
    document.getElementById("email").value = data.email || '';
    document.getElementById("username").value = data.username || '';
  })
  .catch(err => {
    console.error("Profile load error:", err);
  });

// API PUT: Update profile on submit
document.getElementById("profileForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const updatedData = {
    id: document.getElementById("id").value,
    first_name: document.getElementById("firstName").value,
    last_name: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
  };

  fetch("https://marks-hotel.vercel.app/authontication/api/profile/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`
    },
    body: JSON.stringify(updatedData)
  })
    .then(res => {
      if (res.ok) {
        document.getElementById("successMsg").style.display = "block";
      } else {
        return res.json().then(data => {
          alert("Error: " + JSON.stringify(data));
        });
      }
    })
    .catch(err => {
      console.error("Profile update error:", err);
    });
});