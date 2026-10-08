import type { Example as ExampleModel } from "../lib/types";
import { CodeBlock } from "./CodeBlock";

type Props = {
  example: ExampleModel;
  index: number;
};

export function Example({ example, index }: Props) {
  const { title, description, code, Demo } = example;

  return (
    <section className="example">
      <header className="example-head">
        <span className="example-index">{String(index + 1).padStart(2, "0")}</span>
        <h3>{title}</h3>
      </header>

      {description ? <p className="example-desc">{description}</p> : null}

      <div className="stage">
        <Demo />
      </div>

      <CodeBlock code={code} />
    </section>
  );
}
