const { sortReport } = require('./report.js')

test('sortReport', () => {
    const input = {
        'https://example.com/page1': 2,
        'https://example.com/page2': 5,
        'https://example.com/page3': 7,
        'https://example.com/page4': 1
    }
    const actual = printReport(input)
    const expected = [
        ['https://example.com/page3', 7],
        ['https://example.com/page2', 5],
        ['https://example.com/page1', 2],
        ['https://example.com/page4', 1]
    ]
    expect(actual).toEqual(expected)
  });