Template.posts.helpers( {
	// return Posts based on subscription
	'posts' : function () {
		return Posts.find( { }, { sort : { 'updatedAt' : -1 } } );
	},

	// return true if Posts collection has count
	'hasPostsCount' : function () {
		return Boolean( Posts.find( { } ).count() );
	}
} );
