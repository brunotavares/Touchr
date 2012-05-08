Ext.define('TR.controller.Users', {
    extend: 'Ext.app.Controller',
    config: {
        control: {
            'userlist > toolbar > textfield': {
                change: 'onSearchChange',
                clearicontap: 'onSearchChange'
            }
        }
    },
    
    onSearchChange: function(textfield) {
        var store   = Ext.getStore('Users'),
            value   = Ext.String.trim(textfield.getValue());
            
        if(Ext.isEmpty(value)) {
            store.removeAll();
        } else {
            store.clearFilter(true);
            store.filter('user_name', value);
            store.load();
        }
    }
});