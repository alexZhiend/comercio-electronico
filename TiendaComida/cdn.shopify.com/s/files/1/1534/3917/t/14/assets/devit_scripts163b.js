
    
    
    /*
    **INIT VARIABLES**
    =============================================== */
	//var url_places = '//apolomultimedia.us/vivegetup/webhook_main.php';
	//var url_places = 'https://apolomultimedia-server1.info/tmp/vgu/webhook_main.php';
	var url_places = 'https://devitweb.com/apps/vivegetup/webhook_main.php';
	var $container = $('.container-alert-modal');
    
    var optdefault_value 	= "Seleccione";
    var optdefault_el 		= '';
    optdefault_el += '<option value="" '+ ((window.multi_lang)?'data-translate="form_checkout.select"':'') +'>'+optdefault_value+'</option>';

    var random = 0;

//(function($){
  $(document).ready(function(){
    
    console.log('v.1.0.0');
    /*
    **LANGUAGE**
    =============================================== */
    $('.custom-lang-block').find('input').attr('disabled', 'disabled');
    
    
    
    
    /*
    **ALERT MODAL**
    =============================================== */
    $container.hide();
    
    $(document).on('click', '#proceed_to_checkout', function(e){
      
      $container.show();
      $container.find('.loading-modal.modal').fadeIn('slow');
      setTimeout(function(){
        $container.find('.ajax-success-modal.modal').fadeIn('slow');
        $container.find('.loading-modal.modal').hide();
      }, 1000);
      
      
      	console.log('logout');
      
      e.preventDefault();
    });
    
    
    
    /*
    **CHECKOUT LOAD**
    =============================================== */
    eval_free_method();
    
    if($('#breadcrumb_checkout').length){
      $('html, body').animate({
        scrollTop:  parseInt($('#breadcrumb_checkout').offset().top - 48)
      }, 1500, function(){});
    }
    
    $(document).on('change', 'input[name="checkout[payment_gateway]"]', function(e){
      $('.payment-description').addClass('hidden');
      $('#payment-gateway-subfields-'+$(this).val()).removeClass('hidden');
    });
    
    
    
    
    /*
    **DATE PICKER**
    =============================================== */
    if($('.birthday_date').length){
      $('.birthday_date').datepicker({
        language: 'es',
        autoclose: true,
        format: 'dd/mm/yyyy',
        forceParse: false,
    	maxDate: -1,
        todayBtn: true
      });
    }
    if($('.delivery_date').length){
      $('.delivery_date').datepicker({
        language: 'es',
        autoclose: true,
        format: 'dd/mm/yyyy',
        forceParse: false,
    	startDate: '-0d',
        todayBtn: true
      });
    }
    if($('.delivery_multidate').length){
      $('.delivery_multidate').datepicker({
        language: 'es',
        autoclose: true,
        format: 'dd/mm/yyyy',
        forceParse: false,
    	startDate: '-0d',
        todayBtn: true,
        multidate: true,
        multidateSeparator: ','
      });
    }
    
    
    
    
    /*
    **FORM CHECKOUT**
    =============================================== */
    
    
    $(document).on('click', '.order-summary-toggle', function(e){
      if($(this).parent().hasClass('show-summary')){
        $(this).find('.show-div').removeClass('order-summary-toggle__text--show').addClass('order-summary-toggle__text--hide');
        $(this).find('.hide-div').removeClass('order-summary-toggle__text--hide').addClass('order-summary-toggle__text--show');
        $(this).parent().removeClass('show-summary');
      }else{
        $(this).find('.show-div').removeClass('order-summary-toggle__text--hide').addClass('order-summary-toggle__text--show');
        $(this).find('.hide-div').removeClass('order-summary-toggle__text--show').addClass('order-summary-toggle__text--hide');
        $(this).parent().addClass('show-summary');
      }
      e.preventDefault();
    });
    
    
    /*
    	Block - 0
    =============================================== */
    $(document).on('click', '#b0_invoice', function(e){
      if($(this).is(':checked')){
        $(this).val(1);
        $('#cb0_nregister').show();
        $('#b0_nregister').focus();
      }else{
        $(this).val(0);
        $('#cb0_nregister').hide();
        $('#b0_nregister').val('');
      }
      //e.preventDefault();
    });
    
    
    /*
    	Block - 1
    =============================================== */
    $(document).on('change', '#b1_district', function(e){
      
      var $line_subtotal			= $('.total-line--subtotal');
      var $rs_line_subtotal			= $('.rs-total-line--subtotal');
      var $line_shipping			= $('.total-line--shipping');
      var $rs_line_shipping			= $('.rs-total-line--shipping');
      var $line_total				= $('.total-line-table__footer');
      var $rs_line_total			= $('.rs-total-line-table__footer');
      var subtotal					= $line_subtotal.find('.total-line__price').find('span').attr('data-checkout-subtotal-price-target');
      var new_subtotal				= parseFloat(format_money(subtotal));
      var money_format 				= window.money_format.split(' ');
      
      var $schedule = $('#b1_delivery_schedule');
      $schedule.empty().append(optdefault_el);
      
      if($(this).val() !== ''){
        var data_array		= $('option:selected', this).attr('data-schedules');
        var data_schedules 	= data_array.split('_|_');

        if(data_schedules.length > 0){
          for(var i = 0; i < data_schedules.length; i++){
            var data_line 	= data_schedules[i].split('|');
            var schedule 	= data_line[0];
            var aditional 	= parseFloat(data_line[1]);
            var info		= data_line[2];
            
            var $option 	= '<option value="'+schedule+'" data-aditional="'+aditional+'" data-info="'+info+'">';
            $option			+= schedule;
            $option			+= '</option>';
            
            $schedule.append($option);
          }//end for
        }//end if
      }//end if
      
      $line_shipping.find('.total-line__price').find('span').html('-');
      $line_shipping.find('.total-line__price').find('span').attr('data-checkout-total-shipping-target', 0);
      $rs_line_shipping.find('.total-line__price').find('span').html('-');
      $line_total.find('.total-line__price').find('.payment-due__price').html(money_format[0] + ' ' + new_subtotal.toFixed(2));
      var new_subtotal_format = new_subtotal.toFixed(2);
      $line_total.find('.total-line__price').find('.payment-due__price').attr('data-checkout-payment-due-target', new_subtotal_format.replace('.', '') );
      $rs_line_total.find('.total-line__price').find('.payment-due__price').html(money_format[0] + ' ' + new_subtotal.toFixed(2));
      
      translator.doTranslate(".form-to-checkout");
      
    });
    
    $(document).on('change', '#b1_delivery_schedule', function(e){
      var $cb1_delivery_schedule 	= $('#cb1_delivery_schedule');
      var $delivery_date			= $('#delivery_date');
      var $line_subtotal			= $('.total-line--subtotal');
      var $rs_line_subtotal			= $('.rs-total-line--subtotal');
      var $line_shipping			= $('.total-line--shipping');
      var $rs_line_shipping			= $('.rs-total-line--shipping');
      var $line_total				= $('.total-line-table__footer');
      var $rs_line_total			= $('.rs-total-line-table__footer');
      var $rs_line_total_all		= $('.total-recap__final-price');
      var subtotal					= $line_subtotal.find('.total-line__price').find('span').attr('data-checkout-subtotal-price-target');
      var aditional					= 0;
      var new_subtotal				= parseFloat(format_money(subtotal));
      var info						= '';
      var money_format 				= window.money_format.split(' ');
      
      $cb1_delivery_schedule.find('.aditional').remove();
      $cb1_delivery_schedule.find('.info').remove();
      
      if($(this).val() !== ''){
        aditional		= $('option:selected', this).attr('data-aditional');
        info			= $('option:selected', this).attr('data-info');
        
        $cb1_delivery_schedule.append('<div class="field__message aditional">*Cargos adicionales: S/. '+parseFloat(aditional).toFixed(2)+'</div>');
        $cb1_delivery_schedule.append('<div class="field__message info">'+info+'</div>');
        
        if( parseFloat(aditional) > 0 ){
          $line_shipping.find('.total-line__price').find('span').attr('data-checkout-total-shipping-target', (parseFloat(aditional).toFixed(2)).replace('.', ''));
          $line_shipping.find('.total-line__price').find('span').html(money_format[0]+' '+parseFloat(aditional).toFixed(2));
          $rs_line_shipping.find('.total-line__price').find('span').html(money_format[0]+' '+parseFloat(aditional).toFixed(2));
        }else{
          $line_shipping.find('.total-line__price').find('span').attr('data-checkout-total-shipping-target', 0);
          $line_shipping.find('.total-line__price').find('span').html('-');
          $rs_line_shipping.find('.total-line__price').find('span').html('-');
        }
        $delivery_date.focus();
        
      }//end if
      
      new_subtotal	+= parseFloat(aditional);
      $line_total.find('.total-line__price').find('.payment-due__price').html(money_format[0] + ' ' + new_subtotal.toFixed(2));
      $rs_line_total.find('.total-line__price').find('.payment-due__price').html(money_format[0] + ' ' + new_subtotal.toFixed(2));
      $rs_line_total_all.html(money_format[0] + ' ' + new_subtotal.toFixed(2));
      var new_subtotal_format = new_subtotal.toFixed(2);
      $line_total.find('.total-line__price').find('.payment-due__price').attr('data-checkout-payment-due-target', new_subtotal_format.replace('.', '') );
      
      eval_free_method();
      
    });
    

    
    /*
    	Form submit
    =============================================== */
    $(document).on('click', '#btn_checkout_submit', function(e){
      eval_free_method();
      process_pay_checkout('pay', '');
      e.preventDefault();
    });
    
    
    $(document).on('click', '.close-payment', function(e){
        $('.container-alert-modal').hide();
      e.preventDefault();
    });
    
    
    
    $(document).on('click', '#btn_process_ajax', function(e){
      //process_pay_checkout('register', '');
      e.preventDefault();
    });
    
    
    
    
    
    
    
    /*
    **LOAD DATA FORM**
    =============================================== */
    if($('#b1_district').length){
      load_data_district($('#b1_district'));
    }
    
    
    
    
    /*
    **LOGIN REDIRECT**
    =============================================== */
    setTimeout(function(){
      var URLactual = window.location.href;
      var arr_url = URLactual.split('?return_to=');
      if(arr_url.length > 1){
        if($('#customer_login').length){
          var shop_url = '';
          $('#customer_login').attr('action', shop_url+'/account/login?return_to=pages/check-out-form');
        }
      }
    }, 1000);
    
    
    
    
    /*
    **PAGE THANKS**
    =============================================== */
    if($('.thank-you-page').length){
      var URLactual = window.location.href;
      var arr_url = URLactual.split('?rd=');
      //var shop_url = '';
      console.log(shop_url);
      
      console.log(arr_url.length);
      
      var page_404 = '<br><br>';
      page_404 += '<h3 class="text-center">Página no disponible. Volver a la tienda <a href="'+shop_url+'"><strong>aquí</strong></a></h3>';
      
      if(arr_url.length > 1){
        var random_x = arr_url[1];
        console.log('0-random: '+random_x+'-'+random);
        
        var check_cookie = getCookie('checkout_form');
        if(check_cookie){
          console.log('random: '+random_x+'-'+random);
          setTimeout(function(){
            $('.rte').fadeIn('slow');
            clear_cart();
          }, 500);
        }else{
          console.log('123');
          //window.location.href = shop_url;
          $('.rte').before(page_404);
        }
      }else{
        //window.location.href = shop_url;
        $('.rte').before(page_404);
      }
    }
    
    
    
    $(document).on('keyup', '.discount_code', function(e){
      if($(this).val() !== ''){
        $('#btn_discount_code').removeAttr('disabled');
        $('.btn_discount_code_mobile').removeClass('btn--disabled');
      }else{
        $('#btn_discount_code').attr('disabled', 'disabled');
        $('.btn_discount_code_mobile').addClass('btn--disabled');
      }
    });
    
    $(document).on('click', '#btn_discount_code', function(e){
      var data_options = {
        'option'		: 'ax_discount_code',
        'discount_code' : $('#checkout_reduction_code').val()
      };
	  find_discount_code(data_options);
      e.preventDefault();
    });
    
    $(document).on('click', '.btn_discount_code_mobile', function(e){
      var data_options = {
        'option'		: 'ax_discount_code',
        'discount_code' : $('#discount_code_inputmobile').val()
      };
	  find_discount_code(data_options);
      e.preventDefault();
    });
    
    
    

    
    
    
  });
  
  
