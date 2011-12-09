Ext.define('TR.view.search.List', {
    extend: 'Ext.Container',
    alias: 'widget.searchlist',
    config: {
        layout: 'fit',
        title: 'Search',
        iconCls: 'search',
        iconMask: true,
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            ui: 'light',
            layout: 'fit',
            items: [{
                xtype: 'textfield',
                placeHolder: 'Search by keywords...'
            }]
        },{
            xtype: 'dataview',
            store: 'Search',
            itemTpl: '<img src="http://src.sencha.io/{[Ext.Viewport.getOrientation()]}/{photo_url}" />'
        }]
    }
});