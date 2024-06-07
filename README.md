# HOW-TO contribute

1. For each new feature a new dedicated branch must be created.
> *EXAMPLE*: `feature-auth` for everything that reconnects to <br />the authentication part of the project

2. If the feature is complete and tested it is possible to merge it with the main branch.

3. It is also suggested to create sub-features in order to make the git flow more modular.
> *EXAMPLE*: `feature-auth` could be divided in `feature-auth-login` and `feature-auth-signup`.

# HOW-TO run

1. To run the whole project you must download and setup xampp, then you'll
   have to locate your project folder inside xampp's `htdocs` folder.
> *NOTE*: remember to locate there not just the project folder, 
        but the git project too.

2. Run xampp on your device: `./xampp start`.
> *NOTE*: it might require root permissions, in that case write your device's root user credentials.

3. Open firefox, since we don't use a js framework that manages cross-browser compatibility it is better to stick to the same browser, and go to url: `localhost`
> *NOTE*: from there it is possible to manage and see the website.<br />
> Useful xampp urls: `localhost/phpmyadmin`, `localhost/phpinfo`, `localhost/<project-folder-name>`

4. In case you haven't created and populated the db just go to `localhost/phpmyadmin`:<br />
	- paste `db_create.sql` into the SQL query editor;
	- then proceed in the same manner for `db_populate.sql`. 

4. When you've finished power off xampp with the command: `./xampp stop`.
> *NOTE*: it might require root permissions, just like at the start.

# Beachgoers
A beachful social media platform made using LAMPP stack.
