#!/bin/bash
echo "== Arrêt et suppression des containers en cours d'exécution =="
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
echo "----- END -----"
