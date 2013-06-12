USER EXPERIENCE
pick user names
present board
play
show winner & time
show results url
play again


CODE THINGS


Setting Things Up

get '/'

show name form
get user names from form

post '/game/new'
create 2 user objects & a new game object

get '/game/:gameid/play'

JS - setUpBoard: create board
Sinatra: render board
HTML: each player is associated with a track by class or id
JS - setKeys: bind one user to each key event 
JS - (is this a method?): record start time
per matching keyup, change div with "active" class
game ends when "last" element has active class
winner is grabbed from track class/id 
show the winner of the game

post '/game/:gameid'

record end time, figure game duration
save winner & time to database

response from post 'game/:gameid'

show the url for results
show the next game button  (post '/game/new', with player names preset)
show the 'play as different players' button (get '/' ?)

