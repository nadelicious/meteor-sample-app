// set storage adaptor
var uploadStore = new FS.Store.FileSystem( 'uploads' );

// set file collection and options
Uploads = new FS.Collection( 'uploads', {
  'useHTTP'     : true,
  'httpHeaders' : [
    [ 'Cache-Control', 'public, max-age=31536000' ]
  ],

  'stores' : [ uploadStore ],
  'filter' : {
  		'allow' : {
  	  		'contentTypes' : [ 'image/*' ],
          'extensions'   : [ 'png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG', 'gif', 'GIF' ]
  		}
  }
} );

// allow config
Uploads.allow( {
  insert   : function () {
    return true;
  },
  update   : function () {
    return true;
  },
  remove   : function () {
    return true;
  },
  download : function () {
    return true;
  }
} );

// deny config
Uploads.deny( {
  insert   : function () {
    return false;
  },
  update   : function () {
    return false;
  },
  remove   : function () {
    return false;
  },
  download : function () {
    return false;
  }
} );

