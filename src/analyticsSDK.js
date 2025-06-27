// Implement an analytics SDK that exposes log events,
// it takes in events and queues them, and then starts sending the events.
// The SDK should adhere the following properties.
// Send each event after a delay of 1 second and this logging fails every n % 5 times.
// Send the next event only after the previous one resolves.
// When the failure occurs attempt a retry.

//Input:
// const sdk = new SDK();

// sdk.logEvent("event 1");
// sdk.logEvent("event 2");
// sdk.logEvent("event 3");
// sdk.logEvent("event 4");
// sdk.logEvent("event 5");
// sdk.logEvent("event 6");
// sdk.logEvent("event 7");
// sdk.logEvent("event 8");
// sdk.logEvent("event 9");
// sdk.logEvent("event 10");

// sdk.send();

// Output:
// "Analytics sent event 1"
// "Analytics sent event 2"
// "Analytics sent event 3"
// "Analytics sent event 4"
// "-----------------------"
// "Failed to send event 5"
// "Retrying sending event 5"
// "-----------------------"
// "Analytics sent event 5"
// "Analytics sent event 6"
// "Analytics sent event 7"
// "Analytics sent event 8"
// "-----------------------"
// "Failed to send event 9"
// "Retrying sending event 9"
// "-----------------------"
// "Analytics sent event 9"
// "Analytics sent event 10"

class SDK {
  constructor() {
    this.events = [];
    this.count = 0;
  }

  sendEvent() {
    this.count++;
    return new Promise((resolve, reject) => {
      setTimeout(() => (this.count % 5 === 0 ? reject() : resolve()), 1000);
    });
  }

  retry(eventName) {
    console.log("Retrying sending ", eventName);
    return this.sendEvent();
  }

  logEvent(event) {
    this.events.push(event);
  }
  
  async send() {
    this.count = 0;
    while (this.events.length>0) {
      try {
          await this.sendEvent();
      } catch (e) {
        console.log("Failed to send ", this.events[0]);
        await this.retry(this.events[0]);
      }
      console.log("Analytics sent ", this.events[0]);
      this.events.shift();
    }
  }
}

//Input:
const sdk = new SDK();

sdk.logEvent("event 1");
sdk.logEvent("event 2");
sdk.logEvent("event 3");
sdk.logEvent("event 4");
sdk.logEvent("event 5");
sdk.logEvent("event 6");
sdk.logEvent("event 7");
sdk.logEvent("event 8");
sdk.logEvent("event 9");
sdk.logEvent("event 10");
sdk.logEvent("event 11");
sdk.logEvent("event 12");
sdk.logEvent("event 13");
sdk.logEvent("event 14");
sdk.logEvent("event 15");
sdk.logEvent("event 16");
sdk.logEvent("event 17");

sdk.send();
