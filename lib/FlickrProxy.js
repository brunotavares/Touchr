Ext.define('Ext.data.proxy.Flickr', {
    extend: 'Ext.data.proxy.JsonP',
    requires: ['Ext.XTemplate'],
    apiKey: 'fa506cef10772542a871ec26351defbd',
    
    autoAppendParams: false,
    url: 'http://query.yahooapis.com/v1/public/yql',
    
    queries: {
        featured: Ext.create('Ext.XTemplate', [
            'select * from flickr.photos.interestingness(20) where api_key="{api_key}"'
        ]),
        
        search: Ext.create('Ext.XTemplate', [
            'select * from flickr.photos.search where text="{query}" and api_key="{api_key}"'
        ]),
        
        photoByUser: Ext.create('Ext.XTemplate', [
            'SELECT * FROM flickr.people.publicphotos(0,20) WHERE user_id in ',
            '(SELECT id FROM flickr.people.findbyusername WHERE username="{user_name}" and api_key="{api_key}")',
            ' and api_key="{api_key}"'
        ])
    },
    
    buildRequest: function(operation) {
        var me = this,
            request = me.callParent(arguments),
            queryTpl = me.queries[me.query],
            filters = operation.filters || [],
            filterData = {api_key: this.apiKey};
        
        Ext.iterate(filters, function(filter) {
            filterData[filter.property] = filter.value;
        });
        
        delete request.params.filters;
        
        Ext.applyIf(request.params, {
            format: 'json',
            q: queryTpl.applyTemplate(filterData)
        });
        
        request.url = Ext.urlAppend(request.url, Ext.urlEncode(request.params));
        return request;
    }
});

