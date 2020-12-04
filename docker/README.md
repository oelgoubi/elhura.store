# Docker Dev

Ce projet permet de disposer d'un environnement de type LAMP depuis Docker.

Répertoire à créer
------------------

* mysql/

VirtualHosts
------------------
* Il faut penser à configurer ses noms de domaines dans le fichier **_hosts_** (sous Windows ou sous Linux).

Exemple :
```
127.0.0.1 <nom de domaine>
```
* Il est conseillé d'ajouter une extension (ex : .fr) aux noms de domaine destiné à utiliser le protocol HTTPS (pour la certification SSL)
* Les VirtualHosts doivent être créé dans le dossier **_/etc/apache2/sites-available/_**. La configuration des VirtualHosts doit suivre un schéma spécifique :
```conf
<VirtualHost *:80>
  ServerAdmin admin@<nom de domaine>
  ServerName <nom de domaine>
  DocumentRoot /var/www/<nom du dossier du site>/

  <Directory /var/www/<nom du dossier du site>/>
    Options Indexes FollowSymLinks MultiViews
    AllowOverride All
    Require all granted
  </Directory>

  <FilesMatch \.php$>
    # For Apache version 2.4.10 and above, use SetHandler to run PHP as a fastCGI process server
    SetHandler "proxy:fcgi://<container PHP>:<port d'écoute de PHP>"
  </FilesMatch>

  Redirect permanent / https://<nom de domaine>/

  ErrorLog ${APACHE_LOG_DIR}/<nom de domaine>_error.log
  CustomLog ${APACHE_LOG_DIR}/<nom de domaine>_access.log combined
</VirtualHost>

<VirtualHost *:443>
  ServerAdmin admin@<nom de domaine>
  ServerName <nom de domaine>
  DocumentRoot /var/www/<nom du dossier du site>/

  <Directory /var/www/<nom du dossier du site>/>
    Options Indexes FollowSymLinks MultiViews
    AllowOverride All
    Require all granted
  </Directory>

  <FilesMatch \.php$>
    # For Apache version 2.4.10 and above, use SetHandler to run PHP as a fastCGI process server
    SetHandler "proxy:fcgi://<container PHP>:<port d'écoute de PHP>"
  </FilesMatch>

  Session On

  LogLevel debug

  ErrorLog ${APACHE_LOG_DIR}/<nom de domaine>_error.log
  CustomLog ${APACHE_LOG_DIR}/<nom de domaine>_access.log combined

  SSLEngine on
  SSLProtocol all -SSLv2
  SSLCertificateFile /root/.mkcert/localhost+4.pem
  SSLCertificateKeyFile /root/.mkcert/localhost+4-key.pem
</VirtualHost>
```

Certification SSL
------------------
* Dans le fichier Dockerfile d’Apache (**_apache/Dockerfile_**), il faut préciser les noms de domaines qui doivent être configurer pour utiliser le protocole HTTPS et non le HTTP (indispensable pour l’utilisation de la connexion par serveur CAS).

Ligne 30 du Dockerfile :
```docker
RUN cd /root/.mkcert && /root/.mkcert/./mkcert localhost <nom de domaine 1> <nom de domaine 2> ..
```
* Par la suite, le certificat SSL aura pour nom **_localhost+X.pem_** et la clé du certificat **_localhost+X-key.pem_** ou X prend pour valeur le nombre de nom de domaine (sans compter le localhost) que l’on a précisé dans la ligne 30 du Dockerfile.

Activation des VirtualHosts
------------------
* Pour activer les VirtualHosts, il faut entrer dans le container d’Apache avec la commande :

```bash
(winpty) docker exec -ti <nom du container Apache> bash
```

* Et lancer ensuite les commandes (pour chaque VirtualHost) :

```bash
a2ensite <nom du VirtualHost>
```

* Et terminer avec la commande :

```bash
service apache2 reload
```

* Il est également possible d'automatiser le lancement des VirtualHosts en modifiant le fichier **_apache/run.sh_** (pour relancer automatiquement lors de chaque rebuild).

Scripts disponibles
------------------
### - `launch.sh` :
Ce script permet de lancer l'application MultiContainer (avec la commande `docker-compose up -d`)
### - `stop.sh` :
Ce script permet de stopper tous les containers qui sont lancés et de les supprimer (mais pas les images). Ce script ne permet pas de reconstruire ses images.
### - `rebuild.sh` :
Ce script permet de stopper et supprimer tous les containers qui sont lancés, mais également de supprimer les images (au choix dans le script).
On peut choisir de supprimer seulement une image pour la reconstruire si elle a été modifié (et ainsi éviter de reconstruire l'intégralité de nos images, ce qui prend un temps fou).

Une fois lancée :
------------------
Une fois que l'application est lancée (l'intégralité des images construites et les containers activés), on peut accéder à nos services :
* http://localhost:8080 -> permet d'accéder à Adminer et ainsi aux BDD de mySQL
* http://`<nom de domaine>` ou https://`<nom de domaine>` -> permet d'accéder au site Internet (où le dépôt du site à été préalablement copier/coller dans le dossier **_www/<dépot du site>_**) configuré avec le nom de domaine précisé.
* http://php72  -> permet d'accéder à la page d'info de la version de PHP
