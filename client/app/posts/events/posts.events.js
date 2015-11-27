Template.posts.events( {
	// show add post modal
	'click #show-create-modal-btn' : function ( event ) {
		$( '#add-post-modal' ).modal();
	},

	// search by title
	'keyup input[name=searchTitle]' : function ( event ) {
		var delay = null;
		var deferred = $.Deferred();

		// set the cursor  to default
		Session.set( 'cursor', 1 );

		// clear if delay exists
		clearTimeout( delay )

		if ( $.trim( $( event.currentTarget ).val() ) !== ''  ) {
			// add debounce
			delay = setTimeout( function () {
				Session.set( 'search',  $( event.currentTarget ).val() )
				deferred.resolve( Session.get( 'search' ) );
			}, 500 );
		} else {
			Session.set( 'search',  null );
			deferred.resolve( Session.get( 'search' ) );
		}

		deferred.then( function ( search ) {
			Meteor.call( 'getPages', search, function ( err, res ) {
				if ( err ) {
					throw new Error( 'failed to get pages' )
				} else {
					Session.set( 'noOfPages', res );
				}
			} );
		} );
	}
} );




