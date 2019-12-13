class Event < ApplicationRecord
  has_and_belongs_to_many :performers
  belongs_to :venue

end
