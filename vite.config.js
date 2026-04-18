import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        compact: true,
      },
    }),
    tailwindcss(), 
  ],
  
  build: {
    // Optimal for production
    target: 'ES2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      output: {
        comments: false,
      },
    },
    
    // Code splitting strategy for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor libraries
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-animation': ['gsap', '@gsap/react', 'framer-motion'],
          'vendor-ui': ['react-icons', 'tailwindcss', 'styled-components'],  // ← flyonui HATAYA
          'vendor-api': ['axios'],
        },
        // Optimize chunk names
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|gif|svg|webp|ico/.test(ext)) {
            return `images/[name]-[hash][extname]`;
          } else if (/woff|woff2|eot|ttf|otf/.test(ext)) {
            return `fonts/[name]-[hash][extname]`;
          } else if (ext === 'css') {
            return `css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    
    // Performance thresholds and optimizations
    chunkSizeWarningLimit: 600,
    reportCompressedSize: true,
    sourcemap: process.env.VITE_SOURCE_MAP === 'true' ? 'hidden' : false,
    
    // Output directory
    outDir: 'dist',
    assetsDir: 'assets',
  },

  // Development server optimizations
  server: {
    middlewareMode: false,
    cors: true,
  },

  // Module resolution optimization
  resolve: {
    alias: {
      '@': '/src',
    },
  },

  // Environment-based optimization
  define: {
    __DEV__: JSON.stringify(!process.env.VITE_PRODUCTION),
  },
})