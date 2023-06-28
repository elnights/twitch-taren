import { Storage } from "@plasmohq/storage"

export {}

const storage = new Storage();

async function setCurrentVolumeOnContent(v) {
  // @ts-ignore
  await window.setCurrentVolume(v);
}

async function checkAndSetCurrentVolume(tabId, user) {
  let data: any = await storage.get("volumes");

  if (!data) data = {};

  let savedVolume = data[user];

  console.log(`huy existing volume for user ${user}: ${savedVolume}`);

  if (savedVolume != null) {
    console.log(`huy setting current volume for user ${user}: ${savedVolume}`);
    chrome.scripting
      .executeScript({
        target : {tabId},
        func : setCurrentVolumeOnContent,
        args : [ savedVolume ],
        world: 'MAIN'
      })
      .then((result) => console.log("content volume setter result:", result));
    console.log(`huy successfully set current volume for user ${user}: ${savedVolume}`);
  }
}

console.log('huy');

function checkUrl(url) {
  let urlO = new URL(url);
  console.log('hn', urlO.hostname);
  return (urlO.hostname === 'www.twitch.tv');
}

async function onTabChange(tabId, changeInfo) {
  console.log(changeInfo);
  if (changeInfo.status === 'complete') {
    let tab = await chrome.tabs.get(tabId);
    if (checkUrl(tab.url)) {
      console.log('it\'s twotch');

      console.log('tab url:', tab.url);
      let url = new URL(tab.url);
      let user = url.pathname.slice(1);
      console.log('User:', user);

      if (user.trim()) {
        console.log('sending newUser event');
        chrome.tabs.sendMessage(tabId, { newUser: user });
        checkAndSetCurrentVolume(tabId, user).then(() => {
        })
      } else {
        console.log('user is empty');
      }
    }

    if (changeInfo.url) {
      if (checkUrl(changeInfo.url)) {
        console.log('it\'s twotch change url');
      }
    }
  }
}
chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo) {
    onTabChange(tabId, changeInfo);
  }
);


