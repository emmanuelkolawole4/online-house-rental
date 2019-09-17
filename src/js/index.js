$(document).ready(function() {

    $('#register').click((e) => {
        e.preventDefault();

        const firstNameValue = $('#firstname').val();
        const lastNameValue = $('#lastname').val();
        const emailValue = $('#email').val();
        const passwordValue = $('#password').val();
        const confirmPasswordValue = $('#confirmpassword').val();
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