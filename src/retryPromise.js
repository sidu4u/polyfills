// The problem statement reads as Implement a function in JavaScript that retries promises N number of times with a delay between each call.

// Input:
// retry(asyncFn, retries = 3, delay = 50, finalError = 'Failed');

// Output:
// ... attempt 1 -> failed
// ... attempt 2 -> retry after 50ms -> failed
// ... attempt 3 -> retry after 50ms -> failed
// ... Failed.

const createDelay = (delay) =>
  new Promise((resolve) => setTimeout(() => resolve(), delay));

async function retry(asyncFn, retries = 3, delay = 50, finalError = "Failed") {
  let retryCount = 0;
  const fire = async () => {
    try {
      await asyncFn();
    } catch (err) {
      if (retryCount < retries) {
        await createDelay(delay);
        fire();
      } else {
        console.log(finalError);
      }
    }
  };
}
