import { Tag } from "@iicemeta/minecraft-react-ui";

import { CodeBlock } from "../components/CodeBlock";
import { Example } from "../components/Example";
import { PropsTable } from "../components/PropsTable";
import { entryById, groups } from "../registry";
import { routeHref } from "../lib/useHashRoute";

type Props = {
  id: string;
};

const importLine = (title: string) =>
  `import { ${title} } from "@iicemeta/minecraft-react-ui";`;

export function ComponentPage({ id }: Props) {
  const entry = entryById.get(id);

  if (!entry) {
    return (
      <article className="page">
        <h1>Not found</h1>
        <p>
          No component is registered under <code>{id}</code>.
        </p>
        <p>
          <a href={routeHref("overview")}>Back to the component index</a>
        </p>
      </article>
    );
  }

  const flat = groups.flatMap((group) => group.items);
  const position = flat.findIndex((candidate) => candidate.id === entry.id);
  const previous = position > 0 ? flat[position - 1] : undefined;
  const next = position < flat.length - 1 ? flat[position + 1] : undefined;

  return (
    <article className="page">
      <header className="entry-head">
        <span className="entry-group">{entry.group}</span>
        <h1>{entry.title}</h1>
        <p className="entry-summary">{entry.summary}</p>
        <CodeBlock code={importLine(entry.title)} />
      </header>

      <section className="block">
        <div className="block-title">
          <h2>Examples</h2>
          <Tag>
            {entry.examples.length} example{entry.examples.length === 1 ? "" : "s"}
          </Tag>
        </div>
        {entry.examples.map((example, index) => (
          <Example key={example.title} example={example} index={index} />
        ))}
      </section>

      <section className="block">
        <div className="block-title">
          <h2>Props</h2>
          <Tag>{entry.props.length}</Tag>
        </div>
        <PropsTable rows={entry.props} />
      </section>

      {entry.notes && entry.notes.length > 0 ? (
        <section className="block">
          <h2>Notes</h2>
          <ul className="plain-list">
            {entry.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <nav className="entry-nav">
        {previous ? (
          <a href={routeHref(`component/${previous.id}`)}>
            <span className="entry-nav-label">Previous</span>
            <span className="entry-nav-name">{previous.title}</span>
          </a>
        ) : (
          <span />
        )}
        {next ? (
          <a className="entry-nav-next" href={routeHref(`component/${next.id}`)}>
            <span className="entry-nav-label">Next</span>
            <span className="entry-nav-name">{next.title}</span>
          </a>
        ) : null}
      </nav>
    </article>
  );
}
