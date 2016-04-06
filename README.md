# jQuery CRUDListin

jQuery plugin to enable dynamic CRUD list to add/remove/edit elements in a dynamic list and/or table.

## Install

### Bower
Run this command:
```
$ bower install jquery-crudlistin
```

### Manual
Just copy the file from "dist" into your project

## How to use
This is how you activate the plugin, providing that your list container element has the class *.crud-listin*:
```javascript
$('.crud-listin').crudlistin({
  newButton: $('#list-add-btn')
});
```

## Options
These are all the default options:
```javascript
$('.crud-listin').crudlistin({
  newButton: null,
  removeButtonSelector: '.delete-item-btn',
  newItemLast: true,
  itemClass: 'crud-item',
  itemIndexPlaceholder: /__name__/g,
  beforeAddElement: function() {},
  afterAddElement: function(newItem) {},
  beforeRemoveElement: function() {},
  afterRemoveElement: function() {}
});
```

- newButton: the "Add" or "New" button which click will add a new element
- itemClass: class to identify an element from the list
- removeButtonSelector: selector to identify the "Remove" button.
- newItemLast: indicates whether add new items at the end of the list (*true*) or at the beginning (*false*)
- itemIndexPlaceholder: placeholder, inside the prototype, where the list index should be. It will be replaced by the index number for the corresponding element when adding

### Events
- beforeAddElement: fires before adding the element. Return *false* to cancel.
- afterAddElement: fires after adding the element. *newItem* is the item being added.
- beforeRemoveElement: fires before removing the element. Return *false* to cancel.
- afterRemoveElement: fires after removing the element.
