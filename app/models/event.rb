class Event < ApplicationRecord
  has_and_belongs_to_many :performers
  has_many :event_follows, :dependent => :delete_all
  has_many :users, -> {distinct}, through: :event_follows
end
