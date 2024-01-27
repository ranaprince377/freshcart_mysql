$(".addToCart").click(function(){
    const product_id = $(this).attr('productid')

    $.ajax({
        type: "GET",
        url: "/shop/cart/product/add",
        data: {
            'product_id': product_id
        },
        dataType: "JSON",
        success: function (response) {
            $(".addto-"+product_id).addClass('d-none');
            $(".go-"+product_id).removeClass('d-none');
            $("#cartno"+product_id+" .item-amount").html(response['itemAmount'])
            console.log(response)
            $(".quantity-"+product_id).val(response['itemCount']);
            $("#successAlert").html('<i class="bi bi-cart-check-fill fs-4 mx-1"></i>' + response['message']);
            $("#successAlert").toast('show');
            $("#netAmount").html("₹"+(response['subTotal']+40));
            if(response['itemCount'] == 1){
                $("div.minus_btn_"+product_id).html('<i class="bi bi-trash3 text-danger" title="Remove from cart"></i>');
                total_items = $('.cartTotalItems').html();
                total_items = parseInt(total_items);
                $('.cartTotalItems').html(total_items + 1);
            }
            else{
                $("div.minus_btn_"+product_id).html('-');
            }

            let subTotal = response['subTotal'];
            $("#suntotalamount").html("₹"+subTotal);
            if(subTotal > 499){
                $("#netAmount").html("₹"+subTotal);
                $("#servicefee").html("₹0");
                $("#freeDeliveryAlert").removeClass("d-none");
            }
            else{
                $("#netAmount").html("₹"+(subTotal + 40));
                $("#servicefee").html("₹40");
                $("#freeDeliveryAlert").addClass("d-none");
            }
        }
    });
});

$(".removeFromCart").click(function(){
    const product_id = $(this).attr('productid')
    const action = $(this).attr('act')

    $.ajax({
        type: "GET",
        url: "/shop/cart/product/remove",
        data: {
            'product_id': product_id,
            'action': action
        },
        dataType: "JSON",
        success: function (response) {
            if(response['itemCount'] < 1){
                $("#cartno"+product_id).remove();
                $("#dangerAlert").html('<i class="bi bi-cart-x-fill fs-4 mx-1"></i>' + response['message']);
                $("#dangerAlert").toast('show');

                $(".addto-"+product_id).removeClass('d-none');
                $(".go-"+product_id).addClass('d-none');
                total_items = $('.cartTotalItems').html();
                total_items = parseInt(total_items);
                $('.cartTotalItems').html(total_items - 1);
            }

            if(response['itemCount'] == 1){
                $("div.minus_btn_"+product_id).html('<i class="bi bi-trash3 text-danger" title="Remove from cart"></i>');
            }
            else{
                $("div.minus_btn_"+product_id).html('-');
            }

            $(".quantity-"+product_id).val(response['itemCount']);
            $("#cartno"+product_id+" .item-amount").html(response['itemAmount']);

            let subTotal = response['subTotal'];
            $("#suntotalamount").html("₹"+subTotal);
            if(subTotal > 499){
                $("#netAmount").html("₹"+subTotal);
                $("#servicefee").html("₹0");
                $("#freeDeliveryAlert").removeClass("d-none");
            }
            else{
                $("#netAmount").html("₹"+(subTotal + 40));
                $("#servicefee").html("₹40");
                $("#freeDeliveryAlert").addClass("d-none");
            }
            
            console.log(response)
        }
    });
});

$(".toggleProductWishlist").click(function(){
    const product_id = $(this).attr('productid')

    $.ajax({
        type: "GET",
        url: "/shop/wishlist/toggleProduct",
        data: {
            'product_id': product_id
        },
        dataType: "JSON",
        success: function (response) {
            if(response['status'] == 'success'){
                const message = '<i class="bi bi-heart-fill text-danger fs-5 mx-1 mt-1"></i>' + response['message'];
                if(response['action'] == 'added'){
                    $('.wish-'+product_id).html('<i class="bi bi-heart-fill text-danger" title="Remove from wishlist"></i>');
                    $("#successAlert").html(message);
                    $("#successAlert").toast('show');
                    total_items = $('.wishlistTotalItems').html();
                    total_items = parseInt(total_items);
                    $('.wishlistTotalItems').html(total_items + 1);
                }
                else if(response['action'] == 'removed'){
                    $('.wish-'+product_id).html('<i class="bi bi-heart" title="Add to wishlist"></i>');
                    $("#dangerAlert").html(message);
                    $("#dangerAlert").toast('show');
                    $('.wishlist-item-'+product_id).remove();
                    total_items = $('.wishlistTotalItems').html();
                    total_items = parseInt(total_items);
                    $('.wishlistTotalItems').html(total_items - 1);
                }
            }

            console.log(response)
        }
    });
});

$(".moveToCart").click(function(){
    const product_id = $(this).attr('productid')

    $.ajax({
        type: "GET",
        url: "/shop/wishlist/movetocart",
        data: {
            'product_id': product_id
        },
        dataType: "JSON",
        success: function (response) {
            if(response['status'] == 'success'){
                const message = '<i class="bi bi-cart-check-fill fs-4 mx-1"></i>' + response['message'];
                $('.wishlist-item-'+product_id).remove();
                total_items = $('.wishlistTotalItems').html();
                total_items = parseInt(total_items);
                $('.wishlistTotalItems').html(total_items - 1);
                $("#successAlert").html(message);
                $("#successAlert").toast('show');
            }

            console.log(response)
        }
    });
});

function printInvoice(element_id) {
    const element = document.getElementById('invoice');

    if (element) {
        // Create a new window for printing
        const printWindow = window.open('', '_blank', 'width=600,height=400');

        // Set the content of the new window to the content of the 'invoice' element
        printWindow.document.write('<html><head><title>Invoice</title></head><body>');
        printWindow.document.write(element.innerHTML);
        printWindow.document.write('</body></html>');

        // Call the print method to trigger the print dialog
        printWindow.print();
    } else {
        console.error("Element with ID 'invoice' not found.");
    }
}

$("#passwordToggler").click( function() {
    if($(this).hasClass('bi-eye-slash')){
        $(this).removeClass('bi-eye-slash');
        $(this).addClass('bi-eye');
        $("#auth_password_field").attr("type", "text");
    }
    else{
        $(this).addClass('bi-eye-slash');
        $(this).removeClass('bi-eye');
        $("#auth_password_field").attr("type", "password");
    }
});
