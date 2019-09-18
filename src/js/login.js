$(document).ready(function() {
    $('#sign-in').click((e) => {
        e.preventDefault();
        $.get("http://localhost:3000/users", function(data) {
            console.log(data);
        })
    });
})