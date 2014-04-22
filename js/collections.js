(function(){
	app.collections.items = Backbone.Collection.extend({
		model: app.models.item,
		url: 'data/items.json',
		initialize: function() {
			console.log( 'init data' );
			this.fetch();
		}
	});
})();