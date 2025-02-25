async function changePassword(event) {
    event.preventDefault(); // পেজ রিলোড বন্ধ করা

    let oldPassword = document.getElementById("oldPassword").value;
    let newPassword = document.getElementById("newPassword").value;
    let confirm_password = document.getElementById("confirmPassword").value;
    let passwordError = document.getElementById("passwordError");
    let changePassBtn = document.getElementById("changePassBtn");

    // ✅ পাসওয়ার্ড মিলছে কিনা চেক করা
    if (newPassword !== confirm_password) {
        passwordError.style.display = "block";
        return;
    } else {
        passwordError.style.display = "none";
    }

    let token = localStorage.getItem("authToken");
    if (!token) {
        alert("You must be logged in to change your password.");
        return;
    }

    let requestData = {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirm_password
    };

    changePassBtn.innerText = "Changing..."; // ✅ লোডিং স্টেট দেখানো
    changePassBtn.disabled = true; // ✅ ডাবল সাবমিশন বন্ধ করা

    try {
        let response = await fetch("http://127.0.0.1:8000/authontication/change_pass/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(requestData)
        });

        if (response.status === 204) {
            alert("Password changed successfully!");
            document.getElementById("changePasswordForm").reset(); // ✅ ফর্ম রিসেট করা
        } else {
            let data = await response.json();
            alert("Error: " + JSON.stringify(data));
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong! Please try again.");
    } finally {
        changePassBtn.innerText = "Change Password"; // ✅ আগের টেক্সটে ফেরত যাওয়া
        changePassBtn.disabled = false;
    }
}
