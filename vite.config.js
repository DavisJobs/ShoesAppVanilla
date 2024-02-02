import path, { resolve } from "path";

export default {
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        store: resolve(__dirname, "store/index.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./helpers"),
    },
  },
};
