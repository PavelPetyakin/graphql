# graphql
apollo client server

### Create DataBase Dump
`pg_dump [OPTION]... [DBNAME]`

`pg_dump --file=graphqldump.sql graphql`

### Restore DataBase Dump
`pg_restore [OPTION]... [FILE]`

`pg_dump --dbname=test_db graphqldump.sql`
