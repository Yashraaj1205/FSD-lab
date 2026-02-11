const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const mobile = document.getElementById('mobile');
const password = document.getElementById('password');
const cPassword = document.getElementById('c-password');
const togglePassword = document.getElementById('togglePassword');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');
const strengthContainer = document.querySelector('.strength-container');
const submitBtn = document.getElementById('submit-btn');
const loader = document.querySelector('.loader');
const btnText = document.querySelector('.btn-text');

// --- EVENT LISTENERS ---

// Toggle Password Visibility
togglePassword.addEventListener('click', () => {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    togglePassword.classList.toggle('fa-eye-slash');
});

// Real-time Password Strength Meter
password.addEventListener('input', () => {
    const val = password.value;
    strengthContainer.style.display = 'block';
    strengthText.style.display = 'block';
    const strength = checkStrength(val);
    
    // Update UI based on strength score (0-4)
    const width = (strength.score + 1) * 20;
    const colors = ['#ff4b4b', '#ff4b4b', '#f1c40f', '#2ecc71', '#2ecc71'];
    const texts = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];

    strengthBar.style.width = `${width}%`;
    strengthBar.style.backgroundColor = colors[strength.score];
    strengthText.innerText = texts[strength.score];
    strengthText.style.color = colors[strength.score];
});

// Form Submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate all inputs before submitting
    const isNameValid = validateField(username, nameRegex, "Name must be 3+ chars & no symbols");
    const isEmailValid = validateField(email, emailRegex, "Enter a valid email address");
    const isMobileValid = validateField(mobile, mobileRegex, "Enter valid 10-digit mobile number");
    const isPassValid = validatePassword();
    const isConfirmValid = validateConfirmPassword();

    if (isNameValid && isEmailValid && isMobileValid && isPassValid && isConfirmValid) {
        startLoading();
        
        // Simulate API Request (2 seconds delay)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        stopLoading();
        showToast('Account created successfully!', 'success');
        form.reset();
        resetStrengthMeter();
    } else {
        shakeForm();
        showToast('Please fix the errors below.', 'error');
    }
});

// --- VALIDATION LOGIC ---

// Regex Patterns
const nameRegex = /^[a-zA-Z\s]{3,}$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const mobileRegex = /^[6-9]\d{9}$/; // Indian mobile format (starts with 6-9)

function validateField(input, regex, errorMsg) {
    if (!regex.test(input.value.trim())) {
        setError(input, errorMsg);
        return false;
    } else {
        setSuccess(input);
        return true;
    }
}

function validatePassword() {
    if (password.value.length < 8) {
        setError(password, "Password must be at least 8 chars");
        return false;
    } else {
        setSuccess(password);
        return true;
    }
}

function validateConfirmPassword() {
    if (cPassword.value === '' || cPassword.value !== password.value) {
        setError(cPassword, "Passwords do not match");
        return false;
    } else {
        setSuccess(cPassword);
        return true;
    }
}

// Check Strength Complexity
function checkStrength(pass) {
    let score = 0;
    if (!pass) return { score: 0 };
    if (pass.length > 5) score++;
    if (pass.length > 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    if (score > 4) score = 4;
    return { score };
}

// --- UTILITIES ---

function setError(input, message) {
    const parent = input.parentElement;
    parent.className = 'input-group error';
    const small = parent.querySelector('small');
    small.innerText = message;
}

function setSuccess(input) {
    const parent = input.parentElement;
    parent.className = 'input-group success';
}

function resetStrengthMeter() {
    strengthBar.style.width = '0%';
    strengthContainer.style.display = 'none';
    strengthText.style.display = 'none';
}

// Loading Spinner Logic
function startLoading() {
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    loader.style.display = 'block';
}

function stopLoading() {
    submitBtn.disabled = false;
    btnText.style.display = 'block';
    loader.style.display = 'none';
}

// Shake Animation on Error
function shakeForm() {
    form.animate([
        { transform: 'translateX(0)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(10px)' },
        { transform: 'translateX(0)' }
    ], { duration: 300 });
}

// Custom Toast Notification
function showToast(msg, type) {
    const toastBox = document.getElementById('toast-box');
    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    
    const icon = type === 'success' ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-exclamation-circle"></i>';
    
    toast.innerHTML = `${icon} ${msg}`;
    toastBox.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 4500);
}