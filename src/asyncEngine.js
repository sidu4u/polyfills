// This question was asked in Meta’s frontend interview.

// The problem statement reads as – Implement an engine that process async callbacks using JavaScript. Your task is to provide implementation of the class QueueCallbacks to meet all the condition:
// Constructor requirements

// You should provide the implementation of the constructor and process  methods, Do not change the names of these methods or the number of  arguments they receive.
// •The constructor method should receive an optional string., The value of the string will be responsible for the order in which callbacks stored in the queue are processes.
// •The only non-empty value it can receive in the string LIFO(Last in first out). the default order of processing callbacks in the queue will be FIFO(First in first out).
// Process method requirements

// The process method receive a single async function that should be executes by following the algorithm described below:
// •If there is currently no async function being executed by the class, the received callback method should be executed immediately.
// •If there is currently only one async function currently being executed the callback method should be executed immediately as well.
// •If there are two async function currently being executed the next callback method should be put into the queue.
// •After one of the currently executing async function is finished.
// •When there were no argument passed to the constructor the first callback method that was pushed into the queue should be executed (First in first out).
// •When the argument passed to the constructor was LIFO, the last callback in the queue should be executed.
// •If there are more than 6 callbacks in the queue discard any extra callbacks.
// •If there are more than 3 callbacks in the queue, follow FIFO if no argument is passed to constructor.

const STATE = {
  STARTED: "STARTED",
  STOPPED: "STOPPED",
};

const ORDER = {
  FIFO: "FIFO",
  LIFO: "LIFO",
};

class AsyncEngine {
  constructor(concurrency, order = "FIFO") {
    this.order = order;
    this.taskQueue = [];
    this.concurrency = concurrency;
    this.runCount = 0;
    this.state = STATE.STOPPED;
  }

  async processAsync() {
    const promiseArr = [];
    let task;
    while (this.runCount < this.concurrency && this.taskQueue.length > 0) {
      if (this.order === ORDER.FIFO) {
        task = this.taskQueue.shift();
      } else {
        task = this.taskQueue.pop();
      }
      promiseArr.push(task);
      this.runCount++;
    }

    return Promise.any(
      promiseArr.map((promise) =>
        promise()
          .then((data) => console.log(data))
          .finally(() => {
            this.runCount--;
            if (this.taskQueue.length === 0) {
              // last task processed
              this.state = STATE.STOPPED;
            }
          })
      )
    );
  }

  async startProcessingTasks() {
    while (this.taskQueue.length > 0) {
      await this.processAsync();
    }
  }

  async process(callback) {
    if (this.taskQueue.length > 5) {
      return;
    }
    this.taskQueue.push(callback);
    if (this.state === STATE.STOPPED) {
      this.state = STATE.STARTED;
      this.startProcessingTasks();
    }
  }
}

const createTask = (name, delay) =>
  new Promise((resolve) => {
    setTimeout(
      () => resolve(`resolved promise ${name} at time ${Date.now()}`),
      delay
    );
  });

// const runner = new AsyncEngine(2);

// runner.process(() => createTask("task1", 200));
// runner.process(() => createTask("task2", 500));
// runner.process(() => createTask("task3", 100));
// runner.process(() => createTask("task4", 100));
// runner.process(() => createTask("task5", 50));

// setTimeout(() => {
//   runner.process(() => createTask("task6", 2000));
//   runner.process(() => createTask("task7", 5000));
// }, 7000);

// -------------------------------------------------better implementation ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// idea is to start processing N(coucurrency) tasks in parallel
// when a task completes if automatically starts another task
// this way the concurrency level is always maintained

const ORDER2 = {
  FIFO: "FIFO",
  LIFO: "LIFO",
};

class AsyncEngine2 {
  constructor(concurrency, order = ORDER2.FIFO) {
    this.concurrency = concurrency;
    this.order = order;
    this.executionCount = 0;
    this.tasks = [];
  }

  process(callback) {
    if (!callback || callback === undefined) {
      return;
    }
    if (this.executionCount < this.concurrency) {
      this.executionCount++;
      callback()
        .then((data) => console.log("Task completed with data", data))
        .finally(() => {
          this.executionCount--;
          this.#executeNext();
        });
    } else {
      this.tasks.push(callback);
    }
  }

  #executeNext() {
    let nextTask;
    if (this.order === ORDER2.FIFO) {
      nextTask = this.tasks.shift();
    } else {
      nextTask = this.tasks.pop();
    }
    if (this.executionCount < this.concurrency) {
      // double check
      this.process(nextTask);
    }
  }
}

const runner = new AsyncEngine2(2);

runner.process(() => createTask("task1", 200));
runner.process(() => createTask("task2", 500));
runner.process(() => createTask("task3", 100));
runner.process(() => createTask("task4", 100));
runner.process(() => createTask("task5", 50));

setTimeout(() => {
  runner.process(() => createTask("task6", 2000));
  runner.process(() => createTask("task7", 5000));
}, 7000);
