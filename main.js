var canvas;
var app;

window.onload = function(event) {
    canvas = document.getElementById('cvs');
    
    // Get class from namespace, and create a instance.
    app = new core.Application(canvas);

    // Start the application
    app.Start(25);
}
