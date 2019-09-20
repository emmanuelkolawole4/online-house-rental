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
            <div style="border-bottom: 1px solid; padding: 10px; height: auto; margin-bottom: 10px;" class="col-12">
                <h3 style="font-weight: bold;">Property Type: ${object.propertytype}</h3>
                <h6 style="font-weight: bold;">Number of rooms: ${object.rooms}</h6>
                <h6 style="font-weight: bold;">Location: ${object.location}</h6>
                <a style="color: #999; text-decoration: none;" class="hov font-weight-bold" href="singleproperty.html?id=${object.id}">More Details</a>
                <div class="images">
                    <!-- <img style="position: relative; top: -70px; border: inset" src="src/images/flat-small.jpg" alt="logo"> -->
                </div>
                
            </div>
            `);
        }            
    })

    // Single Property Listing
    let url = window.location.href;
    let urlIdArr = url.split('id=');
    let urlId = parseInt(urlIdArr[1]);
    $.get(`http://localhost:3000/properties/${urlId}`, function(data) {
        $('#featured-properties2').append(`
        <div style="border-bottom: 1px solid; padding: 10px; height: auto; margin-bottom: 10px;" class="col-12">
            <h3 style="font-weight: bold;">Property Type: ${data.propertytype}</h3>
            <h6 style="font-weight: bold;">Number of rooms: ${data.rooms}</h6>
            <h6 style="font-weight: bold;">Location: ${data.location}</h6>
            <p>One bedroom apartment with amazing amenities, newly renovated and furnished. A perfect place to start a bachelor/spinster life comfortably.</p>
            <div class="images-large">
                
            </div>
            <button id="remove" class="btn login remove font-weight-bold mt-4">Remove Property</button>
            <button id="update" class="btn login font-weight-bold mt-4 ml-5">Update Property</button>
        </div>
        `);       
        
        $("#remove").on('click', (e) => {
            $.ajax({
                url: `http://localhost:3000/properties/${urlId}`,
                method: 'DELETE',
                success: function(e) {
                    alert("Deleted");
                    location.href = 'profile.html';
                }
            })
        })
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