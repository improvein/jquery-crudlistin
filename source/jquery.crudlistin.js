//CRUD Listin plugin
(function ($) {

    var methods = {
        init: function (options) {
            var settings = $.extend({
                // Settings defaults
                listSelector: '.crud-listin',
                newButton: null,
                newItemLast: true
            }, options);

            return this.each(function (index, element) {
                crudList = $(element);

                if (settings.newButton === null) {
                    var newButton = $('<a></a>')
                            .attr('href', '#')
                            .addClass('btn btn-default new-item-btn')
                            .append($('<i></i>').addClass('fa fa-plus'));
                    crudList.append(newButton);

                    settings.newButton = newButton;
                }

                // count the current form inputs we have (e.g. 2), use that as the new
                // index when inserting a new item (e.g. 2)
                crudList.data('index', crudList.find('.crud-item').length);

                //remove all datepickers in prototype to avoid problems
                crudList.find('.item-prototype input.datepicker').each(function (index, element) {
                    $(element).datepicker('destroy');
                });

                //click on the "New" button
                settings.newButton.click(function (e) {
                    var currentCList = $(this).closest(settings.listSelector);
                    //addNew(currentCList);
                    addNew(crudList, settings.newItemLast);
                    return false;
                });
                
                //click on the "Delete" button
                prepareDeleteButton(crudList.find('.delete-item-btn'));
            });
        },
        addnew: function () {
            return this.each(function (index, element) {
                crudList = $(element);
                addNew(crudList, settings.newItemLast);
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


    function addNew(crudList, newItemLast) {
        // Get the data-prototype explained earlier
        var prototype = crudList.data('prototype');
        // get the new index
        var index = crudList.data('index');

        // Replace '__name__' in the prototype's HTML to
        // instead be a number based on how many items we have
        var newForm = prototype.replace(/__name__/g, index);

        // increase the index with one for the next item
        crudList.data('index', index + 1);

        // Display the form in the page in an li, before the "Add a tag" link li
        //var newItem = $('<div></div>').addClass('crud-item').append(newForm);
        var newItem = $(newForm);

        // add a delete link to the new form (if it not exist)
        //addTagFormDeleteLink(newItem);
        if (newItem.find('.delete-item-btn').length == 0) {
            newItem.append('<a href="#" class="delete-item-btn">x</a>');
        }

        if (newItemLast) {
            crudList.append(newItem);
        } else {
            crudList.prepend(newItem);
        }

        // handle the removal
        prepareDeleteButton(newItem.find('.delete-item-btn'));
    }

    function prepareDeleteButton(button) {
        $(button).click(function (e) {
            e.preventDefault();
            $(this).closest('.crud-item').remove();
            return false;
        });
    }

}(jQuery));