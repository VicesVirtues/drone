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

    after(6*1000, function(){
        bot.drone.up(0.5);
        bot.drone.front(0.2);
    });

    after(8*1000, function(){
        bot.drone.hover();
    });

    after(9*1000, function(){
        bot.drone.right(0.5);
    });

    after(10.5*1000, function(){
        bot.drone.hover();
    });

    after(13*1000, function(){
        bot.drone.front(0.5);
    });

    after(14*1000, function(){
        bot.drone.front(0);
        bot.drone.left(0.5)
    });

    after(14.9*1000, function(){
        bot.drone.left(0);
        bot.drone.up(0.5);

    });

    after(16*1000, function(){
        bot.drone.up(0);
        bot.drone.back(0.5);
    })

    after(17.2*1000, function(){
        bot.drone.back(0);
        bot.drone.down(0.5);
    });

    after(18.2*1000, function(){
        bot.drone.down(0)
        bot.drone.land()
    })

    /*after(10*1000,function(){
     bot.drone.land();
     });*/
    after(20*1000,function(){
        bot.drone.stop();
    });
}

Cylon.start();