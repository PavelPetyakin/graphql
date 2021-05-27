# graphql
apollo client server

### Create DataBase Dump
`pg_dump [OPTION]... [DBNAME]`

`pg_dump --file=graphqldump.sql graphql`
or
`pg_dump graphql > graphqldump.sql`

### Restore DataBase Dump через IDEA
`pg_restore [OPTION]... [FILE]`

`pg_restore --dbname=test_db graphqldump.sql`
