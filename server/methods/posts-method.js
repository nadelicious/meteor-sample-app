Meteor.methods( {
	'addPost' : function ( params ) {
		Posts.insert( {
			'title'        : params.title,
			'description'  : params.description,
			'creatorName'  : Meteor.user().username || Meteor.user().profile.name,
			'creator'      : Meteor.user()._id,
			'fileLocation' : '/cfs/files/uploads/' + params.fileObjId,
			'fileName'     : params.fileName,
			'createdAt'    : new Date(),
			'updatedAt'    : new Date()
			}, function ( err, data ) {
				if ( err ) {
					throw new Error( 'Failed to insert.' );
				}
		} );
	},

	'editPost' : function ( params ) {
		var  obj = {
			'title'        : params.title,
			'description'  : params.description,
			'creatorName'  : Meteor.user().username || Meteor.user().profile.name,
			'fileLocation' : '/cfs/files/uploads/' + params.fileObjId,
			'fileName'     : params.fileName,
			'updatedAt'    : new Date()
		};

		if ( !params.fileName ) {
			delete obj.fileLocation;
			delete obj.fileName;
		}

		Posts.update(
			{ _id : params._id },
			{ $set : obj
		}, function ( err )  {
			if ( err ) {
				throw new Error( 'Failed to edit.' );
			}
		} );
	},

	'deletePost' : function ( id ) {
		Posts.remove(
			{ _id : id }, function ( err )  {
			if ( err ) {
				throw new Error( 'Failed to delete.' );
			}
		} );
	},

	'getPages' : function ( search ) {
		var option = {};

		if ( search ) {
			option = { 'title' : new RegExp('\\b(' + search + ')', 'gi') };
		}
		var count   = Posts.find( option ).count();
		var pages   = Math.ceil( count / PAGELIMIT );
		var noPages = [ ];

		for( var i=1; i<=pages; i++ ) {
			noPages.push( i );
		}
		return noPages;
	}

} );