//})(jQuery);




    
    /*
    **FUNCTIONS **
    =============================================== */
    
    

    function find_discount_code(data_options){
      //SUBMIT
      $.ajax({
        type: 'GET',
        url: url_places,
        data: data_options,
        async: false,
        jsonpCallback: 'jsonp_callback',
        contentType: "application/json",
        dataType: 'jsonp',
        cache: false,
        success: function(data) {
          $('.custom-discounts').find('.info').remove();
          if(data.request.data_success == '1'){
            var data_discount = data.request.data_discount;
            var disc_amount = data_discount.disc_amount;
            var dico_name 	= data_discount.dico_name;

            var $line_total				= $('.total-line-table__footer');
            var total_price 			= $line_total.find('.total-line__price').find('.payment-due__price').attr('data-checkout-payment-due-target');
            var format_price 			= parseFloat(format_money(total_price));

            var new_price = format_price;
            var only_discount = 0;
            if( dico_name === '%'){
              only_discount = format_price*(parseFloat(disc_amount))/100;
              new_price = (format_price*(100-parseFloat(disc_amount))/100).toFixed(2);
            }else{
              only_discount = parseFloat(disc_amount);
              new_price = (format_price - parseFloat(disc_amount)).toFixed(2);
            }

            var money_format 				= window.money_format.split(' ');
            $line_total.find('.total-line__price').find('.payment-due__price').attr('data-checkout-payment-discount', new_price.replace('.', ''));
            $line_total.find('.total-line__price').find('.payment-due__price').attr('data-checkout-discount-amount', (only_discount.toFixed(2)).replace('.', ''));
            $line_total.find('.total-line__price').find('.payment-due__price').html(money_format[0] + ' ' + new_price);
            
            $('.order-summary-toggle-container').find('.total-line__price').find('.payment-due__price').html(money_format[0] + ' ' + new_price);
            $('.order-summary-toggle-container').find('.order-summary-toggle').find('.total-recap__final-price').html(money_format[0] + ' ' + new_price);

            $('.discount_code').attr('disabled', 'disabled');
            $('#btn_discount_code').attr('disabled', 'disabled');
            $('.btn_discount_code_mobile').attr('disabled', 'disabled');
            $('.custom-discounts > .field').append('<span class="info" id="discount_msg">Descuento: '+disc_amount+' '+dico_name+'</span>');

          }else{
            $('.custom-discounts > .field').append('<span class="info">'+data.request.data_msg+'</span>');
          }
        },
        error: function (request, status, error) { console.log('error'); }
      });
    }
    
    /*
    	Is empty object
    =============================================== */
    function isEmpty(obj) { 
      for (var x in obj) { return false; }
      return true;
    }
    
    
    
    /*
    	Load data district
    =============================================== */
    function load_data_district($select_element){
      var data_places = {
        'option' 	: 'ax_getdistrict_data'
      };
      $.ajax({
        type: 'GET',
        url: url_places,
        data: data_places,
        async: false,
        jsonpCallback: 'jsonp_callback',
        contentType: "application/json",
        dataType: 'jsonp',
        cache: false,
        success: function(data) {
          var data_district = data.request.data_district;
          if(data_district.length > 0){
            var form_1 = $select_element.attr('data-form1');
            var form_2 = $select_element.attr('data-form2');
            var form_3 = $select_element.attr('data-form3');
            
            for(var i = 0; i < data_district.length; i++){
              
              var category 	= data_district[i].category;
              var details 	= data_district[i].details;
              var district 	= data_district[i].district;
              
              var $option	= '<option value="'+district+'" data-category="'+category+'"';
              
              var data_schedules = '';
              if(details.length > 0){
                for(var j = 0; j < details.length; j++){
                  var schedule 	= details[j].schedule;
                  var aditional = details[j].aditional;
                  var info 		= details[j].info;
                  
                  data_schedules += ((data_schedules==='')?'':'_|_') + schedule+'|'+aditional+'|'+info;
                }//end for
              }//end if
              
              $option 	+= ' data-schedules="'+data_schedules+'"';
              
              $option	+= '>'+district;
              $option	+= '</option>';
              
              if( category === 'All' ){
                $select_element.append($option);
              }else if( category === 'category_form_1' ){
                if( form_1 === '1' || (form_1==='' && form_2==='' && form_3==='') ){
                  $select_element.append($option);
                }
              }else if( category === 'category_form_2' ){
                if( form_2 === '1' || (form_1==='' && form_2==='' && form_3==='')){
                  $select_element.append($option);
                }
              }else if( category === 'category_form_3' ){
                if( form_3 === '1' || (form_1==='' && form_2==='' && form_3==='')){
                  $select_element.append($option);
                }
              }
            }//end for
            
            if($select_element.attr('data-default') !== ''){
              setTimeout(function(){
                $select_element.val($select_element.attr('data-default'));
                $select_element.change();
              }, 1000);
            }
          }//end if
          
        },
        error: function (request, status, error) { console.log(status + ", " + error); }
      });
    }
    
    
    
    
    /*
    	Format money
    =============================================== */
    function format_money( subtotal ){
      if( parseFloat(subtotal) !== 0 ){
        var prepend = subtotal.substring(0, subtotal.length-2);
        var append = subtotal.substring(subtotal.length-2, subtotal.length);
        return prepend+'.'+append;
      }else{
        return subtotal;
      }
    }
    
    
    
    /*
    	Verify date format
    =============================================== */
    function verifyDateFormat(string_date) {
      var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
      if ((string_date.match(RegExPattern)) && (string_date!='')) {
        return true;
      } else {
        return false;
      }
    }
    
    
    /*
    	Date exists
    =============================================== */
    function dateExist(string_date){
      var array_date = string_date.split("/");
      var day = array_date[0];
      var month = array_date[1];
      var year = array_date[2];
      var date = new Date(year,month,'0');
      if((day-0)>(date.getDate()-0)){
        return false;
      }
      return true;
    }
    
    

    /*
    	Valid email
    =============================================== */
    function validEmail( string_email ) {
      expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if ( !expr.test(string_email) ){
        return false;
      }
      return true;
    }

    
    /*
    	Process pay checkout
    =============================================== */
    function process_pay_checkout(action, method){
      
      $button_submit = $('#btn_checkout_submit');
      $button_submit.attr('disabled', 'disabled');
      
      var errors		 	= 0;
      var $form_checkout 	= $('.form-to-checkout');
      var $customer_id		= $('#customer_id');
      var $block_0 			= $('.block_0');
      var $block_1 			= $('.block_1');
      var $block_2 			= $('.block_2');
      var $block_3 			= $('.block_3');
      
      $form_checkout.find('.error').remove();
      $form_checkout.find('input').removeClass('field--error');
      $form_checkout.find('select').removeClass('field--error');
      $form_checkout.find('textarea').removeClass('field--error');
      
      if( cart_count === '0' ){
        var data_message = "form_checkout.validate.cart_empty";
        var data_cart_empty = '<span class="field__message error" '+((window.multi_lang)?'data-translate="form_checkout.validate.cart_empty"':'')+'>'+data_message+'</span>';
        $(this).after(data_cart_empty);
        translator.doTranslate(".form-to-checkout");
        return false;
      }
      
      var data_blocks = {
        'block_0'	: {},
        'block_1'	: {},
        'block_2'	: {},
        'block_3'	: {},
        'summary'	: {}
      };
      if( $block_0.length ){
        
        var $b0_first_name 	= $('#b0_first_name');
        var $b0_last_name 	= $('#b0_last_name');
        var $b0_password 	= $('#b0_password');
        var $b0_birthday 	= $('#b0_birthday');
        var $b0_identify 	= $('#b0_identify');
        var $b0_email 		= $('#b0_email');
        var $b0_phone 		= $('#b0_phone');
        var $b0_invoice 	= $('#b0_invoice');
        var $b0_nregister 	= $('#b0_nregister');
        
        
          
        if( $b0_first_name.val() === '' && $b0_first_name.hasClass('required') ){
          var data_message 	= "*Por favor complete este campo";
          var data_html 	= '<span class="field__message error" '+((window.multi_lang)?'data-translate="form_checkout.validate.input_empty"':'')+'>'+data_message+'</span>';
          $b0_first_name.parent().append(data_html);
          $b0_first_name.addClass('field--error');
          errors++;
        }//end if

        if( $b0_last_name.val() === '' && $b0_last_name.hasClass('required') ){
          var data_message 	= "*Por favor complete este campo";
          var data_html 	= '<span class="field__message error" '+((window.multi_lang)?'data-translate="form_checkout.validate.input_empty"':'')+'>'+data_message+'</span>';
          $b0_last_name.parent().append(data_html);
          $b0_last_name.addClass('field--error');
          errors++;
        }//end if

        if($form_checkout.hasClass('form-create')){
          if( $b0_password.val() === '' && $b0_password.hasClass('required') ){
            var data_message 	= "*Por favor complete este campo";
            var data_html 		= '<span class="field__message error" '+((window.multi_lang)?'data-translate="form_checkout.validate.input_empty"':'')+'>'+data_message+'</span>';
            $b0_password.parent().append(data_html);
            $b0_password.addClass('field--error');
            errors++;
          }//end if
        }

        if( $b0_birthday.val() !== '' && $b0_birthday.hasClass('required') && ( !verifyDateFormat($b0_birthday.val()) || !dateExist($b0_birthday.val()) ) ){
          var data_message 	= "*Por favor ingrese una fecha válida. Formato dd/mm/yyyy";
          var data_html 	= '<span class="field__message error" '+((window.multi_lang)?'data-translate="form_checkout.validate.date_empty"':'')+'>'+data_message+'</span>';
          $b0_birthday.parent().append(data_html);
          $b0_birthday.addClass('field--error');
          errors++;
        }//end if

        if( $b0_identify.val() === '' && $b0_identify.hasClass('required') ){
          var data_message 	= "*Por favor complete este campo";
          var data_html 	= '<span class="field__message error" '+((window.multi_lang)?'data-translate="form_checkout.validate.input_empty"':'')+'>'+data_message+'</span>';
          $b0_identify.parent().append(data_html);
          $b0_identify.addClass('field--error');
          errors++;
        }//end if

        if( $b0_email.hasClass('required') && ( $b0_email.val() === '' || !validEmail($b0_email.val()) ) ){
          var data_message 	= "*Por favor ingresa un email válido";
          console.log(data_message);
          var data_html 	= '<span class="field__message error" '+((window.multi_lang)?'data-translate="form_checkout.validate.email_empty"':'')+'>'+data_message+'</span>';
          $b0_email.parent().append(data_html);
          $b0_email.addClass('field--error');
          errors++;
        }//end if

        if( $b0_invoice.is(':checked') && $b0_nregister.val() === '' && $b0_nregister.hasClass('required') ){
          var data_message 	= "*Por favor complete este campo";
          var data_html 	= '<span class="field__message error" '+((window.multi_lang)?'data-translate="form_checkout.validate.input_empty"':'')+'>'+data_message+'</span>';
          $b0_nregister.parent().append(data_html);
          $b0_nregister.addClass('field--error');
          errors++;
        }

        data_blocks['block_0']['values'] 		= 1;
        data_blocks['block_0']['customer_id'] 	= $customer_id.val();
        data_blocks['block_0']['b0_first_name'] = $b0_first_name.val();
        data_blocks['block_0']['b0_last_name'] 	= $b0_last_name.val();
        data_blocks['block_0']['b0_password'] 	= $b0_password.val();
        data_blocks['block_0']['b0_birthday'] 	= $b0_birthday.val();
        data_blocks['block_0']['b0_identify'] 	= $b0_identify.val();
        data_blocks['block_0']['b0_email'] 		= $b0_email.val();
        data_blocks['block_0']['b0_phone'] 		= $b0_phone.val();
        data_blocks['block_0']['b0_invoice'] 	= $b0_invoice.val();
        data_blocks['block_0']['b0_nregister'] 	= $b0_nregister.val();
        
      }//end if
      
        
      var $b1_address 			= $('#b1_address');
      var $b1_district 			= $('#b1_district');
      var $b1_delivery_schedule = $('#b1_delivery_schedule');
      var $b1_delivery_date 	= $('#b1_delivery_date');
      var $b2_delivery_date		= $('#b2_delivery_date');
      var $b2_weight			= $('#b2_weight');
      var $b2_height			= $('#b2_height');
      var $b3_receptor_name		= $('#b3_receptor_name');
      var $b3_receptor_phone	= $('#b3_receptor_phone');
      var $b3_dedication		= $('#b3_dedication');
      

      if( $b1_address.val() === '' && $b1_address.hasClass('required') ){
        var data_message 	= "*Por favor complete este campo";
        var data_html 	= '<span class="field__message error" '+((window.multi_lang)?'data-translate="form_checkout.validate.input_empty"':'')+'>'+data_message+'</span>';
        $b1_address.parent().append(data_html);
        $b1_address.addClass('field--error');
        errors++;
      }//end if

      if( $b1_district.val() === '' && $b1_district.hasClass('required') ){
        var data_message 	= "*Por favor seleccione una opción para este campo";
        var data_html 	= '<span class="field__message error" '+((window.multi_lang)?'data-translate="form_checkout.validate.select_empty"':'')+'>'+data_message+'</span>';
        $b1_district.parent().append(data_html);
        $b1_district.addClass('field--error');
        errors++;
      }//end if

      if( $b1_delivery_schedule.val() === '' && $b1_delivery_schedule.hasClass('required') ){
        var data_message 	= "*Por favor seleccione una opción para este campo";
        var data_html 	= '<span class="field__message error" '+((window.multi_lang)?'data-translate="form_checkout.validate.select_empty"':'')+'>'+data_message+'</span>';
        $b1_delivery_schedule.parent().append(data_html);
        $b1_delivery_schedule.addClass('field--error');
        errors++;
      }//end if

      if( $block_2.length ){

        if( $b2_delivery_date.hasClass('required') && $b2_delivery_date.val() === '' ){
          var data_message 	= "*Por favor ingrese una fecha válida. Formato dd/mm/yyyy";
          var data_html 	= '<span class="field__message error" '+((window.multi_lang)?'data-translate="form_checkout.validate.date_empty"':'')+'>'+data_message+'</span>';
          $b2_delivery_date.parent().append(data_html);
          $b2_delivery_date.addClass('field--error');
          errors++;
        }//end if
	
        data_blocks['block_2']['values'] 			= 1;
        data_blocks['block_2']['b2_delivery_date'] 	= $b2_delivery_date.val();

      }else {

        if( $b1_delivery_date.hasClass('required') && ( $b1_delivery_date.val() === '' || !verifyDateFormat($b1_delivery_date.val()) || !dateExist($b1_delivery_date.val()) ) ){
          var data_message 	= "*Por favor ingrese una fecha válida. Formato dd/mm/yyyy";
          var data_html 	= '<span class="field__message error" '+((window.multi_lang)?'data-translate="form_checkout.validate.date_empty"':'')+'>'+data_message+'</span>';
          $b1_delivery_date.parent().append(data_html);
          $b1_delivery_date.addClass('field--error');
          errors++;
        }//end if

        data_blocks['block_1']['b1_delivery_date'] 	= $b1_delivery_date.val();

      }//end if

      data_blocks['block_1']['values'] 				= 1;
      data_blocks['block_1']['b1_address'] 			= $b1_address.val();
      data_blocks['block_1']['b1_district'] 		= $b1_district.val();
      data_blocks['block_1']['b1_delivery_schedule']= $b1_delivery_schedule.val();
      data_blocks['block_1']['b1_aditional'] 		= $b1_delivery_schedule.find('option:selected').attr('data-aditional');
      
      if( $block_2.length ){
        if( $b2_weight.val() === '' && $b2_weight.hasClass('required') ){
          var data_message 	= "*Por favor complete este campo";
          var data_html 	= '<span class="field__message error" '+((window.multi_lang)?'data-translate="form_checkout.validate.input_empty"':'')+'>'+data_message+'</span>';
          $b2_weight.parent().append(data_html);
          $b2_weight.addClass('field--error');
          errors++;
        }//end if
        
        if( $b2_height.val() === '' && $b2_height.hasClass('required') ){
          var data_message 	= "*Por favor complete este campo";
          var data_html 	= '<span class="field__message error" '+((window.multi_lang)?'data-translate="form_checkout.validate.input_empty"':'')+'>'+data_message+'</span>';
          $b2_height.parent().append(data_html);
          $b2_height.addClass('field--error');
          errors++;
        }//end if
        
        data_blocks['block_2']['b2_weight'] 		= $b2_weight.val();
        data_blocks['block_2']['b2_height'] 		= $b2_height.val();
      }

      if( $block_3.length ){
        if( $b3_receptor_name.val() === '' && $b3_receptor_name.hasClass('required') ){
          var data_message 	= "*Por favor complete este campo";
          var data_html 	= '<span class="field__message error" '+((window.multi_lang)?'data-translate="form_checkout.validate.input_empty"':'')+'>'+data_message+'</span>';
          $b3_receptor_name.parent().append(data_html);
          $b3_receptor_name.addClass('field--error');
          errors++;
        }//end if
        
        if( $b3_receptor_phone.val() === '' && $b3_receptor_phone.hasClass('required') ){
          var data_message 	= "*Por favor complete este campo";
          var data_html 	= '<span class="field__message error" '+((window.multi_lang)?'data-translate="form_checkout.validate.input_empty"':'')+'>'+data_message+'</span>';
          $b3_receptor_phone.parent().append(data_html);
          $b3_receptor_phone.addClass('field--error');
          errors++;
        }//end if
        
        if( $b3_dedication.val() === '' && $b3_dedication.hasClass('required') ){
          var data_message 	= "*Por favor complete este campo";
          var data_html 	= '<span class="field__message error" '+((window.multi_lang)?'data-translate="form_checkout.validate.input_empty"':'')+'>'+data_message+'</span>';
          $b3_dedication.parent().append(data_html);
          $b3_dedication.addClass('field--error');
          errors++;
        }//end if
        
        data_blocks['block_3']['values'] 			= 1;
        data_blocks['block_3']['b3_receptor_name'] 	= $b3_receptor_name.val();
        data_blocks['block_3']['b3_receptor_phone'] = $b3_receptor_phone.val();
        data_blocks['block_3']['b3_dedication'] 	= $b3_dedication.val();
      }
      
      
      if(errors > 0){
        $button_submit.removeAttr('disabled');
        translator.doTranslate(".form-to-checkout");
        return false;
      }
      
      var $line_subtotal			= $('.total-line--subtotal');
      var $line_shipping			= $('.total-line--shipping');
      var $line_total				= $('.total-line-table__footer');
      var subtotal					= $line_subtotal.find('.total-line__price').find('span').attr('data-checkout-subtotal-price-target');
      var shipping					= $line_shipping.find('.total-line__price').find('span').attr('data-checkout-total-shipping-target');
      var total						= $line_total.find('.total-line__price').find('.payment-due__price').attr('data-checkout-payment-due-target');
      var total_with_discount		= $line_total.find('.total-line__price').find('.payment-due__price').attr('data-checkout-payment-discount');
      var total_discount_amount		= $line_total.find('.total-line__price').find('.payment-due__price').attr('data-checkout-discount-amount');
      
      //console.log($('#discount_msg').length);
      data_blocks['summary']['values'] 			= 1;
      data_blocks['summary']['subtotal'] 		= format_money(subtotal);
      data_blocks['summary']['shipping'] 		= format_money(shipping);
      data_blocks['summary']['total'] 			= format_money(total);
      data_blocks['summary']['discount_total'] 	= format_money(total_with_discount);
      data_blocks['summary']['discount_amount'] = format_money(total_discount_amount);
      var discount_code_val = '';
      if( $('#checkout_reduction_code').val() !== '' ){
        discount_code_val = $('#checkout_reduction_code').val();
      }
      if( $('#discount_code_inputmobile').val() !== '' ){
        discount_code_val = $('#discount_code_inputmobile').val();
      }
      data_blocks['summary']['discount_code']	= discount_code_val;
      data_blocks['summary']['discount_msg']	= ($('#discount_msg').length > 0) ? $('#discount_msg').html() : '';
      
      
      
      $container.show();
      $container.find('.loading-modal.modal').fadeIn('slow');
      setTimeout(function(){
        $container.find('.loading-modal.modal').hide();
        $container.hide();
      }, 2500);
      
      if( action === 'pay' ){
        /*
            ACTION PAY
        =============================================== */
        var payment_method = $('input[name="checkout[payment_gateway]"]:checked').val();
        
        /* Culqi
        =============================================== */
        if(payment_method === 'pm_culqi'){
          var total_culqi = total;
          if(parseFloat(total_with_discount) > 0){
            total_culqi = total_with_discount;
          }
          
          setCookie('checkout_amount', total_culqi, 1);
          setCookie('checkout_currency', window.shop_currency, 1);
          setCookie('checkout_email', data_blocks.block_0.b0_email, 1);
          setCookie('checkout_address', data_blocks.block_1.b1_address+' '+data_blocks.block_1.b1_district, 1);
          setCookie('checkout_address_city', 'Lima', 1);
          setCookie('checkout_country_code', 'PE', 1);
          setCookie('checkout_first_name', data_blocks.block_0.b0_first_name, 1);
          setCookie('checkout_last_name', data_blocks.block_0.b0_last_name, 1);
          setCookie('checkout_phone_number', data_blocks.block_0.b0_phone, 1);
          
          Culqi.settings({
            title: shop_name,
            currency: window.shop_currency,
            description: 'Checkout: '+$b0_first_name.val()+' '+$b0_last_name.val(),
            amount: total_culqi
          });
          Culqi.open();
        }
        /* payu
        =============================================== */
        if(payment_method === 'pm_payu'){
          var $line_total	= $('.total-line-table__footer');
          var total_price 	= $line_total.find('.total-line__price').find('.payment-due__price').html();
          $('.button_payu').html('Pagar: ' + total_price);
          setTimeout(function(){
            $('.container-alert-modal').show();
            $('#payu_form').fadeIn('slow');
          }, 2000);
        }
        if(payment_method === 'pm_payu_alt'){
          process_pay_checkout('register', 'payu_alt');
        }
        /* transferences || free
        =============================================== */
        if(payment_method === 'pm_others' || payment_method === 'free' ){
          process_pay_checkout('register', 'others');
        }
        
        $button_submit.removeAttr('disabled');
      }//end if
      
      
      if( action === 'register' ){
        var token_id = $('#btn_process_ajax').attr('token_id');
        data_blocks['summary']['token_id'] 	= (token_id === '')?'0':token_id;
        data_blocks['summary']['method'] 	= method;
      
        var block_array = new Array();
        block_array.push(data_blocks);
        
        var block_zero = new Array();
        block_zero.push(data_blocks.block_0);
        var block_one = new Array();
        block_one.push(data_blocks.block_1);
        var block_two = new Array();
        block_two.push(data_blocks.block_2);
        var block_three = new Array();
        block_three.push(data_blocks.block_3);
        var block_summary = new Array();
        block_summary.push(data_blocks.summary);
        
        
        var data_cart = new Array();
        if(cart_items.length > 0){
          for(var i = 0; i < cart_items.length; i++){
            var data_parts = {};
            data_parts['product_id'] 	= cart_items[i].product_id;
            data_parts['variant_id'] 	= cart_items[i].variant_id;
            data_parts['quantity'] 		= cart_items[i].quantity;
            data_parts['price'] 		= cart_items[i].price;
            data_cart.push(data_parts);
          }//end for
        }//end if
        var data_places2 = {
          'option'		: 'ax_submit_form_data',
          'data_cart' 	: JSON.stringify(data_cart),
          //'data_blocks' : JSON.stringify(block_array),
          'block_zero' 	: JSON.stringify(block_zero),
          'block_one' 	: JSON.stringify(block_one),
          'block_two' 	: JSON.stringify(block_two),
          'block_three' : JSON.stringify(block_three),
          'block_summary' : JSON.stringify(block_summary)
        };
        //console.log(url_places);
        console.log(data_places2);
        //return false;
        //SUBMIT
        $.ajax({
          type: 'GET',
          url: url_places,
          data: data_places2,
          async: false,
          jsonpCallback: 'jsonp_callback',
          contentType: "application/json",
          dataType: 'jsonp',
          cache: false,
          success: function(data) {
            console.log(data);
            //console.log(data.request.data_success);
            //$button_submit.removeAttr('disabled');
            console.log(data.request.data_success);
            if(data.request.data_success == '1'){
              //$('.content_thanks').fadeIn('slow');
              setTimeout(function(){
                //clear_cart();
                var shop_url = '';
                random = Math.random();
                setCookie('checkout_form', random, 1);
                top.location.href = shop_url + '/pages/thank-you?rd='+random;
              }, 500);
            }else{
              alert("No se ha podido completar su pedido. Por favor comuníquese con el administrador del sitio");
              location.reload();
            }
          },
          error: function (request, status, error) { console.log(status + ", " + error); }
        });
        
      }
      
    }
    
    
    /*
    	Clear cart
    =============================================== */
    function clear_cart(){
      $.ajax({
        type: 'POST',
        url: '/cart/clear.js',
        async:false,
        success: function(data){
          console.log('clear');
        }
      });
    }
    
    /*
    	Form error
    =============================================== */
    function form_error(){
      var data_message = "form_checkout.validate.form_error";
      var data_cart_empty = '<span class="field__message error" '+((window.multi_lang)?'data-translate="form_checkout.validate.form_error"':'')+'>'+data_message+'</span>';
      $('#btn_checkout_submit').after(data_cart_empty);
      translator.doTranslate(".form-to-checkout");
    }


    /*
        Token culqi
    =============================================== */
    function culqi() {
      if (Culqi.token) { // ok
        // token id
        var token = Culqi.token.id;
        //$('#btn_process_ajax').fadeIn('slow');
        $('#btn_process_ajax').attr('token_id', token);
        $('.mask-form').show();
        create_charge_culqi(token);

      } else { // error
        // show JSON object error
        alert("No se ha podido procesar su pago, por favor intente más tarde.");
        console.log(Culqi.error);
        form_error();
        location.reload();
      }
    };


    var responseHandler = function(response) {
      var $form = $('#create-form');
      if (response.error) {
        // Show the errors on the form
        $form.find('.create-errors').text(response.error);
        $form.find('button').prop('disabled', false);
      } else {
        // token contains id, last4, and card type
        var token = response.token;
        alert('Token payu: ' + token);
        return false;
        $('#btn_process_ajax').attr('token_id', token);
        process_pay_checkout('register', 'payu');
        // Save the token ...k
        // ...
        // go somewhere
        // do something
        $form.find('button').prop('disabled', false);
        /*
                          // Se obtiene el token y se puede guardar o enviarlo para algún pago.
                          var token = response.token;
                          var payer_id = response.payer_id;
                          var document = response.document;
                          var name = response.name;
                      */
      }
    };
    //jQuery(function($) {
    $('#create-form').submit(function(event) {
      var $form = $(this);
      // Disable the submit button to prevent repeated clicks
      $form.find('button').prop('disabled', true);
      payU.createToken(responseHandler, $form);
      // Prevent the form from submitting with the default action
      return false;
    });
    //});

    $(document).on('click', '.button_payu', function(e){
      $('#create-form').find('button[type="submit"]').trigger('click');
      e.preventDefault();
    });


    function eval_free_method(){
      var $line_total	= $('.total-line-table__footer');
      var total_price 	= $line_total.find('.total-line__price').find('.payment-due__price').attr('data-checkout-payment-due-target');
      if( parseFloat(total_price) === 0 ){
        $('div[data-payment-subform="required"]').addClass('hidden');
        $('div[data-payment-subform="free"]').removeClass('hidden');
        $('div[data-payment-subform="free"]').find('input[name="checkout[payment_gateway]"]').trigger('click');
      }else{
        $('div[data-payment-subform="required"]').removeClass('hidden');
        $('div[data-payment-subform="free"]').addClass('hidden');
        var payment = $('input[name="checkout[payment_gateway]"]:checked').val();
        if( payment === 'free' ){
        	$('div[data-payment-subform="required"]').find('input[name="checkout[payment_gateway]"]:first').trigger('click');
        }
      }
    }


	function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    function delCookie(cname){
      document.cookie = cname+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
    }

    function create_charge_culqi( token ){
      
      var checkout = {
        'token_id' 		: token,
        'amount' 		: getCookie('checkout_amount'),
        'currency' 		: getCookie('checkout_currency'),
        'email' 		: getCookie('checkout_email'),
        'address' 		: getCookie('checkout_address'),
        'address_city' 	: getCookie('checkout_address_city'),
        'country_code' 	: getCookie('checkout_country_code'),
        'first_name' 	: getCookie('checkout_first_name'),
        'last_name' 	: getCookie('checkout_last_name'),
        'phone_number' 	: getCookie('checkout_phone_number')
      }
        var block_array = new Array();
        block_array.push(checkout);
      
        var data_places2 = {
          'option'		: 'create_charge_culqi',
          'checkout' 	: JSON.stringify(block_array)
        };
        $.ajax({
          type: 'GET',
          url: url_places,
          data: data_places2,
          async: false,
          jsonpCallback: 'jsonp_callback',
          contentType: "application/json",
          dataType: 'jsonp',
          cache: false,
          success: function(data) {
            console.log(data);
			var result = '';

            if( data.constructor == String ){
              result = JSON.parse(data);
            }
            if( data.constructor == Object ){
              result = JSON.parse(JSON.stringify(data));
            }
            if( result.object === 'charge' ){
              process_pay_checkout('register', 'culqi');
            }
            if( result.object === 'error' ){
              if(result.user_message){
                alert(result.user_message);
                
              }else if(result.merchant_message){
                alert(result.merchant_message);
                
              }
              location.reload();
            }
          },
          error: function (request, status, error) { console.log(status + ", " + error); }
        });
    }



