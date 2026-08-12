const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    try {

        const response = await fetch("/signup", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                password
            })

        });

        const result = await response.json();

        alert(result.message);

        if (result.message === "Signup Successful") {
            window.location.href = "login.html";
        }

    }
    catch (error) {

        console.error(error);

        alert("Something went wrong. Please try again.");

    }

});