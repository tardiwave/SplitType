import getTemplate from './helpers/getTemplate'
import { baseArgTypes } from './constants'
import count from './helpers/count'

const children = "Don't break it"

const lineCount = 1
const { words, chars } = count(children, { preserveNonBreakingSpaces: true })

export default {
  title: 'Tests/Non-breaking spaces',
  argTypes: { ...baseArgTypes },
}

const Template = getTemplate({ children })

export const NotSplit = Template.bind({})
NotSplit.args = { types: 'none', preserveNonBreakingSpaces: true }

export const SplitLinesWordsAndChars = Template.bind({})
SplitLinesWordsAndChars.args = {
  types: 'lines, words, chars',
  preserveNonBreakingSpaces: true,
}
SplitLinesWordsAndChars.parameters = {
  async puppeteerTest(page) {
    expect((await page.$$('.target > .line')).length).toEqual(lineCount)
    expect((await page.$$('.line > .word')).length).toEqual(words)
    expect((await page.$$('.word > .char')).length).toEqual(chars)
  },
}

export const SplitLines = Template.bind({})
SplitLines.args = { types: 'lines', preserveNonBreakingSpaces: true }
SplitLines.parameters = {
  async puppeteerTest(page) {
    expect((await page.$$('.target > .line')).length).toEqual(lineCount)
    expect((await page.$$('.word')).length).toEqual(0)
    expect((await page.$$('.char')).length).toEqual(0)
  },
}

export const SplitWords = Template.bind({})
SplitWords.args = { types: 'words', preserveNonBreakingSpaces: true }
SplitWords.parameters = {
  async puppeteerTest(page) {
    expect((await page.$$('.line')).length).toEqual(0)
    expect((await page.$$('.target > .word')).length).toEqual(words)
    expect((await page.$$('.char')).length).toEqual(0)
  },
}

export const SplitChars = Template.bind({})
SplitChars.args = { types: ['chars'], preserveNonBreakingSpaces: true }
SplitChars.parameters = {
  async puppeteerTest(page) {
    expect((await page.$$('.line')).length).toEqual(0)
    expect((await page.$$('.word')).length).toEqual(0)
    expect((await page.$$('.target > .char')).length).toEqual(chars)
  },
}
