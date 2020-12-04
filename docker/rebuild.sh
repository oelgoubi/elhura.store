#!/bin/bash
echo -e "== Arrêt et suppression des containers en cours d'exécution =="
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)

echo -e "\n== Nettoyage =="
docker system prune

echo -e "\n== Suppression des images pour pouvoir les recréer =="
imageName=""
while [ "$imageName" != "q" ]
do
  echo -e "Pour supprimer une image, entrez son nom. Le nom de l'image pour la suppression prend la forme : \n<nom du dossier courant>_<nom du container>\n"
  read -p "    - Nom exact de l'image à supprimer (q pour quitter) : " imageName
  if [ -n $imageName ] && [ "$imageName" != "q" ]
  then
    docker rmi $imageName
  fi
done

echo -e "\n== Rebuild/Relancer les images Docker =="
read -p "- Souhaitez-vous relancer les images ? (y/n) : " choice
if [ "$choice" = "y" ]
then
  docker-compose up -d
fi
echo "----- END -----"
