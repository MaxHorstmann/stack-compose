#!/bin/sh
docker-compose up -d
docker attach dotnet  # or rust, or golang... 
docker-compose down