get '/' do
  erb :index

end

post '/game/new' do
  game = Game.create

  params[:players].each do |player|
    game.players << Player.find_or_create_by_name(player)
  end

  redirect "/game/#{game.id}/play"
end

get '/game/:game_id/play' do |game_id|
  players = Game.find(game_id).players
  @game_id = game_id
  @player_1 = players[0]
  @player_2 = players[1]

  erb :play
end

post '/game/:game_id' do
  game = Game.find(params[:game_id])
  game.winner = params[:winner]
  game.duration = params[:duration]
  game.save
end

get '/game/:game_id' do |game_id|
  game = Game.find(game_id)
  @winner = game.winner
  @duration = game.duration

  puts "winner: #{@winner}"
  puts "duration #{@duration}"

  erb :results
end
