Ext.define('TR.store.Users', {
    extend: 'Ext.data.Store',
    config: {
        model: 'TR.model.Photo',
        remoteFilter: true,
        proxy: {
            type: 'flickr',
            query: 'photoByUser',
            reader: {
                type: 'json',
                rootProperty: 'query.results.photo'
            }
        }
    }
});