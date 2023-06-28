import type { PlasmoCSConfig } from "plasmo";
import { Storage } from "@plasmohq/storage"
import { sliderSelector } from "~util/constants";

const storage = new Storage();

let user = window.location.pathname.slice(1);

async function onNewUser() {
  console.log(
    `huy User: ${user}`
  );
}

onNewUser();
console.log("huy onmessage init");
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");
    if (request.newUser) {
      console.log('huy new user', request.newUser);
      user = request.newUser;
      onNewUser();
    }
  }
);

async function updateUserVolume(user, volume) {
  let data: any = await storage.get("volumes");
  if (!data) data = {};
  console.log(`huy existing volume for ${user}: ${data[user]}`);
  data[user] = volume;
  console.log(`huy setting volume for ${user}: ${volume}`);
  await storage.set("volumes", data);
}

function subscribeToVolumeSlider() {
  let input = document.querySelector(sliderSelector);

  window.document.body.addEventListener('change', function(event) {
    console.log("huy chznge event");
    if (event.target instanceof HTMLInputElement) {
      let v = event.target.value;
      console.log("huy current volume", v);
      updateUserVolume(user, v).then(() => {
        console.log('huy volume updated');
      });
    }
  });
}

subscribeToVolumeSlider();

export const config: PlasmoCSConfig = {
  matches: ["https://www.twitch.tv/*"],
  all_frames: true,
  //world: "MAIN"
}
