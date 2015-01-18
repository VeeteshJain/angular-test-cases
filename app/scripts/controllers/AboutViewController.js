define(['app'], function(app)
{



    (function ( $ ) {
        var onOffButton = function(element, operation, options){
            this.$element = $(element);
            this.options = $.extend({}, $.fn.onOffButton.defaults, options);
            if(operation && operation.doAction === 'init'){
                this.init();
            }
        }
        onOffButton.prototype = {
            'constructor': onOffButton,
            'init': function(){
                var data = this.$element.data();
                this.options = $.extend(this.options, data);
                this.toggleOnOff({'doAction': 'refresh'});
            },
            'destroy': function(){
                $(document).off('click.onOffButton', '[data-toggle^=onoff]');
            },
            'toggleOnOff': function(options){
                var data = this.$element.data();
                if(options.doAction === 'toggle' && !this.options.isDisabled){
                    this.options.isActive = !this.options.isActive;
                    this.options.isInactive = !this.options.isInactive;
                }else if(options.doAction === 'disabled'){
                    this.options.isActive = false;
                    this.options.isInactive = true;
                    this.options.isDisabled = true;
                }else if(options.doAction === 'enableIt'){
                    this.options.isActive = false;
                    this.options.isInactive = true;
                    this.options.isDisabled = false;
                }else if(options.doAction === 'refresh'){
                    //do nothing and let it be refresh
                }
                if(data.onoffDisabled && this.options.isDisabled){
                    this.$element.toggleClass(data.onoffDisabled, this.options.isDisabled);
                    this.$element.attr({'disabled': 'disabled'});
                }else if(!this.options.isDisabled){
                    this.$element.toggleClass(data.onoffDisabled, this.options.isDisabled);
                    this.$element.removeProp('disabled');
                    this.$element.removeAttr('disabled');
                    data.isDisabled = this.options.isDisabled;
                }
                if(data.onoffActive){
                    this.$element.toggleClass(data.onoffActive, this.options.isActive);
                }
                if(data.onoffInactive){
                    this.$element.toggleClass(data.onoffInactive, this.options.isInactive);
                }
                this.$element.val(this.options.isActive);
                this.$element.trigger('change.onOffButton');
            }
        };
        $.fn.onOffButton = function (option) {
            this.each(function () {
                var $this = $(this),
                data = $this.data();
                if (data && !data.onOffButton){
                    $this.data('onOffButton', new onOffButton(this, option));
                }
                if (option.doAction !== 'init') {
                    data.onOffButton.toggleOnOff(option);
                };
            });
            return this;
        }
        $.fn.onOffButton.defaults = {
            'isActive': false,
            'isInactive': true,
            'isDisabled': false
        };
        $.fn.onOffButton.Constructor = onOffButton;
        $(document).on('click.onOffButton', '[data-toggle^=onoff]', function (e) {
            var $onOffButton = $(e.target);
            $onOffButton.onOffButton({'doAction':'toggle'});
        });
    }( jQuery ));

$(document).on('click', '.init-all', function (e) {
    $('.js-field-options button').onOffButton({'doAction':'init'});
});

$(document).on('click', '.disable-by-button', function (e) {
    $('.js-field-options button').onOffButton({'doAction':'disabled'});
});

$(document).on('click', '.enable-it-by-button', function (e) {
    $('.js-field-options button').onOffButton({'doAction':'enableIt'});
});

$(document).on('click', '.toggle-from-outside', function (e) {
    $('.js-field-options button').onOffButton({'doAction':'toggle'});
});

/*$(document).on('change.onOffButton', '.js-field-options', function (e) {
    var $onOffButton = $(e.target);
    console.log(e.target.name+' '+$onOffButton.val());
});*/

/*$(document).on('setData.onOffButton', function (e) {
    debugger;
    var $onOffButton = $(e.target);
    console.log(e.target.name+' '+$onOffButton.val());
});*/

app.directive('multichoice',function(){
    debugger;
});
app.controller('AboutViewController',
    [
    '$scope',

    function($scope)
    {
        $scope.page =
        {
            heading: 'About Us'
        };
    }
    ]);
app.controller('tableCtrl', ['$scope', function($scope){
    var cellTemplate = {
        'defaultTemplate':'<form>'+
        '<div class="row.entity.firstName form-group">'+
        '<label data-ng-bind="row.entity.firstName.field_name">Email address</label>'+
        '<input ng-attr-type="{{row.entity.firstName.field_type}}" class="form-control" data-ng-attr-value="{{row.entity.firstName.default_value}}" data-ng-model="row.entity.firstName.value">'+
        '<label data-ng-bind="row.entity.firstName.field_type">Email address</label>'+
        '</div>'+
        '</form>'
    };
    var rowTemplate = {
        'defaultTemplate': '<div style="background-color: aquamarine" ng-click="getExternalScopes().fnOne(row)" ng-repeat="col in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ui-grid-cell></div>'
    };
    $scope.repositionTable = function(){
        debugger;
        $scope.gridStyle = {
            'width': '800px',
            'height': '250px'
        };
    };
    $scope.gridStyle = {
        'width': '800px',
        'height': '250px'
    };
    $scope.myColumnDefs = [
    {
        "name":"firstName",
        'field': 'firstName',
        'cellTemplate': cellTemplate.defaultTemplate
    },
    {"name":"lastName"},
    {"name":"company"},
    {"name":"employed"}
    ];
    $scope.myData = [
    {
        "firstName": {
            'field_name':'countries',
            'field_type':'checkbox',
            'default_value':'test'
                //'value':'test',
            },
            "lastName": "Carney",
            "company": "Enormo",
            "employed": true
        },
        {
            "firstName": "Lorraine",
            "lastName": "Wise",
            "company": "Comveyer",
            "employed": false
        },
        {
            "firstName": "Nancy",
            "lastName": "Waters",
            "company": "Fuelton",
            "employed": false
        }];
        $scope.gridOpts = {
            'data': $scope.myData,
            'columnDefs': $scope.myColumnDefs,
            'rowTemplate': rowTemplate.defaultTemplate,
            'rowHeight': '50'
        };

        $scope.rowModel = function(){
            return{
                'test':function(){
                    debugger;
                }
            }
        }
    }])
});
