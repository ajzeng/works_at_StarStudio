define(function(){
	var get_event = function(e) {
		var new_e = e || window.event,
			pageX = new_e.pageX,
			pageY = new_e.pageY;
		if(pageX === undefined) {
			pageX = new_e.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft);
		}
		if(pageY === undefined) {
			pageY = new_e.clientY + (document.body.scrollTop || document.documentElement.scrollTop);
		}

		// assign new attributes to newE
		new_e.pageX = pageX;
		new_e.pageY = pageY;
		return new_e;
	};

	return {
		get_event: get_event,
	};
});