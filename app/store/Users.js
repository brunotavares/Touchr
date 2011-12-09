Ext.define('TR.store.Users', {
    extend: 'Ext.data.Store',
    model: 'TR.model.Photo',
    remoteFilter: true,
    proxy: {
        type: 'flickr',
        query: 'photoByUser',
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