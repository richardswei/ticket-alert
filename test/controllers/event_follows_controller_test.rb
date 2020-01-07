require 'test_helper'

class EventFollowsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get event_follows_create_url
    assert_response :success
  end

  test "should get new" do
    get event_follows_new_url
    assert_response :success
  end

end
