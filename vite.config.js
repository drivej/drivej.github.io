import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [react(), mkcert()],
  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: 'bootstrap-wrapper-roots',
          Rule(rule) {
            // Sass scopes Bootstrap's classes. Map document-level selectors
            // to the wrapper so its variables and base styles work there too.
            rule.selector = rule.selector.replace(
              /\.bootstrap-scope\s+(?::root|html|body)(?=[\s.#:[>+~,]|$)/g,
              '.bootstrap-scope'
            );
          }
        }
      ]
    }
  },
  server: {
    host: true
  }
});
