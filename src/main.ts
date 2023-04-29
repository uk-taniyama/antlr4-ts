import './style.css';

import { parseByListener, parseByVisitor } from '../lib';
import { lexerErrorHtml, parserErrorHtml, successHtml } from '../lib/index.data';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div>
      <button id="setSuccess" type="success">setSuccess</button>
      <button id="setLexerError" type="error">setLexerError</button>
      <button id="setParserError" type="error">setParseError</button>
    </div>
    <div>
      <button id="parseByListener" type="button">parseByListener</button>
      <button id="parseByVisitor" type="button">parseByVisitor</button>
    </div>
    <table>
      <tr>
        <td>input</td>
        <td><textarea id="input" cols="80" rows="20"></textarea></td>
      </tr>
      <tr>
        <td>output</td>
        <td><pre id="output"></pre></td>
      </tr>
    </table>
  </div>
`;

function getInput() {
  return document.querySelector<HTMLTextAreaElement>('#input')!.value;
}
function setInput(value: string) {
  document.querySelector<HTMLTextAreaElement>('#input')!.value = value.trim();
}
function setOutput(text: string) {
  document.querySelector<HTMLPreElement>('#output')!.innerText = text;
}
function callParse(name: string, parse: (input: string) => string[]) {
  const text = getInput();
  if (text == null || text === '') {
    setOutput('inputが空っぽ');
    return;
  }
  try {
    const res = parse(text);
    setOutput(`${name}:Success:${res.join(',')}`);
  } catch (e) {
    setOutput(`${name}:Error:${e}`);
  }
}

document.querySelector<HTMLButtonElement>('#setSuccess')!.onclick = () => setInput(successHtml);
document.querySelector<HTMLButtonElement>('#setLexerError')!.onclick = () => setInput(lexerErrorHtml);
document.querySelector<HTMLButtonElement>('#setParserError')!.onclick = () => setInput(parserErrorHtml);

document.querySelector<HTMLButtonElement>('#parseByListener')!.onclick = () => callParse('parseByListener', parseByListener);
document.querySelector<HTMLButtonElement>('#parseByVisitor')!.onclick = () => callParse('parseByVisitor', parseByVisitor);
