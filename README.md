-   Create a database using the information specified in the

-   Generate a migration example

```
./node_modules/.bin/ts-node -r tsconfig-paths/register node_modules/typeorm/cli.js migration:generate -n SquirrelsVsChipmunks
```

-   Run migration

```
./node_modules/.bin/ts-node -r tsconfig-paths/register node_modules/typeorm/cli.js migration:run
```

-   Revert migration

```
./node_modules/.bin/ts-node -r tsconfig-paths/register node_modules/typeorm/cli.js migration:revert
```

-   Seed

```
./node_modules/.bin/ts-node -r tsconfig-paths/register ./src/command/big-bang.ts
```

-   Run app

```
./node_modules/.bin/ts-node -r tsconfig-paths/register ./src/app/get-traversals.ts
```
