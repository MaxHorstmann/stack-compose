#!/bin/sh
docker-compose up -d
docker attach app
docker-compose down