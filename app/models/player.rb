class Player < ActiveRecord::Base
  has_many :games, through: :game_players
  has_many :game_players

  validates :name, :uniqueness => true
end
