//FUNCTION jQuery.inert
(function($) {
	// Modeling HTML.next inert global attribute
	$.fn.inert=function() {
		var options = {
			set:true,
			callback:{}
		};
		// Set Options
		for (var i=0; i<arguments.length; i++) {
			if ($.isFunction(arguments[i])) options.callback = arguments[i];
			else if ($.isArray(arguments[i])) $.extend(options, arguments[i]);
			else if (typeof arguments[i] == 'boolean') options.set = arguments[i];
		}

		// First, remove all inert-guards
		this.each(function() {
			var guards = $(this).data('inert-guard') || [];
			$(this).data('inert-guard', []).removeAttr('inert').removeAttr('disabled').find('*').removeAttr('disabled');
			if (guards.length != 0) {
				$(this).stop(true, true).animate({
					opacity:'1'
				}, 'slow', function() {
					for (i in guards)
						$('#inert-guard-' + guards[i]).remove();
					if (!options.set && $.isFunction(options.callback)) options.callback();
				});
			} else if (!options.set && $.isFunction(options.callback)) options.callback();
		});

		// Now activate inert state
		if (options.set) {
			this.each(function() {
				var zed = $(this).css('z-index');
				if (!isNaN(zed)) zed++;
				else zed = 100;
				var i = $('.inert-guard').length;
				$('body').append(
					$('<div/>').css({
						position:'absolute',top:$(this).offset().top,left:$(this).offset().left,cursor:'default',
						width:$(this).outerWidth(),height:$(this).outerHeight(),background:'transparent','z-index':zed
					}).addClass('inert-guard').attr('id', 'inert-guard-' + i)
				);
				$(this).stop(true, true).animate({
					opacity:'.6'
				}, 'slow', function() {
					if ($.isFunction(options.callback)) options.callback();
				});
				$(this).data('inert-guard', $.merge([i], $(this).data('inert-guard')));
				$(this).attr('inert','inert').attr('disabled','disabled').find('*').attr('disabled','disabled');
			});
		}
		return this;
	};
})(jQuery);
