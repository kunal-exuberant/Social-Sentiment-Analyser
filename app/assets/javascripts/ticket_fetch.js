console.log("Fetching sentiment analysis");
$.ajax({

    url: '/ticket_fetch',
    type: 'GET',
    dataType: 'JSON',
    data: {

    },

    success: function(data){

        var data = JSON.parse(data);
        $.each(data, function(index, value){

            //console.log(value);

            $.each(value, function(ind, val){

                if(val.order_data != undefined) {
                    console.log(val.order_id + " " + val.order_data);

                    //console.log(cs_fetch(val.order_id));

                    var cs_data = $('#cs_data_hidden').html();

                    $.each(cs_data, function(x, y){

                        console.log(y);
                    });

                    var v = JSON.parse(val.order_data)

                    console.log(v.title);


                    var promised_dt = '', order_dt='', courier = '', warehouse = ''
                    if(v.warehouse)
                    {
                        warehouse = v.warehouse;
                    }
                    if(v.courier)
                    {
                        courier = v.courier;
                    }
                    if(v.promised_date) {
                        if(v.promised_date.indexOf('T') > -1) {
                            console.log(v.promised_date)

                            promised_dt = v.promised_date.substring(0, v.promised_date.indexOf('T'));

                        }
                    }

                    if(v.order_date.indexOf('T') > -1)
                    {
                        order_dt = v.order_date.substring(0, v.order_date.indexOf('T'));
                    }


                    if(v.status == 'delivered' || v.status == 'shipped') {

                        $('#ticket').append('<div class="post-each"><div class="order-id marginb10"><span class="button marginr10">Order Id</span><span class="bold">' + val.order_id + '</span><span style="color:#ff0000" class="rfloat">Ticket not created</span></div><span class="marginr10"><a href="http://www.flipkart.com/search?q=' + v.product_id + '">' + v.title + '</a></span><span class="marginr10">' + v.seller_id + '</span><span class="marginr10">' + order_dt + '</span><span class="marginr10">' + promised_dt + '</span><span class="marginr10">' + courier + '</span><span class="marginr10">' + warehouse + '</span><span class="rfloat" style="color:#3F883F;">' + v.status + '</span></div>');
                    }else
                    {
                        $('#ticket').append('<div class="post-each active"><div class="order-id marginb10"><span class="button marginr10">Order Id</span><span class="bold">' + val.order_id + '</span><span style="color:#3F883F" class="rfloat">Ticket created</span></div><span class="marginr10"><a href="http://www.flipkart.com/search?q=' + v.product_id + '">' + v.title + '</a></span><span class="marginr10">' + v.seller_id + '</span><span class="marginr10">' + order_dt + '</span><span class="marginr10">' + promised_dt + '</span><span class="marginr10">' + courier + '</span><span class="marginr10">' + warehouse + '</span><span class="rfloat" style="color:#ff0000;">' + v.status + '</span></div>');
                    }

                }


              //  v = JSON.parse(val.order_data);

               // console.log(v);



            });


        });
        console.log(data)
        var fb_count=0;
        var order = [];

    },

    error: function(data){
        console.log('error'+data);
    }

});


function cs_fetch(orderid) {
    $.ajax({

        url: '/cs_fetch',
        type: 'GET',
        dataType: 'JSON',
        data: {
                orderid:orderid
            },
        success: function (data) {
            $('#cs_data_hidden').html(data);
            console.log(data);
        },

        error: function (data) {
            console.log(data);
        }
    });

}