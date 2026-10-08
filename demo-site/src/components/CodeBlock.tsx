import { useState } from "react";

type Props = {
  code: string;
};

export function CodeBlock({ code }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      // clipboard is unavailable over plain http or without permission
    }
  };

  return (
    <div className="code-block">
      <button type="button" className="code-copy" onClick={copy}>
        {copied ? "copied" : "copy"}
      </button>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
