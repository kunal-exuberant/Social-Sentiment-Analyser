class Query

  def self.mysql_connect
    @db_host  = "localhost"
    @db_user  = "root"
    @db_pass  = ""
    @db_name = "sentiment"
    client = Mysql2::Client.new(:host => @db_host, :username => @db_user, :password => @db_pass, :database => @db_name)
  end

  def self.facebook_fetch
    client = mysql_connect
    return client.query("SELECT * from facebook_sentiment where fb_value LIKE '%probability%' LIMIT 200")
    #return attributes
  end

  def self.twitter_fetch
    client = mysql_connect
    return client.query("SELECT * from twitter_sentiment where tw_value LIKE '%probability%' LIMIT 20")
    #return attributes
  end

  def self.ticket_fetch
    client = mysql_connect
    return client.query("SELECT * from order_details")
    #return attributes
  end

  def self.cs_fetch1(orderid)
    client = mysql_connect
    return client.query("SELECT * from cs_details where cs_id='"+ orderid + "' LIMIT 1")
    #return attributes
  end

  def self.cs_fetch
    client = mysql_connect
    return client.query("SELECT * from cs_details")
    #return attributes
  end

  def self.attributes_save(name, api_index)
    client = mysql_connect
    i=1
    name.zip(api_index).each do |x,y|
      result = client.query("update listing_attributes set name = '#{client.escape(x)}', attributes = '#{client.escape(y)}' where id= '#{client.escape(i.to_s)}'")
      i = i+1
    end
  end
end