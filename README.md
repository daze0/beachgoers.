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

# General TO-DO list

1. Complete *index* page:
	- Position "register here" better;

2. Complete profile page:
	- Implement followers-list-popup.js:
		- Adapt code to the request
		- Implement listener callback code
	- Implement following-list-popup.js:
		- Adapt code to the request
		- Implement listener callback code
	- Setup report feature:
		- Create fine-grained flag svg and add event listener
		- After 10 reports the post is removed:
			- Add report to post attributes in db
			- Implement query that checks a post's reports
			- Implement query that deletes a post with too many reports.
		- Notify removed post to user.
	- Complete comment section:
		- BUG#1: when a comment section is opened it doesn't consider
		if other comment sections are already open. To be fixed.
		- Implement commentSendCallback and commentLikeCallback:
			- fix comment send client side
		- Implement APIs and queries for comment operations
		
## Security issues

1. Authentication is not protected

2. New post text area may contain dangerous code
