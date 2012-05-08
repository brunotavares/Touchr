Ext.define('TR.store.FeaturedPhotos', {
    extend: 'Ext.data.Store',
    config: {
        model: 'TR.model.Photo',
        autoLoad: true,
        remoteFilter: true,
        proxy: {
            type: 'flickr',
            query: 'featured',
            reader: {
                type: 'json',
                successProperty: 'success',
                rootProperty: function(data) {
                    if (data.error || data.query.count === 0) {
                        return [];
                    } else {
                        return data.query.results.photo;
                    }
                }
            }
        }
    }
});