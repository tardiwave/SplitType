/**
 * Splits a string into an array of words.
 *
 * @param {string} string
 * @param {Object} [options]
 * @param {string | RegExp} [options.separator = ' ']
 * @param {boolean} [options.preserveNonBreakingSpaces = false]
 * @return {string[]} Array of words
 */
export default function toWords(
  value,
  { separator = ' ', preserveNonBreakingSpaces = false } = {}
) {
  const string = value ? String(value) : ''

  if (preserveNonBreakingSpaces) {
    return string
      .trim()
      .replace(/[^\u00A0\S]+/g, ' ')
      .split(separator)
  }
  return string.trim().replace(/\s+/g, ' ').split(separator)
}
