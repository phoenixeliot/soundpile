class AddCoverArtToTracks < ActiveRecord::Migration
  def change
    add_attachment :tracks, :cover_art
  end

  def down
    remove_attachment :tracks, :cover_art
  end
end
