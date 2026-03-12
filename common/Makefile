.PHONY: all pdf pptx html validate-svg clean

MARP = npx @marp-team/marp-cli
SRC  = presentation.md
SVGS = $(wildcard images/*.svg)

all: validate-svg pdf pptx html

validate-svg:
	@if [ -n "$(SVGS)" ]; then \
		for f in $(SVGS); do \
			xmllint --noout "$$f" || exit 1; \
		done; \
		echo "SVG validation passed ($$(echo $(SVGS) | wc -w | tr -d ' ') files)"; \
	fi

pdf:
	$(MARP) $(SRC) -o presentation.pdf --allow-local-files

pptx:
	$(MARP) $(SRC) -o presentation.pptx --allow-local-files

html:
	$(MARP) $(SRC) -o presentation.html --allow-local-files

clean:
	rm -f presentation.pdf presentation.pptx presentation.html
