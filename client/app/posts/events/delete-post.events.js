Template.deletepost.events( {
	// event for deleting posts
	'click #delete-post-btn' : function ( event, template ) {
		var id = template.find( '[name=id]' ).value;

		// call delete post method
		Meteor.call( 'deletePost', id, function ( err, response ) {
			if ( err ) {
				throw new Error( err );
			} else {
				$( '#delete-post-modal' ).modal( 'hide' );
				$( '#delete-post-form' ).find( 'input[type=hidden]' ).val( '' );

				Meteor.call( 'getPages', Session.get( 'search' ), function ( err, res ) {
					if ( err ) {
						throw new Error( 'failed to get pages' )
					} else {
						Session.set( 'noOfPages', res );
					}
				} );
			}
		} );
	},

} );
