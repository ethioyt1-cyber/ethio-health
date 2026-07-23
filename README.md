# Ethio Health — Phase 1

Patient sign-up, log in, and language switching (English / Amharic / Afaan Oromo).

## Run it on your computer

1. Unzip this folder anywhere on your computer.
2. Open the folder in VS Code.
3. Open a terminal in VS Code (Terminal menu → New Terminal).
4. Run:
   ```
   npm install
   ```
   (this downloads the packages the app needs — only needed once)
5. Run:
   ```
   npm run dev
   ```
6. It will print a link like `http://localhost:5173` — open that in your browser.

You now have a working app. Try switching languages, creating an account, and logging back in.

## Notes

- Accounts are stored in your browser's local storage for this demo — not a real database yet. That comes in a later phase.
- Passwords are not encrypted in this prototype — fine for a demo, not for production.
