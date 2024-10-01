import MessagesList from "./modules/messages-list";
import Header from "./modules/header/index";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <main className="w-[420px] h-[600px] p-3">
          <MessagesList />
        </main>
      </ThemeProvider>
    </>
  );
}

export default App;
