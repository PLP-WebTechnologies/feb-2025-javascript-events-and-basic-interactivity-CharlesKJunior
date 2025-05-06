// script.js
document.addEventListener('DOMContentLoaded', function() {
    // ========== Event Handling ==========
    
    // Button click event
    const clickMeBtn = document.getElementById('click-me');
    clickMeBtn.addEventListener('click', function() {
        this.textContent = 'You clicked me!';
        this.style.backgroundColor = '#ff5722';
        setTimeout(() => {
            this.textContent = 'Click Me!';
            this.style.backgroundColor = '#4CAF50';
        }, 1500);
    });
    
    // Hover effects
    const hoverArea = document.getElementById('hover-area');
    hoverArea.addEventListener('mouseenter', function() {
        this.textContent = 'Mouse is over me!';
    });
    hoverArea.addEventListener('mouseleave', function() {
        this.textContent = 'Hover Over Me';
    });
    
    // Keypress detection
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    keypressInput.addEventListener('keyup', function(e) {
        keypressOutput.textContent = `You typed: ${this.value}`;
    });
    
    // Secret double click
    const secretTrigger = document.getElementById('secret-trigger');
    secretTrigger.addEventListener('dblclick', function() {
        this.textContent = '🎉 You found the secret! 🎊';
        this.style.backgroundColor = '#9c27b0';
        this.style.color = 'white';
    });
    
    // ========== Interactive Elements ==========
    
    // Color changer button
    const colorChanger = document.getElementById('color-changer');
    const colors = ['#ff5722', '#2196F3', '#4CAF50', '#9C27B0', '#FFC107'];
    let colorIndex = 0;
    colorChanger.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.textContent = `Color ${colorIndex + 1}`;
    });
    
    // Image gallery
    const images = document.querySelectorAll('.image-gallery img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImage = 0;
    
    function showImage(index) {
        images.forEach(img => img.classList.remove('active'));
        images[index].classList.add('active');
    }
    
    nextBtn.addEventListener('click', function() {
        currentImage = (currentImage + 1) % images.length;
        showImage(currentImage);
    });
    
    prevBtn.addEventListener('click', function() {
        currentImage = (currentImage - 1 + images.length) % images.length;
        showImage(currentImage);
    });
    
    // Auto-advance gallery every 3 seconds
    setInterval(() => {
        currentImage = (currentImage + 1) % images.length;
        showImage(currentImage);
    }, 3000);
    
    // Accordion
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const content = this.nextElementSibling;
            content.classList.toggle('active');
            
            // Close other accordion items
            accordionBtns.forEach(otherBtn => {
                if (otherBtn !== this) {
                    otherBtn.nextElementSibling.classList.remove('active');
                }
            });
        });
    });
    
    // ========== Form Validation ==========
    const form = document.getElementById('user-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordStrength = document.querySelector('.password-strength');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    function validateName() {
        const error = nameInput.nextElementSibling;
        if (nameInput.value.trim() === '') {
            error.textContent = 'Name is required';
            return false;
        } else {
            error.textContent = '';
            return true;
        }
    }
    
    function validateEmail() {
        const error = emailInput.nextElementSibling;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value.trim() === '') {
            error.textContent = '';
            return true;
        } else if (!emailRegex.test(emailInput.value)) {
            error.textContent = 'Please enter a valid email address';
            return false;
        } else {
            error.textContent = '';
            return true;
        }
    }
    
    function validatePassword() {
        const error = passwordInput.nextElementSibling;
        const strengthBar = passwordStrength.querySelector('::after');
        let strength = 0;
        
        if (passwordInput.value.length === 0) {
            error.textContent = '';
            passwordStrength.style.setProperty('--width', '0%');
            return false;
        } else if (passwordInput.value.length < 8) {
            error.textContent = 'Password must be at least 8 characters';
            passwordStrength.style.setProperty('--width', '30%');
            passwordStrength.style.backgroundColor = 'red';
            return false;
        } else {
            error.textContent = '';
            
            // Simple strength calculation
            if (passwordInput.value.length > 10) strength += 30;
            if (/[A-Z]/.test(passwordInput.value)) strength += 20;
            if (/[0-9]/.test(passwordInput.value)) strength += 20;
            if (/[^A-Za-z0-9]/.test(passwordInput.value)) strength += 30;
            
            // Update strength meter
            passwordStrength.style.setProperty('--width', `${strength}%`);
            passwordStrength.style.backgroundColor = 
                strength < 50 ? 'red' : 
                strength < 80 ? 'orange' : 'green';
            
            return true;
        }
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            alert('Form submitted successfully!');
            form.reset();
            passwordStrength.style.setProperty('--width', '0%');
        } else {
            alert('Please fix the errors in the form');
        }
    });
});