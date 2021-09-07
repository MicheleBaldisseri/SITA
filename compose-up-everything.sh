#!/bin/bash

# exit on error
set -e

# builda le immagini dei microservizi Java 
mvn   -f back-end/pom.xml   install   -DskipTests

# builda e fa partire i servizi del backend
docker-compose   --file ./back-end/docker-compose.yml   --env-file ./back-end/.env   up   --build   --force-recreate   --detach

