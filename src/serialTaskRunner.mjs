// task can be sync or async
// output of previous task as input to current task
// final output is an array of outputs of all tasks

function Task(job, isAsync) {
  // job returns a promise if async

  this.job = job;
  this.isAsync = isAsync;
}

async function taskRunner(jobs) {
  let prevRes;
  const res = [];
  for (let i = 0; i < jobs.length; i++) {
    if (jobs[i].isAsync) {
      prevRes = await jobs[i].job(prevRes);
    } else {
      prevRes = jobs[i].job(prevRes);
    }
    res.push(prevRes);
  }

  return res;
}

const task1 = new Task(() => "this is sparts", false);
const task2 = new Task(
  (data) =>
    new Promise((resolve) =>
      setTimeout(() => resolve(data + ": promise"), 500)
    ),
  true
);
const task3 = new Task((data) => `this is task 3 ${data}`, false);

async function run() {
 const data = await taskRunner([task1,task2,task3]);
  //const data = await new Promise((resolve)=> setTimeout(()=>{resolve('hello world')},500));
  return data;
}

console.log("output", await run());
