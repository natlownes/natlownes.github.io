(function(){

  $(document).ready(function(){
    var twitterDisplay = function(){

      var deferred, timer, container, iframeHeight;
      var probablyLoadedHeight;

      deferred  = new $.Deferred()

      container = function() {
        return $('.twitter iframe')
      }

      iframeHeight = function() {
        return container().height() || 0;
      }

      probablyLoadedHeight = function() {
        return 5;
      }

      start = function() {
        if ( iframeHeight() > probablyLoadedHeight() ) deferred.resolve()
      }

      timer = setInterval(function(){
        start()
      }, 1)

      deferred.done(function(){
        clearInterval(timer);
      });

      return deferred.promise()
    };


    twitterDisplay().done(function(){
      if ( document.width > 800) $('div.main').height(document.height);
    });
  }); //ready
})();
