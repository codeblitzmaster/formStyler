(function( $ ) {
    // Plugin definition.
    $.fn.formStyler = function( options ) {

		var settings = $.extend( {}, $.fn.formStyler.defaults, options );

		var base = this;
		var labelsCollection = base.find('label');
		var fsWrapper  = base.find('.fs-ele-wrapper');

		var colClasses = [
							'fs-col-2',
							'fs-col-3'
							];
		base.init = function(){
			console.log('Plugin Works');
			console.log(settings);

			//base.groupFieldsByWrapper();
			
				$.each(labelsCollection, function(){
					$(this).addClass('fs-label');
				});
			switch(settings.columns){
				case 1:
						base.fs_col_restructure();
						break;
				case 2:
						base.fs_col_restructure('fs-col-2',false);
						break;
				case 3: 
						base.fs_col_restructure('fs-col-3',false);
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
		// base.fs_col_restructure = function(){
		// 		$.each(fsWrapper,function(i){
		// 			$(this).removeClass('fs-col-2');
		// 		});
		// };
		base.fs_col_restructure  = function(newFsClass){
			base.remove_fs_col_class();
			newFsClass = newFsClass || '';
			$.each(fsWrapper,function(i){
				$(this).addClass(newFsClass);
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

		base.remove_fs_col_class = function(){
				$.each(fsWrapper,function(i){
					$(this).removeClass (function (index, css) {
				    	return (css.match (/(^|\s)fs-col-\S+/g) || []).join(' ');
					});
				});
			}

		base.init();
    };

    $.fn.formStyler.defaults = {
    	labelWidth : "150px",
    	labelClass : "fs-label",
    	labelPlacement : "left",
		columns : 1
    };
})( jQuery );