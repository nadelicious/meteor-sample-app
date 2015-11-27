// common layout for every route
Router.configure( {
	'layoutTemplate' : 'layout'
} );

// we want to be sure that the user is logging in
// for all routes but login
Router.onBeforeAction( function () {
    if ( !Meteor.user() ) {
    	this.router.go( '/' );
    	this.render( 'posts' );
    } else {
        // required by Iron to process the route handler
        this.next();
    }
} );

// my one and only route
Router.route( '/', {
	// subscribe data before rendering the template
	// set page cursor and search value to defaults
	'waitOn' : function () {
		Session.set( 'cursor', 1 );
		Session.set( 'search', null );

		Tracker.autorun( function () {
			Meteor.subscribe( 'posts', Session.get( 'cursor' ), Session.get( 'search' ) )
		} );

		return [
			Meteor.subscribe( 'uploads' ),
		];
	},

	// if data is ready, then render the template
	'action' : function () {
		if ( this.ready() ) {
			this.render( 'posts' );
		}
	}
} );

