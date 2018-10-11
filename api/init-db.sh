#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER pebee_cms;
    CREATE DATABASE pebee_cms;
    CREATE DATABASE pebee_cms_test;
    ALTER USER pebee_cms WITH ENCRYPTED PASSWORD 'pebee_cms2018!';
    GRANT ALL PRIVILEGES ON DATABASE pebee_cms_test TO pebee_cms;
    GRANT ALL PRIVILEGES ON DATABASE pebee_cms TO pebee_cms;
EOSQL