FROM postgres:latest
ENV POSTGRES_PASSWORD 123456789
ENV POSTGRES_DB sita 

COPY postgres-init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432
