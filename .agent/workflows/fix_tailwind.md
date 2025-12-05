---
description: Fix TailwindCSS @tailwind unknown rule warnings in Next.js project
---

## Steps to resolve the `Unknown at rule @tailwind` warnings in `src/app/globals.css`

1. **Verify Tailwind CSS is installed**
   ```bash
   npm list tailwindcss
   ```
   If Tailwind is not listed, proceed to step 2.

2. **Install Tailwind CSS and its peer dependencies**
   // turbo
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   ```

3. **Initialize Tailwind configuration**
   // turbo
   ```bash
   npx tailwindcss init -p
   ```
   This creates `tailwind.config.js` and `postcss.config.js` at the project root.

4. **Configure `tailwind.config.js`**
   Ensure the `content` array includes all files where Tailwind classes are used, e.g.:
   ```js
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
       "./src/**/*.{js,jsx,ts,tsx}",
       "./app/**/*.{js,jsx,ts,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```

5. **Verify `postcss.config.js`**
   It should contain:
   ```js
   module.exports = {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   };
   ```

6. **Update `src/app/globals.css`**
   Ensure the file starts with the Tailwind directives (order matters):
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
   Remove any duplicate or misplaced `@tailwind` lines.

7. **Restart the development server**
   ```bash
   npm run dev
   ```
   The warnings should disappear, and Tailwind classes will be processed correctly.

8. **Optional: Verify Tailwind is working**
   Add a test element in any component, e.g. `<div className="bg-indigo-500 p-4">Test</div>` and confirm the styles appear.

---

**Note:** If you encounter any further build errors, check the console for missing dependencies or mis‑configured paths.
