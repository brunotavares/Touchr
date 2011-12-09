/*
Copyright(c) 2011 Company Name
*/
Ext.define('Ext.data.proxy.TRusic', {
    extend: 'Ext.data.proxy.JsonP',
    requires: ['Ext.XTemplate'],
    
    autoAppendParams: false,
    url: 'http://query.yahooapis.com/v1/public/yql',
    
    queries: {
        newReleases: Ext.create('Ext.XTemplate', [
            'select * from music.release.popular'
        ]),
        
        popular: Ext.create('Ext.XTemplate', [
            'select * from music.track.popular'
        ]),
        
        artists: Ext.create('Ext.XTemplate', [
            'select * from music.artist.search where keyword="{artist}"'
        ]),
    },
    
    buildRequest: function(operation) {
        var me = this,
            request = me.callParent(arguments),
            queryTpl = me.queries[me.query],
            filters = operation.filters || [],
            filterData = {};
        
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
Ext.define('TR.view.Viewport', {
    extend: 'Ext.tab.Panel',
    config: {
        fullscreen: true,
        items: [{
            xtype: 'releaselist'
        },{
            xtype: 'popularlist'
        },{
            xtype: 'artistslist'
        }]
    }
});
Ext.define('TR.view.ReleaseList', {
    extend: 'Ext.dataview.List',
    alias: 'widget.releaselist',
    config: {
        title: 'New Releases',
        store: 'Releases',
        itemTpl: new Ext.XTemplate(
            '<div class="release">{[this.getAutoIndex()]}. {artist} - {title}</div>', 
            {
                getAutoIndex: function() {
                    this.autoIndex = this.autoIndex||1;
                    return this.autoIndex++;
                }
            }
        )
    }
});
Ext.define('TR.view.PopularList', {
    extend: 'Ext.dataview.List',
    alias: 'widget.popularlist',
    config: {
        title: 'Popular',
        store: 'Populars',
        itemTpl: new Ext.XTemplate(
            '<div class="release">{[this.getAutoIndex()]}. {artist} - {title}</div>', 
            {
                getAutoIndex: function() {
                    this.autoIndex = this.autoIndex||1;
                    return this.autoIndex++;
                }
            }
        )
    }
});
Ext.define('TR.view.ArtistsList', {
    extend: 'Ext.Container',
    alias: 'widget.artistslist',
    config: {
        layout: 'fit',
        title: 'Artists',
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            ui: 'light',
            layout: 'fit',
            items: [{
                xtype: 'textfield',
                placeHolder: 'Search...'
            }]
        },{
            xtype: 'list',
            store: 'Artists',
            itemTpl: '{name}',
        }]
    }
});
Ext.define('TR.model.Track', {
    extend: 'Ext.data.Model',
    fields: [
        'id', 
        'title',
        'url',
        {name: 'artist', mapping: 'Artist.name'}
    ]
});

Ext.define('TR.model.Artist', {
    extend: 'Ext.data.Model',
    fields: [
        'id', 
        'name',
        'url'
    ]
});

Ext.define('TR.store.Releases', {
    extend: 'Ext.data.Store',
    model: 'TR.model.Track',
    autoLoad: true,
    proxy: {
        type: 'flickr',
        query: 'newReleases',
        reader: {
            type: 'json',
            successProperty: 'success',
            root: function(data) {
                if (data.error || data.query.count === 0) {
                    return [];
                } else {
                    return data.query.results.Release;
                }
            }
        }
    }
});
Ext.define('TR.store.Populars', {
    extend: 'Ext.data.Store',
    model: 'TR.model.Track',
    autoLoad: true,
    proxy: {
        type: 'flickr',
        query: 'popular',
        reader: {
            type: 'json',
            successProperty: 'success',
            root: function(data) {
                if (data.error || data.query.count === 0) {
                    return [];
                } else {
                    return data.query.results.Track;
                }
            }
        }
    }
});
Ext.define('TR.store.Artists', {
    extend: 'Ext.data.Store',
    model: 'TR.model.Artist',
    remoteFilter: true,
    proxy: {
        type: 'flickr',
        query: 'artists',
        reader: {
            type: 'json',
            successProperty: 'success',
            root: function(data) {
                if (data.error || data.query.count === 0) {
                    return [];
                } else {
                    return data.query.results.Artist;
                }
            }
        }
    }
});
Ext.define('TR.controller.Main', {
    extend: 'Ext.app.Controller',
    stores: ['Releases', 'Populars', 'Artists'],
    views: ['Viewport', 'ReleaseList', 'PopularList', 'ArtistsList'],
    
    init: function() {
        var me = this;
        
        me.control({
            'artistslist > toolbar > textfield': {
                change: me.onArtistSearchChange,
                clearicontap: me.onArtistSearchChange
            },
            'releaselist': {
                select: me.onItemWithUrlTap
            },
            'popularlist': {
                select: me.onItemWithUrlTap
            },
            'artists list': {
                select: me.onItemWithUrlTap
            }
        });
        me.callParent(arguments);
    },
    
    onArtistSearchChange: function(textfield) {
        var store = this.getArtistsStore(),
            value = Ext.String.trim(textfield.getValue());
            
        if(Ext.isEmpty(value)) {
            store.removeAll();
        } else {
            store.clearFilter();
            store.filter('artist', value);
        }
    },
    
    onItemWithUrlTap: function(list, track) {
        window.open(track.get('url'));
    }
});




