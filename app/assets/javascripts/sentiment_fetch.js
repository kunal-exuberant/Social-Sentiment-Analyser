console.log("Fetching sentiment analysis");
$.ajax({

    url: '/sentiment_fetch',
    type: 'GET',
    dataType: 'JSON',
    data: {

    },

    success: function(data){
        //console.log('succsss'+data);

        var data = JSON.parse(data);
        console.log(data)
        var fb_count=0;
        var order = [];
        $.each(data.facebook, function(index,value){


                $.each(value, function(ind,val) {

                    if (val.indexOf('fb_data') == -1) {
                        val = val.substring(1, val.length-1);
                        v = JSON.parse(val);
                        var json = JSON.parse(v.sentiment_json)
                        var orderId = v.OID;
                        if(orderId == null){
                            orderId = 'Order Id not provided'
                        }
                        else
                        {
                            order.push(orderId)
                        }

                        if(fb_count % 2 == 0) {
                            $('#post').append('<div class="post-each active"><div class="order-id marginb10"><span class="button marginr10">Order Id</span><span class="bold">' + orderId + '</span></div><div class="sentiment-percent rfloat marginl5 ">' + Math.round(json.probability[json.label] * 100) + '%</div><div class="sentiment-text button rfloat ' + json.label + '">' + json.label + '</div><div class="post-text marginb10">' + v.fbpost.text + '</div><div style="position:absolute;top:10px;left:-40px;"><img style="height:40px;" src="/../assets/facebook.png"></div></div>');
                        }
                        else
                        {
                            $('#post').append('<div class="post-each"><div class="order-id marginb10"><span class="button marginr10">Order Id</span><span class="bold">' + orderId + '</span></div><div class="sentiment-percent rfloat marginl5 ">' + Math.round(json.probability[json.label] * 100) + '%</div><div class="sentiment-text button rfloat ' + json.label + '">' + json.label + '</div><div class="post-text marginb10">' + v.fbpost.text + '</div></div>');
                        }
                        fb_count = fb_count+1;
                    }

                });
        });

        var count=0;
        $.each(data.twitter, function(index,value) {

            $.each(value, function (ind, val) {

                console.log('twitter');

                if (val.indexOf('tw_data') == -1) {
                    val = val.substring(1, val.length-1);
                    v = JSON.parse(val);
                    var json = JSON.parse(v.sentiment_json)
                    var orderId = v.OID;
                    if(orderId == null){
                        orderId = 'Order Id not provided'
                    }
                    else
                    {
                        order.push(orderId);
                    }

                    if(count % 2 == 0) {
                        $('#post').append('<div class="post-each active"><div class="order-id marginb10"><span class="button marginr10">Order Id</span><span class="bold">' + orderId + '</span></div><div class="sentiment-percent rfloat marginl5 ">' + Math.round(json.probability[json.label] * 100) + '%</div><div class="sentiment-text button rfloat ' + json.label + '">' + json.label + '</div><div class="post-text marginb10">' + v.tweet + '</div><div style="position:absolute;top:10px;left:-40px;"><img style="height:40px;" src="/../assets/twitter.png"></div></div>');
                    }
                    else
                    {
                        $('#post').append('<div class="post-each"><div class="order-id marginb10"><span class="button marginr10">Order Id</span><span class="bold">' + orderId + '</span></div><div class="sentiment-percent rfloat marginl5 ">' + Math.round(json.probability[json.label] * 100) + '%</div><div class="sentiment-text button rfloat ' + json.label + '">' + json.label + '</div><div class="post-text marginb10">' + v.tweet + '</div></div>');
                    }
                    count = count+1;

                }

            });
        });

    },

    error: function(data){
        console.log('error'+data);
    }

});