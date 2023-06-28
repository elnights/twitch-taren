import type { PlasmoCSConfig } from "plasmo";
import { setNativeValue, waitForElementToDisplay } from "~util";
import { sliderSelector } from "~util/constants";

async function setCurrentVolume(v){
  console.log('huy setting volume exec from background', v);
  let el = await waitForElementToDisplay(sliderSelector, 200, 5000);

  if (el) {
    console.log('huy found volume slider, setting', v);
    setNativeValue(el, v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    return 'success';
  } else {
    throw 'Volume slider is not present';
  }
}

// @ts-ignore
window.setCurrentVolume = setCurrentVolume;

export const config: PlasmoCSConfig = {
  matches: ["https://www.twitch.tv/*"],
  all_frames: true,
  world: "MAIN"
}
