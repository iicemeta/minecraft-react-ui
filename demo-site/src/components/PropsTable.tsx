import type { PropRow } from "../lib/types";

type Props = {
  rows: Array<PropRow>;
};

export function PropsTable({ rows }: Props) {
  if (rows.length === 0) return null;

  return (
    <div className="table-scroll">
      <table className="props-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td>
                <code className="prop-name">{row.name}</code>
              </td>
              <td>
                <code className="prop-type">{row.type}</code>
              </td>
              <td>
                {row.defaultValue ? (
                  <code className="prop-default">{row.defaultValue}</code>
                ) : (
                  <span className="prop-none">—</span>
                )}
              </td>
              <td className="prop-desc">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
