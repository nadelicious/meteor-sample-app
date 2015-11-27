Template.addpost.events( {
	// event for adding post
	'click #create-post-btn' : function ( event, template ) {
		var params = {
			'title'       : template.find( '[name=title]' ).value,
			'description' : template.find( '[name=description]' ).value,
			'fileObjId'   : template.find( '[name=filelocation]' ).value,
			'fileName'    : template.find( '[name=filename]' ).value
		};

		// check inputs
		if ( !$( '#add-post-form' )[ 0 ].checkValidity() ) {
			$( '#add-post-form' ).find( '.alert' ).removeClass( 'hidden' );
			return false;
		}

		Meteor.call( 'addPost', params, function ( err, response ) {
			if ( err ) {
				throw new Error( err );
			} else {
				$( '#add-post-modal' ).modal( 'hide' );

				$( '#add-post-form' ).find( 'input, textarea' ).val( '' );

				if ( !$( '#add-post-form' ).find( '.alert' ).hasClass( 'hidden' ) ) {
					$( '#add-post-form' ).find( '.alert' ).addClass( 'hidden' );
				}

				$( '#add-post-form' )
					.find( 'img.modal-img' )
					.addClass( 'hidden' )
					.attr( 'src', '' );

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

	// change event for uploading photo
	'change input[name=photo]' : function ( ev ) {
		FS.Utility.eachFile( ev, function ( file ) {
			var newFile = new FS.File( file );

			// should be implement in client according to documentation
			// /cfs/files/uploads/ -default cfs storage for files
			Uploads.insert( newFile, function ( err, fileObj ) {
				if ( err ) {
					throw new Error( err );
				} else {
					setTimeout( function () {
						$( 'input[name=filelocation]' ).val( fileObj._id );
						$( 'input[name=filename]' ).val( newFile.original.name );
						$( 'img.modal-img' )
							.removeClass( 'hidden' )
							.attr( 'src', '/cfs/files/uploads/' + fileObj._id );
					}, 1000 );
				}
			} );
		} );
	}
} );
