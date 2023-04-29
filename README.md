# antlr4-ts
TypeScriptでantlr4を使ってみる。

# 前提

java 17.0.5
node 18.16.0
antlr4 4.12.0

# 試し方

- make get-jar
  antlr4のjarをダウンロードする。
- make get-g4
  antlr-grammars4から.g4をダウンロードする。
- make dev
  web経由で実行してみる。
- make run
  cli(ts-node)で実行してみる。
- make test
  jest経由で実行する。
- make build
  ビルドする。

# 制限事項

tscを実行するとエラーが発生する。
antrl4のdevブランチでは修正済み。

grammars/HTMLLexer.ts:45:52 - error TS2322: Type 'null' is not assignable to type 'string'.

grammars/HTMLLexer.tsを修正。

```
public static readonly literalNames: string[] = 
public static readonly symbolicNames: string[] =
->
public static readonly literalNames: (string|null)[] = 
public static readonly symbolicNames: (string|null)[] =
```

grammars/HTMLParser.ts:773:36 - error TS2345: Argument of type 'typeof ScriptletOrSeaWsContext' is not assignable to parameter of type 'new (parser?: Parser | undefined, parent?: ParserRuleContext | undefined, invokingState?: number | undefined, ...args: any[]) => ScriptletOrSeaWsContext'.

node_modules/antlr4/src/antlr4/context/ParserRuleContext.d.tsを修正。

```
getTypedRuleContext<T extends ParserRuleContext>(ctxType: { new (parser?: Parser, parent?: ParserRuleContext, invokingState?: number, ...args: any[]) : T}, i: number): T;
getTypedRuleContexts<T extends ParserRuleContext>(ctxType: { new (parser?: Parser, parent?: ParserRuleContext, invokingState?: number, ...args: any[]) : T}): T[];
->
getTypedRuleContext<T extends ParserRuleContext, P extends Parser>(ctxType: { new (parser?: P, parent?: ParserRuleContext, invokingState?: number, ...args: any[]) : T}, i: number): T;
getTypedRuleContexts<T extends ParserRuleContext, P extends Parser>(ctxType: { new (parser?: P, parent?: ParserRuleContext, invokingState?: number, ...args: any[]) : T}): T[];
```
