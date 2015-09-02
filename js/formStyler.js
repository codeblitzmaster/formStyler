(function( $ ) {
    // Plugin definition.
    $.fn.formStyler = function( options ) {

		var settings = $.extend( {}, $.fn.formStyler.defaults, options );

		var base = this;
		var labelsCollection = base.find('label');
		var fsWrapper  = base.find('.fs-ele-wrapper');;
		base.init = function(){
			console.log('Plugin Works');
			console.log(settings);

			//base.groupFieldsByWrapper();
			
				$.each(labelsCollection, function(){
					$(this).addClass('fs-label');
				});
			switch(settings.columns){
				case 1:
						base.fs_col_1_structure();
						break;
				case 2:
						base.fs_col_2_structure();
						break;
				default:

			}

			if(settings.labelWidth !== "150px"){
				$.each(labelsCollection, function(){
					$(this).css({"width": settings.labelWidth});
				});
			}

			if(settings.labelPlacement == "top"){
				$.each(labelsCollection, function(){
					if($(this).hasClass('fs-label')){
						$(this).removeClass('fs-label');
						$(this).addClass('fs-label-block');
					}
				});
			}
			else if(settings.labelPlacement == "left")
			{
				$.each(labelsCollection, function(){
					if($(this).hasClass('fs-label-block')){
						$(this).removeClass('fs-label-block');
						$(this).addClass('fs-label');
					}
				});
			}
		};
		base.fs_col_1_structure = function(){
				$.each(fsWrapper,function(i){
					$(this).removeClass('fs-col-2');
				});
		};
		base.fs_col_2_structure = function(){
			// Adding Two Column Structure
			$.each(fsWrapper,function(i){
				$(this).addClass('fs-col-2');
			});
		};

		base.groupFieldsByWrapper = function(){
			$.each(labelsCollection, function(){
				if(!$(this).parent().hasClass('fs-ele-wrapper'))
				{
					$(this).addClass('fs-label');
					$(this).next('input,select').andSelf().wrapAll('<div class="fs-ele-wrapper"/>');		
				}
			});
			fsWrapper = base.find('.fs-ele-wrapper');
		};

		base.init();
    };

    $.fn.formStyler.defaults = {
    	labelWidth : "150px",
    	labelClass : "fs-label",
    	labelPlacement : "left",
		columns : 1
    };
})( jQuery );