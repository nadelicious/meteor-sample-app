Template.post.events( {
	// show edit modal
	'click .show-edit-post-modal-btn' : function ( event, template ) {
		$( '#edit-post-modal' ).modal();

		$( '#edit-post-modal form' ).find( '[name=title]' ).val( template.data.title );
		$( '#edit-post-modal form' ).find( '[name=description]' ).val( template.data.description );
		$( '#edit-post-modal form' ).find( 'img.modal-img' ).attr( 'src', template.data.fileLocation );
		$( '#edit-post-modal form' ).find( '[name=id]' ).val( template.data._id );
	},

	// show delete modal
	'click .show-delete-post-modal-btn' : function ( event, template ) {
		$( '#delete-post-modal' ).modal();
		$( '#delete-post-modal form' ).find( '[name=id]' ).val( template.data._id );
	}
} );
