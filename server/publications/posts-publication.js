Meteor.publish( 'uploads', function(){
  return Uploads.find();
} );

Meteor.publish( 'posts', function( cursor, search ) {
	var skip   = ( cursor - 1 ) * PAGELIMIT;
	var option = {};
	var sort = { 'updatedAt' : -1 };

	if ( search ) {
		option = { 'title' : new RegExp('\\b(' + search + ')', 'gi') };
		sort = { 'title' : 1, 'updatedAt' : -1 };
	}

  	return Posts.find( option, {
  		sort  : sort,
  		skip  : skip,
  		limit : PAGELIMIT
  	} );
} );
