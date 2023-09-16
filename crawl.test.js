const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

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

test("getURLsFromHTML", () => {
const input = `<html>
<body>
    <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
</body>
</html>`
const actual = getURLsFromHTML(input, 'https://blog.boot.dev')
const expected = ['https://blog.boot.dev/']
expect(actual).toEqual(expected)
});

test("getURLsFromHTML multi links with relative", () => {
  const input = `<html>
  <body>
      <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
      <a href="https://blog.boot.dev/path1"><span>Go to Boot.dev path1</span></a>
      <a href="/path2"><span>Go to Boot.dev path2</span></a>
  </body>
  </html>`
  const actual = getURLsFromHTML(input, 'https://blog.boot.dev')
  const expected = ['https://blog.boot.dev/', 'https://blog.boot.dev/path1', 'https://blog.boot.dev/path2']
  expect(actual).toEqual(expected)
  });