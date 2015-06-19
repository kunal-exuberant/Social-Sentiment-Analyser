require "mysql"
class LaunchController < ActionController::Base

  def index

  end


  def sentiment_fetch

    response = {}
    respond_to do |format|

      format.json do
        facebook = Query.facebook_fetch
        p facebook
        twitter = Query.twitter_fetch
        puts twitter
        response['facebook'] = facebook
        response['twitter'] = twitter
        render :json => response
      end

    end

  end

  def ticket_fetch
    response = {}
    respond_to do |format|

      format.json do
        facebook = Query.facebook_fetch
        twitter = Query.twitter_fetch
        ticket = Query.ticket_fetch
        response['facebook'] = facebook
        response['twitter'] = twitter
        response['ticket'] = ticket
        render :json => response
      end
    end
  end

  def cs_fetch
    response = {}
    respond_to do |format|

      format.html do
        cs = Query.cs_fetch
        response['cs'] = cs
        render :json => response
      end
    end
  end

  end
