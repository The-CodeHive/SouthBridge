export default {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // map the CSS variables you set in globals.css
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        border: "var(--color-border)",
        ring: "var(--color-ring)",
        input: "var(--color-input)",
        primary: "var(--color-primary)",
        muted: "var(--color-muted)",
        // add others you might reference (sidebar, card, etc.)
      },
    },
  },
  plugins: [],
};
