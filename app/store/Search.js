Ext.define('TR.store.Search', {
    extend: 'Ext.data.Store',
    model: 'TR.model.Photo',
    remoteFilter: true,
    proxy: {
        type: 'flickr',
        query: 'search',
        reader: {
            type: 'json',
            successProperty: 'success',
            root: function(data) {
                if (data.error || data.query.count === 0) {
                    return [];
                } else {
                    return data.query.results.photo;
                }
            }
        }
    }
});