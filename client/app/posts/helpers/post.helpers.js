Template.post.helpers( {
	// return true if the user is the creator if the post
	'isCreator' : function ( creator ) {
		if (  Meteor.user()!== null && Meteor.user()._id === creator ) {
			return true
		}
		return false;
	},

	// format date
	'formatDate' : function ( date ) {
		var dt = new Date( date );

		return  ( dt.getMonth() + 1 ) + '/' + dt.getDate() + '/' + dt.getFullYear();
	}
} );
