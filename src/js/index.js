$(document).ready(function() {
    // Sign Up
    $('#register').click((e) => {
        e.preventDefault();
        let firstNameValue = $('#firstname').val();
        let lastNameValue = $('#lastname').val();
        let emailValue = $('#email').val();
        let passwordValue = $('#password').val();
        let confirmPasswordValue = $('#confirmpassword').val();
        let data = {
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
            $.post("http://localhost:3000/users", data, function() {
                window.location.replace("profile.html");
            });
        }
    })


    // Sign In
    $('#sign-in').click((e) => {
        e.preventDefault();
        let emailValue = $('#email').val();
        let passwordValue = $('#password').val();
        if (emailValue === '' || passwordValue === '') {
            alert('Please fill in the fields');
        }
        $.get("http://localhost:3000/users", function(data) {
            for (let object of data) {
                if (object.email === emailValue && object.password === passwordValue) {
                    window.location.replace("profile.html");
                    return;
                } 
            }
            alert('invalid user, please review your email and password');
        })
    });

    $.get("http://localhost:3000/properties", function(data) {
        for (let obj of data) {
            $('#featured-properties1').append(`
            <div style="border-bottom: 1px solid; padding: 10px; height: 100px; margin-bottom: 10px;" class="col-12">
                <h3>Property Type: ${obj.propertytype}</h3>
                <h5>number of rooms: ${obj.rooms}</h5>
            </div>
            `);
        }            
    })
    
})