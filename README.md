# Bugs in shapes

This repository contains a reproduction for a bug in shapes. During the initial sync a foreign key constraint fails.
```
yarn
docker compose up -d
yarn prisma migrate reset
yarn electric-sql generate --service localhost:5133 --out src/generated/client
yarn tsx src/bug.ts
```
