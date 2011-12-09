Ext.define('TR.controller.Users', {
    extend: 'Ext.app.Controller',
    stores: ['Users'],
    views: ['user.List'],
    
    init: function() {
        var me = this;
        
        me.control({
            'userlist > toolbar > textfield': {
                change: me.onSearchChange,
                clearicontap: me.onSearchChange
            }
        });
        me.callParent(arguments);
    },
    
    onSearchChange: function(textfield) {
        var store = this.getUsersStore(),
            value = Ext.String.trim(textfield.getValue());
            
        if(Ext.isEmpty(value)) {
            store.removeAll();
        } else {
            store.filters.clear();
            store.filter('user_name', value);
        }
    }
});