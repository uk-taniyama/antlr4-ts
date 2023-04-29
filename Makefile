ANTLR_JAR=antlr-4.12.0-complete.jar
ANTLR_LANG=JavaScript
ANTLR_LANG=TypeScript
# ANTLR_LANG=Java

.PHONY: get-jar
get-jar:
	mkdir -p grammars
	cd grammars && curl -sSLO https://www.antlr.org/download/$(ANTLR_JAR)

.PHONY: get-g4
get-g4:
	curl -sSL https://raw.githubusercontent.com/antlr/grammars-v4/master/html/HTMLLexer.g4 -o grammars/HTMLLexer.g4
	curl -sSL https://raw.githubusercontent.com/antlr/grammars-v4/master/html/HTMLParser.g4 -o grammars/HTMLParser.g4

.PHONY: gen
gen:
	java -jar grammars/$(ANTLR_JAR) -Dlanguage=$(ANTLR_LANG) -visitor grammars/HTMLLexer.g4
	java -jar grammars/$(ANTLR_JAR) -Dlanguage=$(ANTLR_LANG) -visitor grammars/HTMLParser.g4

.PHONY:
build:
	npm run build

.PHONY:
dev:
	npm run dev

.PHONY: run
run:
	npm run cli

.PHONY: lint
lint:
	npm run lint -- --fix

.PHONY: test
test:
	npm run test
