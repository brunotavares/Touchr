//<debug>
Ext.Loader.setPath({
    'Ext': 'sdk/src',
    'Ext.data.proxy.Flickr': 'lib/FlickrProxy.js'
});
//</debug>

Ext.ClassManager.setAlias('Ext.data.proxy.Flickr', 'proxy.flickr');

Ext.application({
    name: 'TR',
    requires: ['Ext.data.proxy.Flickr'],
    stores: [
        'FeaturedPhotos',
        'Search',
        'UserPhotos'
    ],
    models: [
        'Photo'
    ],
    controllers: [
        'Search',
        'UserPhotos'
    ],
    views: [
        'featured.List',
        'Main', 
        'search.List',
        'user.List'
    ],

    icon: {
        57: 'resources/icons/Icon.png',
        72: 'resources/icons/Icon~ipad.png',
        114: 'resources/icons/Icon@2x.png',
        144: 'resources/icons/Icon~ipad@2x.png'
    },
    
    phoneStartupScreen: 'resources/loading/Homescreen.jpg',
    tabletStartupScreen: 'resources/loading/Homescreen~ipad.jpg',

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('TR.view.Main'));
    },

    onUpdated: function() {
        window.location.reload();
    }
});