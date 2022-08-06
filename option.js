$(function() {

  chrome.storage.sync.get('limit', function(budget) {
    var limit = parseInt(budget.limit);
    if (limit) {
      $("#limit").val(limit); // to display the limit in the int the input tab of option.html
    }
  });

  $("#saveLimit").click(function() {
    var limit = $("#limit").val();
    if (limit) { // take why if statement always need to work it
      chrome.storage.sync.set({
        'limit': limit
      }, function() {
        close();
      });
    }
  });

  $("#resetTotal").click(function() {
    chrome.storage.sync.set({'total': 0}, function(){
      var notifOptions = { // notification object
        type: 'basic',
        iconUrl: 'icon/icon48.png',
        title: 'Total Reset!',
        message: "Total is reset to zero"
      };
      //  now use chrome API to create notification
      chrome.notifications.create('limitNotif', notifOptions);

    });
  });
});
