// async function changePassword(event) {
//     event.preventDefault();

//     let oldPassword = document.getElementById("oldPassword").value;
//     let newPassword = document.getElementById("newPassword").value;
//     let confirm_password = document.getElementById("confirmPassword").value;
//     let passwordError = document.getElementById("passwordError");
//     let changePassBtn = document.getElementById("changePassBtn");

//     if (newPassword !== confirm_password) {
//         passwordError.style.display = "block";
//         return;
//     } else {
//         passwordError.style.display = "none";
//     }

//     let token = localStorage.getItem("authToken");
//     console.log(token);
//     if (!token) {
//         alert("You must be logged in to change your password.");
//         return;
//     }

//     let requestData = {
//         old_password: oldPassword,
//         new_password: newPassword,
//         confirm_password: confirm_password
//     };

//     changePassBtn.innerText = "Changing...";
//     changePassBtn.disabled = true;

//     try {
//         let response = await fetch("http://127.0.0.1:8000/authontication/change_pass/", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Token ${token}`
//             },
//             body: JSON.stringify(requestData)
//         });

//         if (response.status === 204) {
//             alert("Password changed successfully!");
//             document.getElementById("changePasswordForm").reset();
//         } else {
//             let data = await response.json();
//             if (response.status === 400) {
//                 // ভ্যালিডেশন এরর হ্যান্ডলিং
//                 let errorMessage = Object.values(data).join("\n");
//                 alert("Error: " + errorMessage);
//             } else {
//                 alert("Error: " + JSON.stringify(data));
//             }
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         alert("Something went wrong! Please try again.");
//     } finally {
//         changePassBtn.innerText = "Change Password";
//         changePassBtn.disabled = false;
//     }
// }

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
        const response = await fetch("http://127.0.0.1:8000/authontication/change_pass/", {
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
