import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Auto dark mode based on system preference
const mq = window.matchMedia("(prefers-color-scheme: dark)");
const applyTheme = (dark: boolean) => {
  document.documentElement.classList.toggle("dark", dark);
};
applyTheme(mq.matches);
mq.addEventListener("change", (e) => applyTheme(e.matches));

createRoot(document.getElementById("root")!).render(<App />);
