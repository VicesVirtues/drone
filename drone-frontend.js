function init() {
    var tracker = initTracker("#example");
    tracking.track("#imageToTrack", tracker);
}

function initTracker(element) {
    // Initialise a color tracker
    var tracker = new tracking.ColorTracker();
    TrackerUtils.addTrackingColor("#5EA24E", "green", tracker);
    TrackerUtils.addTrackingColor("#B82500", "red", tracker);
    TrackerUtils.addTrackingColor("#D13C16", "bright red", tracker);
    TrackerUtils.addTrackingColor("#4D4D4D", "grey", tracker);
    TrackerUtils.addTrackingColor("#B23030", "pink", tracker);
    TrackerUtils.addTrackingColor("#131f3b", "blue", tracker);
    TrackerUtils.addTrackingColor("#22315e", "bright blue", tracker);
    TrackerUtils.addTrackingColor("#0b1129", "dark blue", tracker);
    TrackerUtils.startTrackingColors(tracker);
    // Whenever there is a new color detected, mark them
    tracker.on('track', function(event) {
        markColors(event.data);
    });

    return tracker;

}

function markColors(colors, element){
    var canvas = $("#droneCanvas").get(0);
    var context = canvas.getContext('2d');

    context.clearRect(0,0, context.width,context.height);

    for(var i = 0; i < colors.length; i++){
        drawRectangle(colors[i], context);
    }

}

function drawRectangle(rect, context){
    context.strokeStyle = rect.color;
    context.strokeRect(rect.x, rect.y, rect.width,rect.height);

    console.log();
}
window.addEventListener("load", init);