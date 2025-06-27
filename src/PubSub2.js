// Implement the pub-sub pattern in JavaScript that has following methods: subscribe, subscribeOnce, and subscribeOnceAsync.
// subscribe(name, callback): Will take the name of the event and assign a callback to it. This callback will be invoked when the event is published. It returns a remove() method to unsubscribe the event.
// subscribeOnce(name, callback): Will take the name of the event and assign a callback to it. This event will be published only once.
// subscribeOnceAsync(name): Will take the name of the event and returns a promise that is settled or fullfilled when the event is published.
// publish(name, data): Publish a single event and pass the data to the callback of each events. If the event is subscribed only once, it should not invoke twice.
// publishAll(data): Publishes all events and passes the data to the callback of each events. If the event is subscribed only once, it should not invoke twice.

class PubSub2 {
  constructor() {
    this.eventMap = new Map();
    this.promiseMap = new Map();
  }

  subscribe(name, callback, once = false) {
    if (this.eventMap.has(name)) {
      this.eventMap.set(name, this.eventMap.get(name).push({ once, callback }));
    } else {
      this.eventMap.set(name, [{ once, callback }]);
    }
  }

  subscribeOnce(name, callback) {
    this.subscribe(name, callback, true);
  }

  publish(name, data) {
    const subscribers = this.eventMap.get(name);
    for (sub of subscribers) {
      sub(data);
    }

    this.eventMap.set(
      name,
      this.eventMap.get(name).filter(({ once }) => !once)
    );

    const promisesPending = this.promiseMap.get(name);
    for (let prom of promisesPending) {
      prom(data);
    }
    this.promiseMap.delete(name);
  }

  publishAll(data) {
    const eventNames = this.eventMap.keys();

    for (let event of eventNames) {
      this.publish(event, data);
    }
  }

  subscribeOnceAsync(name) {
    return new Promise((resolve) => {
      if (this.promiseMap.has(name)) {
        this.promiseMap.set(name, this.promiseMap.get(name).push(resolve));
      } else {
        this.promiseMap.set(name, [resolve]);
      }
    });
  }
}
