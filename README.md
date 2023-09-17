# Bugs in electric-sql client generations

This repository contains a reproduction for 2 bugs in electric-sql client generation related to indexes.
The repository contains devcontainer definitions so you can run it in GitHub Codespaces or locally in VSCode.

## Bug 1: CREATE INDEX together with ADD COLUMN statements

To reproduce:

1. Open this repository in a devcontainer
    - The .devcontainer/post-create.sh script will be automatically run
    - It will run `yarn install`
    - It will also run `ops/bin/replace-console-error.sh` which patches one of the electric-sql packages to give a stack trace for the error we're reproducing
2. Run `docker-compose up`
3. In another terminal, run

    ```
    cd bug-1
    npx prisma migrate deploy
    ```

4. Then run

    ```
    cd ..
    npx electric-sql generate
    ```

    You should get the following output:

    ```
    generate command failed: SqliteError: duplicate column name: category
        at Database.exec (/home/node/workspace/node_modules/better-sqlite3/lib/methods/wrappers.js:9:14)
        at file:///home/node/workspace/node_modules/electric-sql/dist/cli/migrations/migrate.js:17:418
        at Array.forEach (<anonymous>)
        at W (file:///home/node/workspace/node_modules/electric-sql/dist/cli/migrations/migrate.js:17:405)
        at v (file:///home/node/workspace/node_modules/electric-sql/dist/cli/migrations/migrate.js:1:1732)
        at async et (file:///home/node/workspace/node_modules/electric-sql/dist/cli/migrations/migrate.js:1:544)
        at async d (file:///home/node/workspace/node_modules/electric-sql/dist/cli/migrations/handler.js:1:129)
        at async file:///home/node/workspace/node_modules/electric-sql/dist/cli/index.js:2:362 {
    code: 'SQLITE_ERROR'
    }
    ```

## Bug 2: CREATE INDEX by itself

To reproduce:

1. Open this repository in a devcontainer
2. Run `docker-compose down --volumes` to reset the database and electric if you previously reproduced bug 1
3. Run `docker-compose up`
4. In another terminal, run

    ```
    cd bug-2
    npx prisma migrate deploy
    ```
5. Then run

    ```
    cd ..
    npx electric-sql generate
    ```

    You should get the following output

    ```
    Generating Electric client...
    Successfully generated Electric client at: ./src/generated/client
    Building migrations...
    generate command failed: TypeError: Cannot read properties of undefined (reading 'name')
        at st (file:///home/node/workspace/node_modules/electric-sql/dist/satellite/process.js:69:115)
        at Array.map (<anonymous>)
        at V (file:///home/node/workspace/node_modules/electric-sql/dist/migrators/builder.js:2:161)
        at Array.map (<anonymous>)
        at f (file:///home/node/workspace/node_modules/electric-sql/dist/cli/migrations/builder.js:2:245)
        at async y (file:///home/node/workspace/node_modules/electric-sql/dist/cli/migrations/builder.js:1:183)
        at async v (file:///home/node/workspace/node_modules/electric-sql/dist/cli/migrations/migrate.js:1:2045)
        at async et (file:///home/node/workspace/node_modules/electric-sql/dist/cli/migrations/migrate.js:1:544)
        at async d (file:///home/node/workspace/node_modules/electric-sql/dist/cli/migrations/handler.js:1:129)
        at async file:///home/node/workspace/node_modules/electric-sql/dist/cli/index.js:2:362
    ```
