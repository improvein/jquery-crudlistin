/*! jQuery CRUD Listin - v1.2.5 - 2016-06-03
 * https://github.com/improvein/jquery-crudlistin
 * Improve-in */

(function ($) {

    var methods = {
        init: function (options) {
            var settings = $.extend($.fn.crudlistin.defaults, options);

            return this.each(function (index, element) {
                var crudList = $(element);

                /*
                 if (settings.newButton === null) {
                 var newButton = $('<a></a>')
                 .attr('href', '#')
                 .addClass('btn btn-default new-item-btn')
                 .append($('<i></i>').addClass('fa fa-plus'));
                 crudList.append(newButton);
                 
                 settings.newButton = newButton;
                 }
                 */

                // count the current form inputs we have (e.g. 2), use that as the new
                // index when inserting a new item (e.g. 2)
                crudList.data('index', crudList.find('.crud-item').length);

                //click on the "New" button
                settings.newButton.click(function (e) {
                    //var currentCList = $(this).closest(settings.listSelector);
                    //addNew(crudList, settings.newItemLast, settings);
                    addNew(crudList, settings.newItemLast, settings);
                    return false;
                });

                //click on the "Delete" button
                prepareDeleteButton(crudList, crudList.find(settings.removeButtonSelector), settings);
            });
        },
        addnew: function () {
            return this.each(function (index, element) {
                var crudList = $(element);
                addNew(crudList, settings.newItemLast, settings);
            });
        } // add new element
    };

    //---- Main method for the plugin
    $.fn.crudlistin = function (methodOrOptions) {
        if (methods[methodOrOptions]) {
            return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            // Default to "init"
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + methodOrOptions + ' does not exist on CRUDListin');
        }
    };
    //---- Default settings
    $.fn.crudlistin.defaults = {
        newButton: null,
        removeButtonSelector: '.delete-item-btn',
        newItemLast: true,
        itemClass: 'crud-item',
        itemIndexPlaceholder: /__name__/g,
        beforeAddElement: function () {},
        afterAddElement: function (newItem) {},
        beforeRemoveElement: function (item) {},
        afterRemoveElement: function () {}
    };


    //---- Auxiliar internal methods
    function addNew(crudList, newItemLast, settings) {
        //Event: before add
        var beforeAddResult = true;
        beforeAddResult = settings.beforeAddElement.call();
        if (beforeAddResult === false)
            return;

        // Get the data-prototype explained earlier
        var prototype = crudList.data('prototype');
        // get the new index
        var index = crudList.data('index');

        // Replace '__name__' in the prototype's HTML to
        // instead be a number based on how many items we have
        //var newForm = prototype.replace(/__name__/g, index);
        var newForm = prototype.replace(settings.itemIndexPlaceholder, index);

        // increase the index with one for the next item
        crudList.data('index', index + 1);

        // Display the form in the page in an li, before the "Add a tag" link li
        //var newItem = $('<div></div>').addClass('crud-item').append(newForm);
        var newItem = $(newForm);

        /* // add a delete link to the new form (if it not exist)
         if (newItem.find('.delete-item-btn').length == 0) {
         newItem.append('<a href="#" class="delete-item-btn">x</a>');
         }*/

        if (newItemLast) {
            crudList.append(newItem);
        } else {
            crudList.prepend(newItem);
        }

        // handle the removal
        prepareDeleteButton(crudList, newItem.find(settings.removeButtonSelector), settings);

        //Event: after add
        settings.afterAddElement.call(crudList, newItem);
    }

    function prepareDeleteButton(crudList, button, settings) {
        $(button).click(function (e) {
            e.preventDefault();

			var item = $(this).closest('.' + settings.itemClass.replace(' ', '.'));
			
            //Event: before remove
            var beforeRemoveResult = true;
            beforeRemoveResult = settings.beforeRemoveElement.call(crudList, item);
            if (beforeRemoveResult !== false) {
                //do remove
                item.remove();
            }

            //Event: after remove
            settings.afterRemoveElement.call();

            return false;
        });
    }

}(jQuery));