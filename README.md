# antlr4-ts
TypeScriptでantlr4を使ってみる。

# 前提

java 17.0.5
node 18.16.0

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
