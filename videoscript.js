var pusher = new Pusher('9f1b602df68c549601f4', {
    cluster: 'eu'
});

launch = false;

var channel = pusher.subscribe('sync-launch');
channel.bind('start-show', function (data) {
    launch = true;
});

var noSleep = new NoSleep();

document.querySelector('button').addEventListener('click', async () => {
    noSleep.enable();

    var vid = document.querySelector('video');
    vid.play();
    vid.pause();

    document.getElementById('ready').style.display = "none";
    document.getElementById('startRed').style.display = "block";

    if (/apple/i.test(navigator.vendor)) {
        vid.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        vid.mozRequestFullScreen();
    } else {
        vid.requestFullscreen();
    }

    await waitUntil(() => launch == true)

    noSleep.disable();
    
    document.getElementById('startRed').style.border = "none";
    vid.play();
});

const waitUntil = (condition) => {
    return new Promise((resolve) => {
        let interval = setInterval(() => {
            if (!condition()) {
                return
            }

            clearInterval(interval)
            resolve()
        }, 100)
    })
}