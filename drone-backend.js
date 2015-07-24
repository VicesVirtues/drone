var Cylon = require('cylon');
var ws = require('nodejs-websocket');

Cylon.robot()
    .connection("ardrone", {
        adaptor: 'ardrone',
        port: '192.168.1.1'
    })
    .device("drone", {
        driver: "ardrone",
        connection: "ardrone"
    })
    .device("nav",{
        driver:"ardrone-nav",
        connection: "ardrone"
    })
    .on("ready", fly);

var bot;

function fly(robot){
    bot= robot;
    bot.drone.config('general:navdata_demo','TRUE');

    bot.nav.on("navdata", function(data){

    });

    /*bot.nav.on("altitudeChange", function(data){
        if(data > 1.5){
            bot.drone.land();
        }
    });*/

    bot.nav.on("batteryChange", function(data){
        console.log("Battery level:", data);
    });

    bot.drone.disableEmergency();

    bot.drone.ftrim();

    bot.drone.takeoff();

    after(1*1000, function(){
        bot.drone.up(0.5);
    });

    after(3*1000, function(){
        bot.drone.stop();
    });

    after(4*1000, function(){
        bot.drone.right(0.5);
    });

    after(7*1000, function(){
        bot.drone.stop();
    });

    after(8*1000, function(){
        bot.drone.front(0.5);
    });

    after(9*1000, function(){
       bot.drone.left(0.5)
    });

    after(12*1000, function(){
        bot.drone.land
    });

    /*after(10*1000,function(){
        bot.drone.land();
    });*/
    after((4.7).seconds(),function(){
        bot.drone.stop();
    });
}

Cylon.start();