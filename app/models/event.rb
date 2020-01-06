class Event < ApplicationRecord
  has_and_belongs_to_many :performers
  belongs_to :venue
  has_many :event_follows
  has_many :users, -> {distinct}, through: :event_follows
end
