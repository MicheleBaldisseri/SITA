#!/bin/bash

# exit on error
set -e

docker-compose --file ./back-end/docker-compose.yml --env-file ./back-end/.env down --remove-orphans --rmi all --volumes

mvn -f back-end/pom.xml clean
