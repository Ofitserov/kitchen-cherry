var OnScreen = require('onscreen');

$(function() {
    var os = new OnScreen();
    var header = $('.top-bar');

    os.on('enter', '#about', function() {
        console.log('enter');
    });

    os.on('leave', '#about', function() {
        console.log('leave');
    });
});
