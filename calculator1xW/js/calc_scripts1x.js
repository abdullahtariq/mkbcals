/*
*   Calculator with 1x Email and 1x Automation
* 
*/
jQuery(document).ready(function() {

        var url = {header:$.getUrlVar(false,'header')};
        
        if(url){
          if(url.header == "n"){
            $('.topbar').hide();
          }
        }
			/*==============
        Variable Declaration  & Intialization
      ===============*/
      $('#rangeValue').val(''); 
      $('#emailValue').val(''); 
  		$('.btn').button();
      var flags = {};
      var rangeValue = 0;  // No. of Contacts
      var emailsRangeValue=0; // No. of Emails 
      var range = 0;
      var Conacts = '';
      var i=0;
      flags.isBasic = true;
      var basic = [5,10,15,20,25,50,80,130,170,220,250,300];
      var email = [5000,10000,15000,20000,25000,50000,75000,100000,125000,150000,200000,250000];
      var HostedContactsArray = ['1 - 1000','1001 - 2000','2001 - 3000','3001 - 4000','4001 - 5000','5001 - 10,000','10,001 - 15,000','15,001 - 20,000','20,001 - 25,000','25,001 - 30,000','30,001 - 40,000','40,001 - 50,000']
      var unlimited = [20,30,45,60,75,110,180,250,320,380,450,500];
      var nt = [5,7,9,11,13,19,22,25,28,31,35,39];
      var bot = [2,3,4,5,6,9,11,13,15,17,19,19];
      var bundleANB = [2,2,2,2,2,3,3,5,5,7,7,10,10];
      var businessType ; 
    /*============
      Events on Page Load
    ==============*/
    $('#cartCheckout').click(function(){
      if($('#rangeValue').val() == "" || $('#rangeValue').val() == 0){
            var cartDetails = 'Member Activation - Simple';
                if(flags.isBasic){
                  cartDetails += '  (Basic Emails)';
                }else{
                  cartDetails += '  (Unlimited Emails)';
                }
                //cartDetails += ' + '+$('.nt strong').text()+' (Nurture Track)' + ' + ' + $('.auto strong').text() + ' (Autobot)';
            $('#cartDetails').val(cartDetails);
            $('#cartUC').val('Member Activation - Simple');
            var emailType ='';
            if(flags.isBasic){emailType ='Basic Emails'}else{emailType = '  Unlimited Emails'}
            $('#cartEs').val(emailType);
      }
            $('#cartPrice').val('0.99');
            $('#checkoutForm').submit();
    })
    $('.wrapword a').click(function(){
       var url = $(this).attr('href');
        window.open(
            url,
            '_blank' // <- This is what makes it open in a new window.
          );
    })
    initialize();
    /*===============
      Attach Events 
    ==============*/
    $('#rangeValue').focus();
    $('#rangeValue').keyup(function(event){
        rangeValue = $(this).val();
        compareValues(); // Compare the two values before initiating calculation
      });

     $('#emailValue').keyup(function(event){
        emailsRangeValue = $(this).val();
        compareValues(); // Compare the two values before initiating calculation
      });
    $('.dropdownAB li a').click(function(event){
        var target = $(event.target).text();
          $('#botdropdown').html(target+'<span class="caret"></span>');
          calculateDiscountOnChange();
      });
      $('.dropdownNT li a').click(function(event){
        var target = $(event.target).text();
        $('#ntdropdown').html(target+'<span class="caret"></span>');
        calculateDiscountOnChange();
      });
      $('.dropdown').click(function(){
        $('#customRadio').click();
      });
  
      $('#basicBtn').click(function(){
        flags.isBasic = true;
        totalCost($(this).attr('id'));
      })
      $('#unlimitedBtn').click(function(){
        flags.isBasic = false;
        totalCost($(this).attr('id'));
      });
      $('#customBtn').click(function(){
        flags.isAutoCustom = true;
        totalCost($(this).attr('id'));
        $('.nt strong').text($('#ntdropdown').text());
      $('.auto strong').text($('#botdropdown').text());
      });
      $('#bundleBtn').click(function(){
          flags.isAutoCustom = false;
          totalCost($(this).attr('id'));
          $('.nt strong').text($('#ntbundle').text());
          $('.auto strong').text($('#botbundle').text());
        });
       
      /*==========================
        Required Functions
      ===========================*/
    function compareValues(){
       var hostContactRange = 0; 
       var EmailsRange = 0;
      /*if(parseInt(rangeValue) >= parseInt(emailsRangeValue)){
          rangeValue = rangeValue;
          range = calculateRange();
      }else{

          //rangeValue = emailsRangeValue;
          range = calculateEmailRange();
      }*/
      hostContactRange = calculateRange(rangeValue);
      EmailsRange = calculateEmailRange(emailsRangeValue);
      if(parseInt(email[hostContactRange]) >= parseInt(email[EmailsRange])){
        range = hostContactRange;
      }else{
        range = EmailsRange;
      }
      //console.log('Contacts Range value : ' + email[hostContactRange] + 'Emails Range Value :' + email[EmailsRange]);
      initialize();
    }
    function initialize(){
     
      if(range != -1){
        if(Number(rangeValue) !== 0){
        showloading(rangeValue);
        settingValues(range);
        $('.contact-wrap').hide();
        $('.calculator-wrap').show();
        }else{
          setTozero();
        }
      }else{
          if(rangeValue != ""){
          $('.contact-wrap').show();
          $('.calculator-wrap').hide();
        }else{
           $('.contact-wrap').hide();
          $('.calculator-wrap').show();
          setTozero();
        }
        //$('#rangeValue').val(''); 
        range = 0;
        //settingValues(range);
        return false;
      }
    } 
    function settingValues(){
      flags.isBasic = true;
      flags.isAutoCustom = false;
      $('#basic').html('$<i>'+basic[range]+'</i>');
      $('#emails').text(commaSeparateNumber(email[range]));
      $('#unlimited').html('$<i>'+unlimited[range]+'</i>');
      $('#ntbundle').text(bundleANB[range]);
      $('#botbundle').text(bundleANB[range]);
      $('#btype').html('<span>For</span> '+businessType);
      
      $('.contacts strong').text(HostedContactsArray[range]);
      $('.mails strong').text(commaSeparateNumber(email[range]));
      $('.nt strong').text(bundleANB[range]);
      $('.auto strong').text(bundleANB[range]);
     
      if($('#basicBtn').hasClass('active'))
          flags.isBasic = true;
      else 
          flags.isBasic = false;
      if($('#customBtn').hasClass('active'))
         flags.isAutoCustom = true;
      else
         flags.isAutoCustom = false;

      if(flags.isAutoCustom)
        {
          calculateDiscountOnChange();
          calculateDiscount(nt[range]*bundleANB[range],bot[range]*bundleANB[range]);
        }
      else
        calculateDiscount(nt[range]*bundleANB[range],bot[range]*bundleANB[range]);
      totalCost();
    }
    function calculateRange(rangeValue){
      if( 1 <= rangeValue && rangeValue <= 1000)
         {i = 0;}
      else if( 1001 <= rangeValue && rangeValue <= 2000)
         {i = 1;}
      else if( 2001 <= rangeValue && rangeValue <= 3000)
         {i= 2;}
      else if( 3001 <= rangeValue && rangeValue <= 4000)
        {i= 3;}
      else if(4001 <= rangeValue && rangeValue <= 5000)
        {i= 4;}
      else if( 5001 <= rangeValue && rangeValue <= 10000)
        {i= 5;}
      else if( 10001 <= rangeValue && rangeValue <= 15000)
        {i= 6;}
      else if( 15001 <= rangeValue && rangeValue <= 20000)
        {i= 7;}
      else if( 20001 <= rangeValue && rangeValue <= 25000)
        {i= 8;}
      else if( 25001 <= rangeValue && rangeValue <= 30000)
        {i= 9;}
      else if( 30001 <= rangeValue && rangeValue <= 40000)
        {i= 10;}
      else if( 40001 <= rangeValue && rangeValue <= 50000)
        {i= 11;}
      else if(50001<=rangeValue)
        {i=-1;}
      if(0 <= i && i <= 4)
          businessType = "Small Business";
      else if( 5 <= i && i<=9 )
          businessType = "Medium Business"
      else
          businessType = "Large Business";
      return i;
    }
    function calculateEmailRange(rangeValue){
      if( 1 <= rangeValue && rangeValue <= 5000)
         {i = 0;Conacts='1 - 1000';}
      else if( 5001 <= rangeValue && rangeValue <= 10000)
         {i = 1;Conacts='1001 - 2000';}
      else if( 10001 <= rangeValue && rangeValue <= 15000)
         {i= 2;Conacts='2001 - 3000';}
      else if( 15001 <= rangeValue && rangeValue <= 20000)
        {i= 3;Conacts='3001 - 4000';}
      else if(20001 <= rangeValue && rangeValue <= 25000)
        {i= 4;Conacts='4001 - 5000';}
      else if( 25001 <= rangeValue && rangeValue <= 50000)
        {i= 5;Conacts='5001 - 10,000';}
      else if( 50001 <= rangeValue && rangeValue <= 75000)
        {i= 6;Conacts='10,001 - 15,000';}
      else if( 75001 <= rangeValue && rangeValue <= 100000)
        {i= 7;Conacts='15,001 - 20,000';}
      else if( 100001 <= rangeValue && rangeValue <= 125000)
        {i= 8;Conacts='20,001 - 25,000';}
      else if( 125001 <= rangeValue && rangeValue <= 150000)
        {i= 9;Conacts='25,001 - 30,000';}
      else if( 150001 <= rangeValue && rangeValue <= 200000)
        {i= 10;Conacts='30,001 - 40,000';}
      else if( 200001 <= rangeValue && rangeValue <= 250000)
        {i= 11;Conacts='40,001 - 50,000';}
      else if(250001<=rangeValue)
        {i=-1;}
      if(0 <= i && i <= 4)
          businessType = "Small Business";
      else if( 5 <= i && i<=9 )
          businessType = "Medium Business"
      else
          businessType = "Large Business";
      return i;
    }
    
    function calculateDiscount(nt,bot){

      var total = parseInt(nt) + parseInt(bot);
      var saving = 0.33 * total;
      var totalAmount = total - saving;
      console.log('Saving : '+ saving + ' Total :' + totalAmount);
      saving = Math.round(saving);
      totalAmount = Math.round(totalAmount);
      $('#saves').text('$'+saving);
      $('#total').html('$<i>'+totalAmount+'</i>');

    }

    function commaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
  }
    function calculateDiscountOnChange(){
      var ntval = Number($('#ntdropdown').text());
      var botval = Number($('#botdropdown').text());
      var newNT = nt[i]*ntval;
      var newBot= bot[i]*botval;
      $('#nurturePrice').html('$<i>'+newNT+'</i>');
      $('#autobotPrice').html('$<i>'+newBot+'</i>');
      $('.nt strong').text($('#ntdropdown').text());
      $('.auto strong').text($('#botdropdown').text());
      // Check which Email is set
      if($('#basicBtn').hasClass('active')){
            totalCost("basicBtn")
      }else{
            totalCost("unlimitedBtn")
      }
      flags.isAutoCustom = true;
    }
    function totalCost(option,isCustom){
      console.log('Basic Badge : '+flags.isBasic + ' Custom Badge : ' + flags.isAutoCustom);
      var isBasic = flags.isBasic;
      var isAutoCustom = flags.isAutoCustom;
      if(isBasic === true && isAutoCustom === true){
        total_cost = Number($('#nurturePrice i').text()) + Number($('#autobotPrice i').text()) + Number($('#basic i').text());
        $('#total_cost').html('$'+total_cost+'/mo');
         $('.mails strong').html(commaSeparateNumber(email[range]));
      }
      else if(isBasic === true && isAutoCustom === false){
        total_cost = Number($('#total i').text()) + Number($('#basic i').text());
        $('#total_cost').html('$'+total_cost+'/mo');
        $('.mails strong').text(commaSeparateNumber(email[range])); 
      }
      else if(isBasic === false && isAutoCustom === false){
        total_cost = Number($('#total i').text()) + Number($('#unlimited i').text());
            $('#total_cost').html('$'+total_cost+'/mo');
            $('.mails strong').html('Unlimited').css({'font-family': 'proxima_nova_regular','font-weight': 'normal'});
      }else if(isBasic === false && isAutoCustom === true){
            total_cost = Number($('#nurturePrice i').text()) + Number($('#autobotPrice i').text()) + Number($('#unlimited i').text());
              $('#total_cost').html('$'+total_cost+'/mo');
              $('.mails strong').html('Unlimited').css({'font-family': 'proxima_nova_regular','font-weight': 'normal'});
              $('.mails').removeAttr('style');
      }
      // Submission Form to cart page
      $('#cartPrice').val(total_cost);
      var cartDetails = 'Member Activation - Simple';
          if(flags.isBasic){
            cartDetails += '  (Basic Emails)';
          }else{
            cartDetails += '  (Unlimited Emails)';
          }
          //cartDetails += ' + '+$('.nt strong').text()+' (Nurture Track)' + ' + ' + $('.auto strong').text() + ' (Autobot)';
      $('#cartDetails').val(cartDetails);
      $('#cartUC').val('Member Activation - Simple');
      var emailType ='';
      if(flags.isBasic){emailType ='Basic Emails'}else{emailType = '  Unlimited Emails'}
      $('#cartEs').val(emailType);
      $('#cartNA').val('');
    }
    /*==============
        Loading Function
    =================*/
    function showloading(value){
      if(value !== "" && value !== 0){
          $('#total_cost').hide();
          $('.showloading').show();
          $('#rangeValue').addClass('loading');
          $('#emailValue').addClass('loading');
         // $('.bubblingG').show();
          setTimeout(function(){
                 $('.showloading').hide();
                  $('#total_cost').show();
                  $('#rangeValue').removeClass('loading');
                  $('#emailValue').removeClass('loading');

                }, 1500);
        }
    }
    // Number Only Function
    // $(".numberonly").keyup(function(event){
    //     var o=$(this);
    //     o.val(o.val().replace(/[^\d]/g,""));
    //   })  

  /*=================
      Set to Zero 
  =================*/
  function setTozero(){
    $('#basic').html('$0');
    $('#unlimited').html('$0');
    $('#total_cost').html('$0/mo');
    $('#nurturePrice i').html('0');
    $('#autobotPrice i').html('0');
    $('#ntbundle').html('$0');
    $('#botbundle').html('$0');
    $('#saves').html('0');
    $('#total i').html('0');
    $('#ntdropdown').html('0<span class="caret"></span>');
    $('#botdropdown').html('0<span class="caret"></span>');
    $('.contacts strong').html('0');
    $('.mails strong').html('0');
    $('.nt strong').html('0');
    $('.auto strong').html('0');


  }
  /*=======validation======*/
  $(".numberonly").forceNumeric();
 
		});
