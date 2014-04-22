$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each( a, function() {
		if ( o[this.name] !== undefined ) {
			if ( !o[this.name].push ) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push( this.value || '' );
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

tpl = {
	templates:{},
	
	loadTemplates:function (names, callback) {
		var that = this;
		var loadTemplate = function (index) {
			var name = names[index];
			$.get( 'templates/' + name + '.html', function (data) {
				that.templates[name] = data;
				index++;
				if ( index < names.length ) {
					loadTemplate(index);
				} else {
					callback();
				}
			});
		console.log( 'Loading template: ' + name );
	}

	loadTemplate(0);
	},

	get:function (name) {
		return this.templates[name];
	}
};
