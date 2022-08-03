var pusher = new Pusher('9f1b602df68c549601f4', {
    cluster: 'eu'
  });

  var channel = pusher.subscribe('sync-launch');
  channel.bind('start-show', function(data) {
    if (isMobile && isSafari) {
        document.getElementById('video').autoplay = true
      }
    else {
        document.getElementById('video').play();
    }
  });