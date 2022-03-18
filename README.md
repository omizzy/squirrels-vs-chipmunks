-   Create a database with the right permissions.
-   Create ormconfig.json file, for example

```
{
    "type": "mysql",
    "host": "somehost",
    "port": 3306,
    "username": "mydb",
    "password": "",
    "database": "squirrels_vs_chipmunks",
    "charset": "utf8mb4_unicode_ci",
    "timezone": "Z",
    "synchronize": false,
    "migrationsRun": false,
    "migrationsTableName": "migration",
    "logger": "simple-console",
    "logging": "error",
    "entities": ["src/entity/**/*.ts"],
    "migrations": ["src/migration/*.ts"],
    "cli": {
        "migrationsDir": "src/migration"
    }
}

```

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
