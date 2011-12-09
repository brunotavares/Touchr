Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.data.proxy.Flickr', 'lib/FlickrProxy.js');
Ext.ClassManager.setAlias('Ext.data.proxy.Flickr', 'proxy.flickr');

Ext.require([
    'Ext.data.proxy.Flickr',
    'Ext.XTemplate',
    'Ext.field.Text'
]);

Ext.application({
    name: 'TR',
    controllers: ['Main', 'Featured', 'Search', 'Users'],
    models: ['Photo'],
    launch: function() {
        Ext.create('TR.view.Viewport');
    }
});