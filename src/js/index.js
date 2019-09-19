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
            $.post("http://localhost:3000/users", data, location.replace('profile.html'));
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

    // Read Listing on SignIn
    $.get("http://localhost:3000/properties", function(data) {
        for (let object of data) {
            $('#featured-properties1').append(`
            <div style="border-bottom: 1px solid; padding: 0; height: 100px; margin-bottom: 10px;" class="col-12">
                <h3>Property Type: ${object.propertytype}</h3>
                <h5>number of rooms: ${object.rooms}</h5>
                <h5>number of rooms: ${object.location}</h5>
            </div>
            `);
        }            
    })

    // Populate Select Property list from the backend
    $.get("http://localhost:3000/defaultproperties", function(data) {
        for (let object of data) {
            let { propertytypes } = object;
            for (houses of propertytypes) {
                $('#select-property').append(`<option value='${houses}'>${houses}</option`);

            }
        }
    })

    // Populate DB.Json with property details from the list property form fields
    $('#listprop').click((e) => {
        e.preventDefault();
        let propertyTypeValue = $('#select-property').children('option:selected').val();
        let numberOfRoomsValue = $('#select-number-of-rooms').children('option:selected').val();
        let locationValue = $('#location').val();

        let newData = {
            propertytype: propertyTypeValue,
            rooms: numberOfRoomsValue,
            location: locationValue
        }
        $.post("http://localhost:3000/properties", newData, alert('property added'));
    })
    
    
})