import { lexerErrorHtml, parserErrorHtml, successHtml } from './index.data';

import { parseByListener, parseByVisitor } from './index';

const lexerErrorMessage = "SyntaxError 6:0 token recognition error at: '<' LexerNoViableAltException";
const parserErrorMessage = "SyntaxError 5:24 extraneous input '/' expecting {'>', '/>', TAG_NAME} null";

describe(('listener'), () => {
  test('Success', () => {
    const names = parseByListener(successHtml);
    // NOTE exitHtmlElementで捕捉ため、閉じタグのタイミングとなる。
    // これにより、応答は</...>の出現順となる。
    // enterHtmlElementでも捕捉可能であるが、タグの中身がない......
    // このような場合、visitorを用いるほうが処理が楽になる。
    expect(names).toEqual(['title', 'meta', 'h1', 'p', 'body', 'head', 'html']);
  });
  test('LexerError', () => {
    expect(() => {
      parseByListener(lexerErrorHtml);
    })
      .toThrowError(lexerErrorMessage);
  });
  test('ParserError', () => {
    expect(() => {
      parseByListener(parserErrorHtml);
    })
      .toThrowError(parserErrorMessage);
  });
});

describe(('visitor'), () => {
  test('Success', () => {
    const names = parseByVisitor(successHtml);
    // NOTE visitHtmlElementで順次捕捉可能なため、出現順となる。
    expect(names).toEqual(['html', 'head', 'title', 'meta', 'body', 'h1', 'p']);
  });
  test('LexerError', () => {
    expect(() => {
      parseByVisitor(lexerErrorHtml);
    })
      .toThrowError(lexerErrorMessage);
  });
  test('ParserError', () => {
    expect(() => {
      parseByVisitor(parserErrorHtml);
    })
      .toThrowError(parserErrorMessage);
  });
});
