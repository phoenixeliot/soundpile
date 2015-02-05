class AddAudioToTracks < ActiveRecord::Migration
  def up
    add_attachment :tracks, :audio
  end

  def down
    remove_attachment :tracks, :audio
  end
end
