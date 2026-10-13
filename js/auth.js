const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showError(id, show) {
  document.getElementById(id).style.display = show ? "block" : "none";
}

document.querySelectorAll(".toggle-password").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const input = document.getElementById(btn.dataset.target);
    const hidden = input.type === "password";
    input.type = hidden ? "text" : "password";
    btn.textContent = hidden ? "Hide" : "Show";
  });
});

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  const savedEmail = localStorage.getItem("rememberEmail");
  if (savedEmail) {
    document.getElementById("email").value = savedEmail;
    document.getElementById("remember").checked = true;
  }

  document.getElementById("forgotLink").addEventListener("click", function (e) {
    e.preventDefault();
    alert("Please contact the administrator to reset your password.");
  });

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const emailOk = EMAIL_PATTERN.test(email);
    const passwordOk = password.length >= 6;
    showError("emailError", !emailOk);
    showError("passwordError", !passwordOk);
    if (!emailOk || !passwordOk) return;

    if (document.getElementById("remember").checked) {
      localStorage.setItem("rememberEmail", email);
    } else {
      localStorage.removeItem("rememberEmail");
    }
    window.location.href = "home.html";
  });
}

const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;

    const nameOk = name.length > 0;
    const emailOk = EMAIL_PATTERN.test(email);
    const passwordOk = password.length >= 6;
    const confirmOk = confirm === password && confirm.length > 0;
    showError("nameError", !nameOk);
    showError("emailError", !emailOk);
    showError("passwordError", !passwordOk);
    showError("confirmError", !confirmOk);
    if (!nameOk || !emailOk || !passwordOk || !confirmOk) return;

    alert("Account created successfully! Please sign in.");
    window.location.href = "login.html";
  });
}
