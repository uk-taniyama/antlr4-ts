import { parseByListener, parseByVisitor } from '../lib';
import { lexerErrorHtml, parserErrorHtml, successHtml } from '../lib/index.data';

const htmlMap = {
  successHtml,
  lexerErrorHtml,
  parserErrorHtml,
};

function callParse(name: string, parse: (input: string) => string[]) {
  console.log(name);
  Object.entries(htmlMap).forEach(([n, html]) => {
    console.log(n);
    try {
      const res = parse(html);
      console.log(`Success:${res.join(',')}`);
    } catch (e) {
      console.log(`Error:${e}`);
    }
  });
}

callParse('parseByListener', parseByListener);
callParse('parseByVisitor', parseByVisitor);
