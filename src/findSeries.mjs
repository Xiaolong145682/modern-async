
import findLimit from './findLimit.mjs'

/**
 * Returns the first element of an iterable that passes an asynchronous truth test.
 *
 * The calls to `iteratee` will run sequentially.
 *
 * In case of exception in one of the `iteratee` calls the promise returned by this function will be
 * rejected with the exception and the remaining pending tasks will be cancelled.
 *
 * @param {Iterable | AsyncIterable} iterable An iterable or async iterable object.
 * @param {Function} iteratee A function that will be called with each member of the iterable. It will receive
 * three arguments:
 *   * `value`: The current value to process
 *   * `index`: The index in the iterable. Will start from 0.
 *   * `iterable`: The iterable on which the operation is being performed.
 * @returns {Promise<any | undefined>} A promise that will be resolved with the first found value or rejected if one of the
 * `iteratee` calls throws an exception before finding a value. If no value is found it will return `undefined`.
 * @example
 * import { findSeries, sleep } from 'modern-async'
 *
 * const array = [1, 2, 3]
 * const result = await findSeries(array, async (v) => {
 *   // these calls will be performed sequentially
 *   await sleep(Math.random() * 10) // waits a random amount of time between 0ms and 10ms
 *   return v % 2 === 1
 * })
 * console.log(result) // prints 1
 */
async function findSeries (iterable, iteratee) {
  return findLimit(iterable, iteratee, 1)
}

export default findSeries
