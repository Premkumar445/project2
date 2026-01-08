import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  // ✅ GitHub Pages base path
  
  
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',  // Django backend
        changeOrigin: true,
        secure: false,
      }
    }
  },
  
  // ✅ GitHub Pages build config
  build: {
    outDir: 'dist',
    sourcemap: mode === 'production' ? false : true,
  },
  
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
