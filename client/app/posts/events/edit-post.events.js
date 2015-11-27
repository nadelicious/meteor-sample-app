Template.editpost.events( {
	// edit post event
	'click #edit-post-btn' : function ( event, template ) {
		var params = {
			'title'       : template.find( '[name=title]' ).value,
			'description' : template.find( '[name=description]' ).value,
			'_id'         : template.find( '[name=id]' ).value,
			'fileObjId'   : template.find( '[name=filelocation]' ).value,
			'fileName'    : template.find( '[name=filename]' ).value,
		};

		// check inputs
		if ( !$( '#edit-post-form' )[ 0 ].checkValidity() ) {
			$( '#edit-post-form' ).find( '.alert' ).removeClass( 'hidden' );
			return false;
		}

		// call edit post method
		Meteor.call( 'editPost', params, function ( err, response ) {
			if ( err ) {
				throw new Error( err );
			} else {
				$( '#edit-post-modal' ).modal( 'hide' );
				$( '#edit-post-form' ).find( 'input, textarea' ).val( '' );
				$( '#edit-post-form' ).find( 'img.modal-img' ).attr( 'src', '' );

				if ( !$( '#edit-post-form' ).find( '.alert' ).hasClass( 'hidden' ) ) {
					$( '#edit-post-form' ).find( '.alert' ).addClass( 'hidden' );
				}
			}
		} );
	},

	//event for uploading photo
	'change input[name=photo]' : function ( ev ) {
		FS.Utility.eachFile( ev, function ( file ) {
			var newFile = new FS.File( file );

			// should be implement in client according to documentation
			// /cfs/files/uploads/ -default cfs storage for files
			Uploads.insert( newFile, function ( err, fileObj ) {
				if ( err ) {
					throw new Error( err );
				} else {
					// add little delay
					setTimeout( function () {
						$( ev.currentTarget )
							.siblings( 'input[name=filelocation]' )
							.val( fileObj._id );
						$( ev.currentTarget )
							.siblings( 'input[name=filename]' )
							.val( newFile.original.name );

						$( ev.currentTarget )
							.siblings( 'div.text-center' )
							.children( 'img' )
							.attr( 'src', '/cfs/files/uploads/' + fileObj._id );
					}, 1000 );
				}
			} );
		} );
	}

} );

