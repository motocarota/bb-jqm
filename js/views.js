(function(){
	app.views.page = Backbone.View.extend({

		header: true,
		footer: true,
		page: '',
		
		initialize: function( data ){
			
			data = data || {};
			this.page = data.page;
			_.extend( this, data.options );
		},
		
		render: function(){
			
			this.template = _.template( tpl.get( this.page ) );
			this.$el.html( this.template( this.model ? this.model.toJSON() : null ) );
			if ( this.header ){
				$( tpl.get( 'header' ) ).prependTo( this.$el );
			}
			if ( this.footer ){
				$( tpl.get( 'footer' ) ).appendTo( this.$el );
			}
			this.$el.trigger('create');
			return this;
		}
	});
	
	app.views.detail = Backbone.View.extend({
		
		initialize: function( data ){
			data = data || {};
			_.extend( this, data );
			this.template = _.template( tpl.get( 'detail' ) );
		},
		render: function(){
			this.$el.html( this.template( this.model ? this.model.toJSON() : null ) );
			$( tpl.get( 'header' ) ).prependTo( this.$el );
			$( tpl.get( 'footer' ) ).appendTo( this.$el );
			this.$el.trigger('create');
			return this;
		}
	});
})();