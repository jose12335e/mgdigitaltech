import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return undefined;
          }

          if (id.includes("react") || id.includes("scheduler")) {
            return "react";
          }

          if (
            id.includes("i18next") ||
            id.includes("react-i18next")
          ) {
            return "i18n";
          }

          if (id.includes("framer-motion") || id.includes("lucide-react")) {
            return "motion";
          }

          if (id.includes("@emailjs") || id.includes("@supabase")) {
            return "services";
          }

          return "vendor";
        },
      },
    },
  },
});
