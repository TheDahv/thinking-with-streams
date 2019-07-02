// Introduce the problem

/**
 * Introduce a function to provide us with a sequence of numbers as defined by
 * the fibonacci algorithm.
 */
function fib (elements = 0) {
  const nums = [ 1 ];

  let a = 0;
  let b = 1;

  while (elements > 0) {
    const c = a + b;
    a = b;
    b = c;
    nums.push(c);
    elements--;
  }

  return nums;
}

/**
 * This should break with a sufficiently large number! It might be smaller or
 * larger on your computer, but because the 'fib' function builds up its result
 * in one place, it needs to find enough memory to hold everything before it can
 * return. Eventually, you'll run out of memory and this will break.
 *
 * ========= COMMENTED OUT SO WE CAN WORK WITH GENERATORS INSTEAD ==========
 */
//for (const num of fib(10000000000)) {
//  console.log(num);
//}

// Data as streams

/**
 * fibGen takes advantage of the "generator" construct to let us define a
 * sequence and emit each value one at a time as the generator is consumed.
 *
 * With this, we don't accumulate our result in one place. Instead, we only need
 * as much memory as is required to walk through the problem and emit each
 * result as it is calculated. This also means we can consume it iteratively on
 * the other side rather than wait for the entire data to be calcuated before we
 * can work with it.
 */
function* fibGen (elements = 0) {
  let a = 0;
  let b = 1;

  yield 1;
  while (elements > 0) {
    const c = a + b;
    a = b;
    b = c;
    yield c.toString();
    elements--;
  }
}

// This walks the generator and prints each number one at a time. Node.js will
// run out of its ability to represent large numbers before it runs out of
// memory in this problem -- that is a problem, but not the focus of this video
// :)
// ========= COMMENTED OUT SO WE CAN WORK WITH STREAMS INSTEAD ==========
//for (const num of fibGen(10000000000)) {
//  console.log(num);
//}

// Consuming and sharing streams

const { Readable } = require('stream');

/**
 * fibStream models our fibonacci sequence as a stream of data. In Node.js
 * terms, it is a "Readable" stream [0]. That means we can consume it bit by bit
 * using the various APIs Node provides for working with streams.
 *
 * [0] - https://nodejs.org/api/stream.html#stream_readable_streams
 */
function fibStream (elements) {
  let a = 0;
  let b = 1;

  return new Readable({
    objectMode: true,

    read () {
      if (elements === 0) { return this.push(null); }

      const c = a + b;
      a = b;
      b = c;

      // Even though we're in object mode, process.stdout needs strings
      this.push(c.toString() + '\n');
      elements--;
    }
  });
}

// Set up a rather large stream of numbers
const stream = fibStream(10000000000);

// Here we use Node's event-based API for working with streams. It will consume
// the stream and run our program on each chunk or element the stream emits
//stream.on('data', (num) => console.log(num));

// We can also connect to external stream destinations. Stdout is such a stream
// destination, or a "Writable" stream. ".pipe" allows us to connect streams
// together. However, console.log knows how to deal with numbers, but
// "process.stdout" does not. So we alter the stream to emit strings.
stream.pipe(process.stdout);

// Can streams talk?

// Other ways to think about streams
