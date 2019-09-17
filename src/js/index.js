$(document).ready(function() {
    function validateEmail(emailValue) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(emailValue);
      }
    $('#register').click((e) => {
        e.preventDefault();

        const firstNameValue = $('#firstname').val();
        const lastNameValue = $('#lastname').val();
        const emailValue = $('#email').val();
        const passwordValue = $('#password').val();
        const confirmPasswordValue = $('#firstname').val();
        const data = {
            firstname: firstNameValue,
            lastname: lastNameValue,
            email: emailValue,
            password: passwordValue,
            confirmpassword: confirmPasswordValue
        }

        if (firstNameValue === '' || lastNameValue === '' || emailValue === '' || passwordValue === '' || confirmPasswordValue === '') {
            alert('Please fill in the fields');
        }  else if (passwordValue !== confirmPasswordValue) {
            alert('please ensure password and confirm password fields are the same');
        }
        else {
            $.post("http://localhost:3000/users", data, alert('User has been created'));
        }
    })
})