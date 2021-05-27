# graphql
apollo client server

### Create DataBase Dump
`pg_dump [OPTION]... [DBNAME]`

`pg_dump --no-owner --file=graphqldump.sql graphql`
or
`pg_dump --no-owner graphql > graphqldump.sql
`

### Restore DataBase Dump через IDEA
`pg_restore [OPTION]... [FILE]`

`pg_restore --dbname=test_db graphqldump.sql`
