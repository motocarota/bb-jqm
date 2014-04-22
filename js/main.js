$(document).ready(function() {
	jQuery.support.cors = true;
	jQuery.ajaxSetup({cache: false});
	
	tpl.loadTemplates(
		[ 'intro', 'list', 'detail', 'options', 'help', 'header', 'footer' ], 
		function() {
			app.controller = new app.Router();
			Backbone.history.start( );
		}
	);
	
	$.mobile.ajaxEnabled = false;
	$.mobile.linkBindingEnabled = false;
	$.mobile.hashListeningEnabled = false;
	$.mobile.pushStateEnabled = false;	 
});
