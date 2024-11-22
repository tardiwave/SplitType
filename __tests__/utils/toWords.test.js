import toWords from '../../lib/utils/toWords'

const words = ['one', 'two', 'three']
const emojiWords = ['👍', '😀', '🤡']
const nonBreakingSpace = String.fromCharCode(160)

describe('utils.toWords(string)', () => {
  it(`Splits string into words`, () => {
    expect(toWords('one two three')).toEqual(words)
    expect(toWords('👍 😀 🤡')).toEqual(emojiWords)
  })
  it(`handles string with non-breaking spaces`, () => {
    const str = `one two${nonBreakingSpace}three`
    expect(toWords(str, /\s/)).toEqual(words)
  })
  it('preserves non-breaking spaces while splitting on normal spaces', () => {
    const str = `one two${nonBreakingSpace}three`
    expect(toWords(str, { preserveNonBreakingSpaces: true })).toEqual([
      'one',
      `two${nonBreakingSpace}three`,
    ])
  })
})

describe('utils.toWords(string, separator)', () => {
  it(`Splits string into array of words using a custom separator`, () => {
    expect(toWords('one-two-three', { separator: '-' })).toEqual(words)
    expect(toWords('👍-😀-🤡', { separator: '-' })).toEqual(emojiWords)
  })

  it(`Splits string into an array of words using a regex separator`, () => {
    expect(toWords('one<two>three', { separator: /[<>]/ })).toEqual(words)
  })

  it(`Splits string with unicode characters into an array of words using a 
  regex separator`, () => {
    expect(toWords('👍<😀>🤡', { separator: /[<>]/ })).toEqual(emojiWords)
  })
})
