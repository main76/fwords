var context;
var app;

window.onload = function(event) {
    context = document.getElementById('cvs').getContext('2d');
    
    // Get class from namespace, and create a instance.
    app = new core.Application(context);

    // Start the application
    app.Start(25);
}
