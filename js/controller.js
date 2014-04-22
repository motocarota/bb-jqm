(function(){

	window.app = {
		user: {},
		models: {},
		views: {},
		collections: {},
		controller: {},
		data: {}
	};
	
	app.Router = Backbone.Router.extend({
		
		initialize: function() {
			
			app.data.list = new app.collections.items();
		},
		
		status: [],
		
		routes: {
			"list": 		"list",
			"detail-:id": 	"detail",
			"options": 		"options",
			"help": 		"help",
			"*page": 		"intro"
		},
		
		pages: {
			id: []
		},
		
		intro: function( ) { 
			this.setView( "intro", null, { footer: false } );
		},
		
		list: function( ) { 
			this.setView( "list" );
		},
		
		detail: function( id ) { 
			
			if ( !id ) {
				$.mobile.navigate("list");
				return;
			}
			this.setView( "detail", app.data.list.find( { 'id': id } ), { force: true } );
		},
		
		options: function( ) { 
			this.setView( "options", null, { footer: false, header: false, mode: 'dialog' } );
		},
		
		help: function( ) { 
			this.setView( "help", null, { header: false } );
		},
	
		setView: function( id, model, options, viewClass ) { 
			console.log("[controller] page "+id+" requested")
			if ( !app.data ) {
				console.warn('no data')
				$.mobile.navigate("list");
				return -1;
			}
			if ( !id || !tpl.get( id ) ) {
				console.error("id non valido: "+id);
				return -1;
			}
			options = options || {};
			
			//TODO vedere se va in createPage
			if ( !this.status[ id ] || options.force ) {
				console.log( 'init '+id );
				this.status[ id ] = {};
				viewClass = viewClass || app.views.page;
				var view = this.status[id].view = new viewClass( { 
					page: id, 
					model: model, 
					options: options
				} );
				view.render();
				$( view.el ).attr( "id", id );
				$( 'body' ).append( $(view.el) );
			}
			this.changePage( this.status[ id ].view, options.mode );
		},
		
		// changePage:function (page) {
		// 	$(page.el).attr('data-role', 'page');
		// 	page.render();
		// 	$('body').append($(page.el));
		// 	$.mobile.changePage($(page.el), {changeHash:false});
		// }

		changePage: function ( page, mode ) {
		
			if ( mode === 'dialog' ) {
				$(page.el).attr('data-role', 'dialog');
				$.mobile.changePage( $(page.el), {
					allowSamePageTransition: true,
					reverse: false,
					changeHash: false,
					role: 'dialog',
					transition: this.historyCount++ ? $.mobile.defaultDialogTransition : 'none'
				});
			} else {
				$(page.el).attr('data-role', 'page');
				$.mobile.changePage( $(page.el), {
					changeHash: true,
					transition: this.historyCount++ ? $.mobile.defaultPageTransition : 'none'
				});
			}
		},

		historyCount: 0
	});
})();