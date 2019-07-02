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
 */
for (const num of fib(10000000000)) {
  console.log(num);
}

// Data as streams

// Consuming and sharing streams

// Can streams talk?

// Other ways to think about streams
