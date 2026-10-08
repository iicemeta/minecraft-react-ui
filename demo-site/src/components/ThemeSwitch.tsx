import { ButtonGroup } from "@iicemeta/minecraft-react-ui";

import type { ThemePreference } from "../lib/theme";

type Props = {
  preference: ThemePreference;
  onChange: (next: ThemePreference) => void;
};

/**
 * The showcase's own theme control, deliberately built from the library's
 * ButtonGroup — the docs site is also a usage example.
 */
export function ThemeSwitch({ preference, onChange }: Props) {
  return (
    <ButtonGroup
      className="theme-switch"
      value={preference}
      onChange={(value) => onChange(value as ThemePreference)}
      options={[
        { value: "auto", label: "Auto" },
        { value: "light", label: "Light" },
        { value: "dark", label: "Dark" },
      ]}
    />
  );
}
