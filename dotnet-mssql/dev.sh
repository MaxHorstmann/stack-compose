#!/bin/sh
docker-compose up -d
docker attach dotnet
docker-compose down