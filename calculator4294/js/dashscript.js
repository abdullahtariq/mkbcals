
      


jQuery(document).ready(function() {
			
  
	  /* -------------------------------------------------------------- */
			
					
				
					$('ul.rightnav > li.logout > a').click(function(){
							$( ".lo-confirm" ).animate({right: "0"}, 500 );
							$( "ul.rightnav > li.logout span" ).css({display: "block"}, 500 );
							$( "ul.rightnav > li.logout i.logout" ).addClass( "active" );
					});
					
				$('a.lo-no').click(function(){
							$( ".lo-confirm" ).animate({right: "-250px"}, 500 );
							$( "ul.rightnav > li.logout span" ).css({display: "none"}, 500 );
							$( "ul.rightnav > li.logout i.logout" ).removeClass( "active" );
						
					});
				
				/* ---- */
				
				$('.videobtn').click(function(event){
							$(".slideoverlay").fadeIn("slow");
							$( ".videopop" ).fadeIn("slow");
					});
				
				$('.videopop a.close, .slideoverlay, #dashnav').click(function(event){
							$(".slideoverlay").fadeOut("slow");
							$( ".videopop" ).fadeOut("slow");
							event.stopPropagation();
					});
				
				
				/*  ----- */
	/*
                               $('.icon-menu').hover(function(event){
                                    if($(this).hasClass("active")){
                                        $( this ).removeClass( "active" );
                                        $( ".slidenav-dd" ).animate({top: "-600px"}, 100 );
                                    }
                                    else{
                                        $( this ).addClass( "active" );
                                        $( ".slidenav-dd" ).animate({top: "50px"}, 100 );
                                    }
                                     event.stopPropagation();
                                });
                                
			/*	$('.icon-menu').toggle(function(){
					
						$( this ).addClass( "active" );
						$(".slideoverlay").fadeIn("slow");
						$( ".slidenav" ).animate({left: "0"}, 500 );
					
					},function(){
						
						$( this ).removeClass( "active" );
						$(".slideoverlay").fadeOut("slow");
						$( ".slidenav" ).animate({left: "-300px"}, 500 );
					
					});*/
				
				
				/*  ----- 
				
				$('.slideoverlay,#dashnav').mouseOver(function(event){
							$(".icon-menu").removeClass( "active" );
							$( ".slidenav-dd" ).animate({top: "-600px"}, 100 );
							event.stopPropagation();
					});
					
		*/
			 
			 
			 	/*-------------*/
                                $('#tiles .box ').click(function(){
                                    if($(this).hasClass( "expanded")){
                                        $(".tile-shortcuts").fadeOut();
                                        setTimeout(function() {
                                                $('#tiles .box ').removeClass( "expanded");
                                        }, 500);
                                    }
                                    else{
                                        $(this).addClass( "expanded");
					$(".tile-shortcuts", this).delay('slow').fadeIn();
                                    }
                                });
                                
				/*$('#tiles .box ').toggle(function(){
					$(this).addClass( "expanded");
					$(".tile-shortcuts", this).delay('slow').fadeIn();
					
					},function(){
						
						
					});*/
				
				
				
				
		

				
				/*-------------*/
				$('a.tw-toggle').click(function(){
					  
						  if((this).hasClass("tiles")){
							  
									  $(this).removeClass("tiles");
									  $(this).addClass("wsicon");
									  $("#tiles").show();                      
									  $('#workspace').animate({left:'150%'},function(){
									  });                                            
						   
							  }
							  else{
									   $("this").removeClass("wsicon");
									   $("this").addClass("tiles"); 
									   $("#tiles").hide();
									   $('#workspace').animate({left:'0px'});  
								  }
				   
					  
				  } );
	
	

					/*-------------*/
				    $('input').iCheck({
						checkboxClass: 'checkinput',
						radioClass: 'radioinput'
					  });
					  	/*-------------*/
						
						 

					  	/*-------------*/
					
					//////////////////
									
								
								 
									//////////////////
					
					
											
			   
			  
			  
				
	
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	