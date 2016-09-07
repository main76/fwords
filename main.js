var context;
var Manager;
var tick;

window.onload = function(event) {
    context = document.getElementById('cvs').getContext('2d');
    
    // Get class from namespace, and create a instance.
    Manager = new scene.Manager(context);

    // Get the current scene.
    var current = Manager.Current;

    // Call to draw.
    setInterval(() => {
        let elasped = undefined;
        if (tick) {
            let temp = new Date();
            elasped = temp - tick;
            tick = temp;
        }
        current.Update(elasped);
    }, 25);

    console.log('done');
}