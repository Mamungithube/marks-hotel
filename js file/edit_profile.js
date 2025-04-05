async function changePassword(event) {
    event.preventDefault();

    let oldPassword = document.getElementById("oldPassword").value;
    let newPassword = document.getElementById("newPassword").value;
    let confirm_password = document.getElementById("confirmPassword").value;
    let passwordError = document.getElementById("passwordError");
    let changePassBtn = document.getElementById("changePassBtn");

    if (newPassword !== confirm_password) {
        passwordError.style.display = "block";
        return;
    } else {
        passwordError.style.display = "none";
    }

    let token = localStorage.getItem("authToken");
    console.log(token);
    if (!token) {
        alert("You must be logged in to change your password.");
        return;
    }

    let requestData = {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirm_password
    };

    changePassBtn.innerText = "Changing...";
    changePassBtn.disabled = true;

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
            document.getElementById("changePasswordForm").reset();
        } else {
            let data = await response.json();
            if (response.status === 400) {
                // ভ্যালিডেশন এরর হ্যান্ডলিং
                let errorMessage = Object.values(data).join("\n");
                alert("Error: " + errorMessage);
            } else {
                alert("Error: " + JSON.stringify(data));
            }
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong! Please try again.");
    } finally {
        changePassBtn.innerText = "Change Password";
        changePassBtn.disabled = false;
    }
}