import Switch from "@mui/material/Switch";
import { useColorScheme } from "@mui/material/styles";

export default function ThemeSwitcher() {
  const { mode, setMode } = useColorScheme();

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMode(e.target.checked ? "dark" : "light");
  };

  return (
    <>
      <Switch checked={mode == "dark"} onChange={handleThemeChange} />
    </>
  );
}
