/*!
 * jQuery Validation Bootstrap Tooltip extention v0.4
 *
 * https://github.com/Thrilleratplay/jQuery-Validation-Bootstrap-tooltip
 *
 * Copyright 2014 Tom Hiller
 * Released under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * add class .has-error on the parent element 
 * add the case when the input is :hidden
 */
(function ($) {
    $.extend(true, $.validator, {
        prototype: {
            defaultShowErrors: function () {
                var self = this;
                $.each(this.successList, function (index, value) {
                    var $el = $(value);
                    if ($el.is(":visible"))
                        $el.removeClass(self.settings.errorClass).addClass(self.settings.validClass).tooltip('destroy');
                    else
                        $el.parent().removeClass(self.settings.errorClass).addClass(self.settings.validClass).tooltip('destroy');
                    
                    $el.parent().removeClass(self.settings.errorClass);
                });
                $.each(this.errorList, function (index, value) {
                    var $el = $(value.element);
                    if ($el.is(":visible"))
                        $el.removeClass(self.settings.validClass).addClass(self.settings.errorClass).tooltip('destroy').tooltip(self.apply_tooltip_options(value.element, value.message)).tooltip('show');
                    else
                        $el.parent().removeClass(self.settings.validClass).addClass(self.settings.errorClass).tooltip('destroy').tooltip(self.apply_tooltip_options(value.element, value.message)).tooltip('show');
                   
                    $el.parent().addClass(self.settings.errorClass);    // Modif PLI
                });
            },

            apply_tooltip_options: function (element, message) {
                var data = $(element).data();
                var defaut = {
                    /* Using Twitter Bootstrap Defaults if no settings are given */
                    animation: true,
                    html: false,
                    placement: 'top',
                    selector: true,
                    title: message,
                    delay: 0,
                    container: false

                };
                data.trigger = $.trim('manual ' + (data.trigger || ''));

                var options = $.extend({}, defaut, data);

                if (this.settings.tooltip_options && this.settings.tooltip_options[element.name]) {
                    $.extend(options, this.settings.tooltip_options[element.name]);
                }
                return options;
            }
        }
    });
} (jQuery));
