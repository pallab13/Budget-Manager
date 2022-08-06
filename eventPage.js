// by using this method i  was getting this error --> "cannot create item with duplicate context menu id in extension"


// var contextMenuItem = { // didn't understand this
//   "id":"spendMoney",
//   "title":"SpendMoney",
//   "contexts":["selection"]
// };

//   chrome.contextMenus.create(contextMenuItem);    //    it is an method

/*
 i got an answer on stack overflow  to use the following
 In Chrome you should create the context menu just once after install/update. by using the below code
 Doubt --> is it an eventPage // and background script how does it get triggered
*/
chrome.runtime.onInstalled.addListener(() => {  // onInstalled event is avaible in chrome.runtime API
                                                // whenever onInstalled event occure we call addListener 

  chrome.contextMenus.create({
    id: "spendMoney",
    title: 'SpendMoney',
    contexts: ["selection"]    /// what is contexts: ["selection"] and what is its use
                           // ans --> contexts means in what context this chrome extension will be displayed
                           // in the cintext menu
  });
});







function isInt(value){ // this function take a value and check the given value is integer or not
  return !isNaN(value) && parseInt(Number(value))==value && !isNaN(parseInt(value,10));
}

// listening to the clicked event on context contextMenus

chrome.contextMenus.onClicked.addListener(function(clickData){
  if(clickData.menuItemId=="spendMoney" && clickData.selectionText){     // what is clickData.selectiontext is here --> https://stackoverflow.com/questions/59106919/chrome-contextmenu-extension-save-selected-text-into-a-variable
    if(isInt(parseInt(clickData.selectionText))){                        // if the selsction text is integer then we will uodate it in chroem storage
      chrome.storage.sync.get(['total','limit'], function(budget){
        var newTotal = 0;
        if(budget.total){
          newTotal+=parseInt(budget.total);
        }

        newTotal+=parseInt(clickData.selectionText);

        chrome.storage.sync.set({'total':newTotal},function(){
          if(newTotal>=budget.limit){
            var notifOptions = {
              type : 'basic',
              iconUrl:'icon/icon48.png',
              title:'Limit Reached',
              message:"Uh oh! Looks like you have reached your limit"
            };
            chrome.notifications.create('limitNotif',notifOptions)
          }
        });
      });
    }
  }
});


////  only bug is how to deal with the badgeText in


//
// chrome.storage.onChanged.addListener(function(changes, storageName){     // if any things change in the chrome storage this function is besing called
//   chrome.browserAction.setBadgeText({"text" :  storageName.total.toString()  }); // on badge new value is being displayed
// });









//
