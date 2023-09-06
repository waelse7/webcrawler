const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

test('normalizeURL', () => {
  const input = 'https://example.com/path'
  const actual = normalizeURL(input)
  const expected = 'example.com/path'
  expect(actual).toEqual(expected)
});

test('normalizeURL trailing slash', () => {
  const input = 'https://example.com/path/'
  const actual = normalizeURL(input)
  const expected = 'example.com/path'
  expect(actual).toEqual(expected)

});
