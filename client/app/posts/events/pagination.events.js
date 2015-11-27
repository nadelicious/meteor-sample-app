Template.pagination.events( {
	// pagination events
	'click ul.pagination li' : function ( event ) {
		event.preventDefault();
		var el = $( event.currentTarget ).children( 'a' );
		var cursor;

		if ( $( event.currentTarget ).hasClass( 'disabled' ) ) {
			return false;
		}

		switch( el.attr( 'aria-label' ) ) {
			case 'Page' :
				cursor = Number( el.text() );
			break;

			case 'Previous' :
				cursor = Number( Session.get( 'cursor' ) ) - 1;
			break;

			case 'Next' :
				cursor = Number( Session.get( 'cursor' ) ) + 1;
			break;
		}

		Session.set( 'cursor', cursor );
	}

} );
