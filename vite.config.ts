import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
    // Needed by ketcher library.
    global: "window",
  },
  plugins: [react()],
});
