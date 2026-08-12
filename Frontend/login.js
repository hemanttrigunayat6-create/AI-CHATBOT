const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    try {

        const response = await fetch("/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const result = await response.json();

        if (result.message === "Login Successful") {

            localStorage.setItem("userEmail", email);

            alert("Login Successful");

            window.location.href = "chat.html";

        }
        else {

            alert(result.message);

        }

    }
    catch (error) {

        console.error(error);

        alert("Unable to login. Please try again.");

    }

});