jQuery.fn.forceNumeric = function () {

             return this.each(function () {
                 $(this).keydown(function (e) {
                     var key = e.which || e.keyCode;

                     if (!e.shiftKey && !e.altKey &&
                     // numbers   
                         key >= 48 && key <= 57 ||
                     // Numeric keypad
                         key >= 96 && key <= 105 ||
                   
                     // Backspace and Tab and Enter
                        key == 8 || key == 9 || key == 13 ||
                     // Home and End
                        key == 35 || key == 36 ||
                     // left and right arrows
                        key == 37 || key == 39 ||
                     // Del and Ins
                        key == 46 || key == 45 || 

                        (key == 65 && e.ctrlKey)
                        )
                         return true;

                     return false;
                 });
             });
         }
$.extend({
 getUrlVars: function(url){
     var vars = [], hash;
     var hashes = null;
     if(!url){
       hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
     }
     else{
      hashes = url.slice(url.indexOf('?')+1).split('&');
     }
            for(var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                if(hash[1]){
                    vars[hash[0]] = hash[1].split("#")[0];
                }
     }
     return vars;
 },
 getUrlVar: function(url,name){
     return $.getUrlVars(url)[name];
 },
        getObj:function(obj,tagName){
            return obj.target.tagName==tagName.toUpperCase() ? $(obj.target) : $(obj.target).parents(tagName.toLowerCase());
        }
});