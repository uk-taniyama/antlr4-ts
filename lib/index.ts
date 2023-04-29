import {
  CharStream, CommonTokenStream, ErrorListener, ParseTreeWalker,
} from 'antlr4';

import HTMLLexer from '../grammars/HTMLLexer';
import HTMLParser from '../grammars/HTMLParser';
import HTMLParserListener from '../grammars/HTMLParserListener';
import HTMLParserVisitor from '../grammars/HTMLParserVisitor';

class CustomErrorListener extends ErrorListener<any> {
  constructor() {
    super();
    this.syntaxError = (recognizer, offendingSymbol, line, column, msg, e) => {
      throw new Error(`SyntaxError ${line}:${column} ${msg} ${e}`);
    };
  }
}

class CustomParserListener extends HTMLParserListener {
  names: string[];

  constructor() {
    super();
    this.names = [];
    this.exitHtmlElement = (ctx) => {
      this.names.push(ctx.TAG_NAME(0).getText());
    };
  }
}

class CustomVisitor extends HTMLParserVisitor<any> {
  names: string[];

  constructor() {
    super();
    this.names = [];
    this.visitHtmlElement = (ctx): any => {
      if (!ctx) {
        return null;
      }
      this.names.push(ctx.TAG_NAME(0).getText());
      // NOTE 探索を続行する場合、visitChildrenで探索する。
      return this.visitChildren(ctx);
    };
    this.visitErrorNode = (node) => {
      throw new Error(`SyntaxError ${node.symbol.line}:${node.symbol.column}`);
    };
  }
}

export function parseByListener(input: string) {
  const errorLister = new CustomErrorListener();
  const chars = new CharStream(input);
  const lexer = new HTMLLexer(chars);
  // NOTE defaultエラーハンドラにより、コンソールにエラーが表示される。
  lexer.removeErrorListeners();
  lexer.addErrorListener(errorLister);
  const tokens = new CommonTokenStream(lexer);
  const parser = new HTMLParser(tokens);
  const listener = new CustomParserListener();
  // NOTE defaultエラーハンドラにより、コンソールにエラーが表示される。
  parser.removeErrorListeners();
  parser.addErrorListener(errorLister);
  const context = parser.htmlDocument();
  ParseTreeWalker.DEFAULT.walk(listener, context);
  return listener.names;
}

export function parseByVisitor(input: string) {
  const errorLister = new CustomErrorListener();
  const chars = new CharStream(input);
  const lexer = new HTMLLexer(chars);
  lexer.removeErrorListeners();
  lexer.addErrorListener(errorLister);
  const tokens = new CommonTokenStream(lexer);
  const parser = new HTMLParser(tokens);
  // NOTE defaultエラーハンドラにより、コンソールにエラーが表示される。
  parser.removeErrorListeners();
  // NOTE parserのエラーも取得可能であるが、visitErrorNodeである程度処理も可能。
  parser.addErrorListener(errorLister);
  const visitor = new CustomVisitor();
  const context = parser.htmlDocument();
  context.accept(visitor);
  return visitor.names;
}
