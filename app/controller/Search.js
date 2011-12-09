Ext.define('TR.controller.Search', {
    extend: 'Ext.app.Controller',
    stores: ['Search'],
    views: ['search.List'],
    
    init: function() {
        var me = this;
        
        me.control({
            'searchlist > toolbar > textfield': {
                change: me.onSearchChange,
                clearicontap: me.onSearchChange
            }
        });
        me.callParent(arguments);
    },
    
    onSearchChange: function(textfield) {
        var store = this.getSearchStore(),
            value = Ext.String.trim(textfield.getValue());
            
        if(Ext.isEmpty(value)) {
            store.removeAll();
        } else {
            store.filters.clear();
            store.filter('query', value);
        }
    }
});