import { useContext } from "react";

import { SettingsContext } from "~/components/settings-context";

export default function useSettings() {
  return useContext(SettingsContext);
}
