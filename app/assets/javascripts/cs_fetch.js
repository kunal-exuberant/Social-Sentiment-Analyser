console.log("Fetching cs analysis");
$.ajax({

    url: '/cs_fetch',
    type: 'GET',
    dataType: 'JSON',
    data: {

    },
    success: function(data) {
        //console.log('succsss'+data);

        var data = JSON.parse(data);
        console.log(data)
        var fb_count = 0;
        var order = [];
        $.each(data, function (index, value) {

            console.log(value);


        });
    },
    error: function(data){
        console.log('error'+data);
    }

});