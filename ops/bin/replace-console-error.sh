#!/bin/sh
sed -i 's/console\.error("generate command failed: "+n)/console.error("generate command failed:", n)/g' /home/node/workspace/node_modules/electric-sql/dist/cli/migrations/migrate.js
