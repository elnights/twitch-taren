export async function waitForElementToDisplay(selector, checkFrequencyInMs, timeoutInMs) {
  const startTimeInMs = Date.now();

  while (timeoutInMs && Date.now() - startTimeInMs <= timeoutInMs) {
    let el = document.querySelector(selector);

    if (el != null) {
      return el;
    }

    await new Promise(resolve => setTimeout(resolve, checkFrequencyInMs));
  }
}

export function setNativeValue(element, value) {
  const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
  const prototype = Object.getPrototypeOf(element);
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;

  if (valueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter.call(element, value);
  } else {
    valueSetter.call(element, value);
  }
}

