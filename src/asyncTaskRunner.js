/**
 * Read FAQs section on the left for more information on how to use the editor
 **/
// DO CHANGE THE CLASS NAME
class TaskRunner {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.runCount = 0;
    this.tasks = [];
    this.index = 0;
  }

  async execute() {
    if (this.tasks.length < 1) {
      return;
    }

    const promiseList = [];

    while (this.runCount < this.concurrency && this.index < this.tasks.length) {
      promiseList.push(
        this.tasks[this.index]().finally(() => {
          this.runCount--;
        })
      );
      this.index++;
      this.runCount++;
    }

    if (promiseList.length > 0) {
      return Promise.any(promiseList);
    }

    return Promise.resolve();
  }

  async start() {
    if (this.runCount === this.concurrency) {
      return;
    }
    while (this.index < this.tasks.length) {
      await this.execute();
    }
  }

  push(task) {
    // write your code below
    this.tasks.push(task);
    this.start();
  }
}

// const ex = new TaskRunner(3);

// const delay = (time) => new Promise((r) => setTimeout(() => r(), time));

// // Simulated async tasks
// const t1 = async () => {
//   console.log("t1 started");
//   await delay(2000);
//   console.log("t1 finished");
// };
// const t2 = async () => {
//   console.log("t2 started");
//   await delay(1000);
//   console.log("t2 finished");
// };
// const t3 = async () => {
//   console.log("t3 started");
//   await delay(1500);
//   console.log("t3 finished");
// };
// const t4 = async () => {
//   console.log("t4 started");
//   await delay(1000);
//   console.log("t4 finished");
// };
// const t5 = async () => {
//   console.log("t5 started");
//   await delay(500);
//   console.log("t5 finished");
// };

// // Add tasks to the executor
// ex.push(t1); // Starts immediately
// ex.push(t2); // Starts immediately
// ex.push(t3); // Starts immediately
// ex.push(t4); // Waits until at least one task finishes
// ex.push(t5); // Waits until another task finishes


class Runner{
  constructor(concurrency){
    this.concurrency = concurrency;
    this.tasks = [];
    this.runCount = 0;
  }

  execute(){
    if(this.runCount > this.concurrency){
      return;
    }
    while(this.runCount < this.concurrency && this.tasks.length > 0){
      const task = this.tasks.shift();
      task();
    }
  }

  createTask(task){
    return async () => {
      this.runCount++;
      await task();
      this.runCount--;
      this.execute();
    }
  }

  push(task){
      this.tasks.push(this.createTask(task));
      this.execute();
  }
}

const ex = new Runner(3);

const delay = (time) => new Promise((r) => setTimeout(() => r(), time));

// Simulated async tasks
const t1 = async () => {
  console.log("t1 started");
  await delay(2000);
  console.log("t1 finished");
};
const t2 = async () => {
  console.log("t2 started");
  await delay(1000);
  console.log("t2 finished");
};
const t3 = async () => {
  console.log("t3 started");
  await delay(1500);
  console.log("t3 finished");
};
const t4 = async () => {
  console.log("t4 started");
  await delay(1000);
  console.log("t4 finished");
};
const t5 = async () => {
  console.log("t5 started");
  await delay(500);
  console.log("t5 finished");
};

// Add tasks to the executor
ex.push(t1); // Starts immediately
ex.push(t2); // Starts immediately
ex.push(t3); // Starts immediately
ex.push(t4); // Waits until at least one task finishes
ex.push(t5); // Waits until another task finishes