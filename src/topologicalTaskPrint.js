const tasks = [
  {
    name: "Task1",
    deps: ["Task3", "Task4"],
  },
  {
    name: "Task2",
    deps: ["Task4", "Task5"],
  },
  {
    name: "Task3",
    deps: ["Task6", "Task7","Task4"],
  },
  {
    name: "Task4",
    deps: ["Task7"],
  },
  {
    name: "Task5",
    deps: ["Task7","Task4"],
  },
  {
    name: "Task6",
    deps: [],
  },
  {
    name: "Task7",
    deps: [],
  },
];

class Schedule {
  constructor() {
    this.depCount = new Map();
    this.indegree = new Map();
    this.res = [];
  }

  init(tasks) {
    for (let task of tasks) {
      if (!this.indegree.has(task.name)) {
        this.indegree.set(task.name, []);
      }
      this.depCount.set(task.name, task.deps.length);
      task.deps.forEach((dep) => {
        if (this.indegree.has(dep)) {
          this.indegree.get(dep).push(task.name);
        } else {
          this.indegree.set(dep, [task.name]);
        }
      });
    }
  }

  findZero() {
    return [...this.depCount.keys()].filter((key) => this.depCount.get(key)===0);
  }

  removeDeps(arr) {
    for (const task of arr) {
      this.depCount.delete(task); // as this is zero
      this.indegree
        .get(task)
        .forEach((task) =>
          this.depCount.set(task, this.depCount.get(task) - 1)
        );
    }
  }

  run(tasks) {
    this.init(tasks);
   while (this.depCount.size > 0) {
      const zeros = this.findZero();
      this.res.push(zeros);
      this.removeDeps(zeros);
   }
    console.log(this.res);
  }
}

const runner = new Schedule();

runner.run(tasks);
