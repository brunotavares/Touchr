Ext.define('TR.view.user.List', {
    extend: 'Ext.Container',
    alias: 'widget.userlist',
    config: {
        layout: 'fit',
        title: 'Users',
        iconCls: 'user',
        iconMask: true,
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            ui: 'light',
            layout: 'fit',
            items: [{
                xtype: 'textfield',
                placeHolder: 'Search by user name...'
            }]
        },{
            xtype: 'dataview',
            store: 'Users',
            itemTpl: '<img src="http://src.sencha.io/{[Ext.Viewport.getOrientation()]}/{photo_url}" />'
        }]
    }
});