$(function(){
  chrome.storage.sync.get(['total','limit'], function(budget) { // to get if any amount that had been spend in past , then first retirve it before adding new spending
      $("#total").text(budget.total);                           // this is an chrome API to get data from chrome stroage
      $("#limit").text(budget.limit);
  });

  $("#spendAmount").click(function(){
    var newTotal;

    chrome.storage.sync.get(['total','limit'], function(budget){
       var newTotal = 0;
       if(budget.total){
         newTotal += parseInt(budget.total);
       }
       var amount = $("#amount").val();

       if(amount){
         newTotal+=parseInt(amount);
       }

       chrome.storage.sync.set({'total':newTotal},function(){
         if(amount && newTotal >= budget.limit){
              var notifOptions = { // notification object
                type : 'basic',
                iconUrl:'icon/icon48.png',
                title:'Limit reached',
                message: "Uh oh! Looks you have reached your limit!"
              };
            //  now use chrome API to create notification
             chrome.notifications.create('limitNotif',notifOptions);
          // learn different of notification can be lerend on the chrome exrtension

         }
       });
       $("#total").text(newTotal);
       $("#amount").val('');
    });
  });
});
