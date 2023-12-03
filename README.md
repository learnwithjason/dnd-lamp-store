# Light for every adventurer

These stones are all imbued with continual light, and you old pal Bingus always goes the extra mile: each has a lil something special to give you and your party a pick-me-up to suit any quest.

## Local dev

```bash
gh repo clone learnwithjason/dnd-lamp-store

cd dnd-lamp-store/

npm i
```

On your first run only, import the lamp data:

```bash
npx convex import lamps ./convex/lamps.json
```

In a second terminal, start the Convex dev server:

```bash
npx convex dev
```

Then, start the Vite dev server in the first terminal:

```bash
npm run dev
```

## Stack

- Vite
- React
- Convex
- Clerk
