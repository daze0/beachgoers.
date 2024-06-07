ALTER TABLE `user`
    MODIFY `userid` INT NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

INSERT INTO `user` (`username`, `password`, `email`, `name`, `surname`, `telegramUsername`, `userimg`) VALUES
('sandy_shores', '$2y$10$ozvdvjopiwursJ/CWuJ5/OMCkscIOR8UoqjE4aYtWRZLLo.6MeTCS', 'sandy.shores@example.com', 'Sandy', 'Shores', '@sandy_shores_tg', 'sandy_shores_profile-picture.jpg'),
('ocean_explorer', '$2y$10$F18AK4gYzVUxAJRwcWR90uXAtwby3Fbfhp5v0mBIFd1dBbA9bndbC', 'ocean.explorer@example.com', 'Oliver', 'Eastman', '@ocean_explorer_tg', 'ocean_explorer_profile-picture.jpg'),
('wave_rider', '$2y$10$29NJZ7gy0C/y0VHDlQE3YeHYLDh6NsTK2ot0dJcuS9CULkVu2Bl.G', 'wave.rider@example.com', 'Willa', 'Ryder', '@wave_rider_tg', 'wave_rider_profile-picture.jpg'),
('sun_seeker', '$2y$10$oufiVT2GOXnRe3FTtBdP2.kMOOjBaRoYMN1yEfSfwY.Gg70/2XLua', 'sun.seeker@example.com', 'Sam', 'Seeker', '@my_pand0 ', 'sun_seeker_profile-picture.jpg'),
('beach_bum', '$2y$10$Lg6677pg/vWiW7X4HWuSAO8CzEek2XOsZ7LV8F1Wwl6T/Us.e2Jhm', 'beach.bum@example.com', 'Bree', 'Benson', '@beach_bum_tg', 'beach_bum_profile-picture.jpg'),
('sea_breeze', '$2y$10$G1AtGQj0l7fniV3eFr4AMuimADi9aA81DZep15jHfFn0yOcNUZ0VO', 'sea.breeze@example.com', 'Serena', 'Breeze', '@sea_breeze_tg', 'sea_breeze_profile-picture.jpg'),
('surf_sage', '$2y$10$/7KpM0b1EY4Im5pE2/yAyueGOvkBT8WI6ywlS12yKTNFo6GNscuAW', 'surf.sage@example.com', 'Sage', 'Surfer', '@ahxxl', 'surf_sage_profile-picture.jpg'),
('coral_diver', '$2y$10$9FF3hRIZ0miw6xodQHJlBOwYhjeD9aQYHJKFiqwgbUV9Ly/yHaWs6', 'coral.diver@example.com', 'Coraline', 'Diver', '@coral_diver_tg', 'coral_diver_profile-picture.jpg');

ALTER TABLE `user`
    MODIFY `userid` INT NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

ALTER TABLE `post`
    MODIFY `postid` INT NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

INSERT INTO `post` (`author`, `img`, `content`) VALUES
(1, 'malibu-sunset.jpg', 'Enjoying the sunset at Malibu Beach!'),
(1, 'soft-sand.jpg', 'The sand is so soft!'),
(2, 'caribbean.jpg', 'Caribbean are so cool, leave me here please!'),
(2, 'sunday-at-the-beach.jpg', 'Sunday at the beach, time well spent.'),
(3, 'gone-surfing.jpg', 'Gone surfing.'),
(3, 'beach-chilling.jpg', 'Chilling at my local beach, nothing less nothing more.'),
(4, 'sunburnt.jpg', 'Sun cream anyone? I think I sunburnt myself..'),
(4, 'family-at-the-beach.jpg', 'Last day was special, me and my family altogether at the beach!'),
(5, 'plastic-beach.png', 'It is a pity that there is so much plastic at this beach.'),
(5, 'breach.jpg', 'I am Bree welcome to my Breeach! Ah Ah Ah'),
(6, 'flat-ocean-beach.jpg', 'No way the ocean is this flat today, I guess I am just going to chill. Not bad though.'),
(6, 'ocean-breeze.jpg', 'Feel the breeeeeeeze!'),
(7, 'local-sunset.jpg', 'Surfed at my local beachie, here is a sunset pic.'),
(7, 'beach-paradise-friends.jpg', 'Having so much fun with my friends in this beautiful piece of paradise!'),
(8, 'down-below.jpg', 'Imagine what is down below the surface..'),
(8, 'no-coral-beach.jpg', 'Not even a coral in sight, maybe I should change beach, or social?!');

ALTER TABLE `post`
    MODIFY `postid` INT NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

INSERT INTO `comment` (`user`, `post`, `comment`, `likes`) VALUES
(2, 1, 'Malibu sunsets are the best!', 0),
(3, 1, "Too many people, I don't like that!", 0),
(4, 2, 'I can tell by your photo, amazing!', 0),
(6, 2, "Well, that's sand..", 0),
(1, 3, 'Just like Ohio', 0),
(4, 3, "Where is that precisely?", 0),
(5, 4, 'You are damn right!', 0),
(7, 5, "Me too", 0),
(3, 6, 'Peace of senses', 0),
(2, 6, "I envy you!", 0),
(4, 7, 'LMAO it keeps happening to me too!', 0),
(8, 8, "So sweet!", 0),
(1, 9, 'Welcome to society!', 0),
(7, 9, "This world is such a mess.", 0),
(4, 10, 'Funny not funny.', 0),
(3, 11, "Sometimes it's just like that, unluckily..", 0),
(1, 12, 'Are you okay?', 0),
(6, 12, "I can smell it, and it's not a good smell, is that normal guys?", 0),
(5, 13, 'That is EPIC!!', 0),
(2, 14, "It looks like you guys are having fun!", 0),
(1, 15, 'You mean fish?', 0),
(8, 15, "Is it sharky? Hopefully not.", 0),
(7, 16, 'Maybe yes..', 0),
(6, 16, "Change travel agency!", 0);

ALTER TABLE `comment`
    MODIFY `commentid` INT NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

INSERT INTO `user_likes_post` (`user`, `post`) VALUES
(1, 2),
(1, 10),
(2, 1),
(3, 1),
(4, 8),
(5, 11),
(5, 15),
(6, 1),
(7, 6),
(7, 8),
(7, 2),
(8, 9),
(8, 1),
(7, 1),
(6, 13),
(3, 14),
(8, 12),
(2, 12),
(1, 11),
(4, 15),
(6, 12),
(3, 6),
(8, 11),
(2, 14),
(7, 9),
(5, 3),
(4, 3),
(1, 8),
(4, 14),
(7, 14);

INSERT INTO `user_follows_user` (`followed`, `follower`) VALUES
(3, 8),
(3, 1),
(3, 2),
(1, 2),
(1, 3),
(1, 8),
(2, 4),
(2, 6),
(2, 1),
(4, 3),
(4, 7),
(4, 5),
(5, 4),
(5, 1),
(5, 2),
(6, 8),
(6, 6),
(6, 7),
(8, 4),
(8, 2),
(8, 3),
(7, 4),
(7, 8),
(7, 1);