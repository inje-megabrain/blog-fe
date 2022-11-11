const TagSupporter = class {
  static TAG_EXPRESSION = {
    h1: /(^# )|(^#&nbsp;)/,
    h2: /(^## )|(^##&nbsp;)/,
    h3: /(^### )|(^###&nbsp;)/,
    li: /(^- )|(^-&nbsp;)|(^\* )|(^\*&nbsp;)/,
    code: /(^``` )|(^```&nbsp;)/,
  };

  static support(
    value: string,
  ): [keyof typeof this.TAG_EXPRESSION, string] | undefined {
    for (const [tag, expr] of Object.entries(this.TAG_EXPRESSION)) {
      if (expr.test(value))
        return [
          tag as keyof typeof this.TAG_EXPRESSION,
          value.replace(expr, ''),
        ];
    }
    return undefined;
  }
};

export default TagSupporter;
