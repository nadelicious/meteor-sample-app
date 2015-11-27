// set no of pages
Meteor.call( 'getPages', Session.get( 'search' ), function ( err, res ) {
	if ( err ) {
		throw new Error( 'failed to get pages' )
	} else {
		Session.set( 'noOfPages', res );
	}
} );

Template.pagination.helpers( {
	// display pagination if pages length is greater than 1
	'isPaginate' : function () {
		return Session.get( 'noOfPages' ).length > 1;
	},

	// display no of pages
	'getPages' : function () {
		return Session.get( 'noOfPages' ) || [ ];
	},

	// get the active state of cursor
	'getActiveState' : function ( cursor ) {
		var state = '';

		if ( cursor === Session.get( 'cursor' ) ) {
			state =  'active';
		}

		return state;
	},

	// get the disabled state of prev and next cursor
	'getDisabledState' : function ( cursor ) {
		var state     = '';
		var noOfPages = Session.get( 'noOfPages' );
		var lastPage  = noOfPages[ noOfPages.length - 1 ];

		if ( cursor === 'prev' && Number( Session.get( 'cursor' ) ) === 1 ) {
			state = 'disabled'
		} else if ( cursor === 'next' && Number( Session.get( 'cursor' ) ) === lastPage ) {
			state = 'disabled';
		}

		return state;
	}

} );
