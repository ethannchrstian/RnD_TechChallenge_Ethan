   // Ambil semua element form
    const form = document.getElementById('registrationForm');
    const nameInput = document.getElementById('name');
    const nimInput = document.getElementById('nim');
    const emailInput = document.getElementById('email');
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    
    // Ambil semua error msg
    const nameError = document.getElementById('nameError');
    const nimError = document.getElementById('nimError');
    const emailError = document.getElementById('emailError');
    const genderError = document.getElementById('genderError');
    const formStatus = document.getElementById('formStatus');
    
    // Event listener untuk validasi instant ketika user mengetik 
    nameInput.addEventListener('keyup', validateName);
    nimInput.addEventListener('keyup', validateNIM);
    emailInput.addEventListener('keyup', validateEmail);
    
    // Event listener untuk submit form
    form.addEventListener('submit', function(e) {

      // Memastikan default behaviornya tidak dilakukan ketika submit
      e.preventDefault();
      
      // Validasi semua data yang di-isi terlebih dahulu
      const isNameValid = validateName();
      const isNIMValid = validateNIM();
      const isEmailValid = validateEmail();
      const isGenderValid = validateGender();
      
      // Jika semua data telah tervalidasi, berikan success message dan reset form
      if (isNameValid && isNIMValid && isEmailValid && isGenderValid) {
        showFormSuccess("Form submitted successfully! Thank you for registering.");
        form.reset(); // Reset form
      } else {
        // Jika ada yang salah, berikan error message
        showFormError("Please fix the errors before submitting.");
      }
    });
    
    /**
     * Validasi untuk nama
     * Harus minimal 3 characters
     */
    function validateName() {
      const nameValue = nameInput.value.trim();
      
      if (nameValue === '') {
        // Cek jika nama kosong
        showError(nameError, "Name is required");
        return false;
      } else if (nameValue.length < 3) {
        // Cek jika nama lebih dari 3 karakter atau tidak
        showError(nameError, "Name must be at least 3 characters");
        return false;
      } else {
        // Name yang diisi valid
        showSuccess(nameError, "");
        return true;
      }
    }
    
    /**
     * Validasi untuk NIM
     * Harus 10 digit
     */
    function validateNIM() {
      const nimValue = nimInput.value.trim();
      const nimRegex = /^\d{10}$/; // Memastikan 10 digit
      
      if (nimValue === '') {
        // Cek jika kosong
        showError(nimError, "Student ID (NIM) is required");
        return false;
      } else if (!nimRegex.test(nimValue)) {
        // Cek jika NIM sesuai format
        showError(nimError, "NIM must be exactly 10 digits");
        return false;
      } else {
        // NIMnya valid
        showSuccess(nimError, "");
        return true;
      }
    }
    
    /**
     * Validasi untuk email
     * Harus sesuai dengan format email
     */
    function validateEmail() {
      const emailValue = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Memastkan format email;
      
      if (emailValue === '') {
        // Cek jika email kosong
        showError(emailError, "Email is required");
        return false;
      } else if (!emailRegex.test(emailValue)) {
        // Cek jika format email valid
        showError(emailError, "Please enter a valid email address");
        return false;
      } else {
        // Emailnya valid
        showSuccess(emailError, "");
        return true;
      }
    }
    
    /**
     * Validasi gender, minimal pilih 1
     */
    function validateGender() {
      let isSelected = false;
      
      // Cek jika button ada yg dipilih
      genderInputs.forEach(input => {
        if (input.checked) {
          isSelected = true;
        }
      });
      
      if (!isSelected) {
        // Jika tidak ada
        showError(genderError, "Please select a gender");
        return false;
      } else {
        // Jika ada
        showSuccess(genderError, "");
        return true;
      }
    }
    
    // Validasi instant
    genderInputs.forEach(input => {
      input.addEventListener('click', validateGender);
    });
    
    // Pemberian error message
    function showError(element, message) {
      element.textContent = message;
      element.className = 'error';
    }
    
    // Pemberian success message
    function showSuccess(element, message) {
      element.textContent = message;
      element.className = 'success';
    }
    
    // Pemberian success message untuk form keseluruhan
    function showFormSuccess(message) {
      formStatus.textContent = message;
      formStatus.className = 'form-status success';
      formStatus.style.display = 'block';
      
      // Menghapus success msg setelah 5 detik
      setTimeout(() => {
        formStatus.style.display = 'none';
      }, 5000);
    }
    
    // Error message untuk form keseluruhan
    function showFormError(message) {
      formStatus.textContent = message;
      formStatus.className = 'form-status error';
      formStatus.style.display = 'block';
    }
