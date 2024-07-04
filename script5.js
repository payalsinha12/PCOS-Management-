// Function to open the password modal
function createPassword() {
  // Validate registration form
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  if (name && email && phone) {
    document.getElementById('passwordModal').style.display = 'block';
  } else {
    alert('Please fill out all fields.');
  }
}

// Function to close the password modal
function closeModal() {
  document.getElementById('passwordModal').style.display = 'none';
}

// Function to save the password and show success message
function savePassword() {
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password === confirmPassword) {
    // Here, you'd typically send the password to your server
    alert('Password saved successfully!');
    document.getElementById('passwordModal').style.display = 'none';
  } else {
    alert('Passwords do not match.');
  }
}

// Function to open the forgot password modal
function openForgotPassword() {
  document.getElementById('forgotPasswordModal').style.display = 'block';
}

// Function to close the forgot password modal
function closeForgotPasswordModal() {
  document.getElementById('forgotPasswordModal').style.display = 'none';
}

// Function to send OTP for forgot password
function sendOTP() {
  const email = document.getElementById('forgotEmail').value;
  if (email) {
    // Simulate sending OTP
    document.getElementById('forgotPasswordModal').style.display = 'none';
    document.getElementById('otpSection').style.display = 'block';
    // In a real application, you would send an OTP to the user's email
    alert('OTP has been sent to your email.');
  } else {
    alert('Please enter your email address.');
  }
}

// Function to verify OTP and log in
function verifyOTP() {
  const otp = document.getElementById('otp').value;
  if (otp) {
    // Simulate OTP verification
    document.getElementById('otpSection').style.display = 'none';
    alert('OTP verified. You can now log in.');
    // Redirect to login page or perform login action
  } else {
    alert('Please enter the OTP.');
  }
}

// Add event listeners for modals and buttons
window.onload = function() {
  // Add event listener to forgot password link
  const forgotPasswordLink = document.querySelector('.login-section p a');
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', openForgotPassword);
  }

  // Add event listeners to modal close buttons
  const closeButtons = document.querySelectorAll('.close');
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
      });
    });
  });

  // Add event listener to send OTP button
  document.getElementById('sendOTPButton').addEventListener('click', sendOTP);

  // Add event listener to verify OTP button
  document.getElementById('verifyOTPButton').addEventListener('click', verifyOTP);
};
