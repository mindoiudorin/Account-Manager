var JsonActionStatus = { Failed: 0, Success: 1, AccessDenied: 2, ExpiredSession: 3 };

// usage in async function
//await sleep(500);
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// string to bool
function parseBoolean(string) {
    var bool;
    bool = (function () {
        switch (false) {
            case string.toLowerCase() !== 'true':
                return true;
            case string.toLowerCase() !== 'false':
                return false;
        }
    })();
    if (typeof bool === 'boolean') {
        return bool;
    }
    return void 0;
};

//implement datalist and override UI in modern browsers
function beautifyWebshims(element) {
    if ($.webshims) {
        //configure forms features
        element.updatePolyfill();
    }
}

function isFormValid(formId) {
    if (formId.charAt(0) !== '#') {
        formId = '#' + formId;
    }
    return $(formId).valid();
}

//Take input from form
function takeFormInput(formId) {
    if (formId.charAt(0) !== '#') {
        formId = '#' + formId;
    }
    serializedForm = $(formId).serializeArray();
    nameCheckbox = "";
    return serializedForm.reduce(function (obj, item) {
        /////  the checkboxes have 2 input .... somenthing bizare from html helpers
        if (typeof parseBoolean(item.value) === 'boolean' && nameCheckbox == item.name) {
            nameCheckbox = "";
            return obj;
        }
        if (typeof parseBoolean(item.value) === 'boolean') {
            nameCheckbox = item.name;
        }
        /////
        obj[item.name] = item.value;
        return obj;
    }, {});
}

//show modal in a page
function showModal(containerId, modalId, modelView, callingAction, currentAction = 'Index') {
    if (containerId.charAt(0) !== '#') {
        containerId = '#' + containerId;
    }
    if (modalId.charAt(0) !== '#') {
        modalId = '#' + modalId;
    }
    $(containerId).empty();
    var actionAjax = actionUrl.replace(currentAction, callingAction);
    $(containerId).load(actionAjax,
        modelView != null ? { modelView: modelView } : {}, function () {
            $(modalId).modal('show');
            beautifyWebshims($(containerId));
        });
}

function renderPartial(containerId,  modelView, callingAction, currentAction = 'Index') {
    if (containerId.charAt(0) !== '#') {
        containerId = '#' + containerId;
    }
    var actionAjax = actionUrl.replace(currentAction, callingAction);
    $(containerId).load(actionAjax, modelView != null ? { modelView: modelView, __RequestVerificationToken: modelView.__RequestVerificationToken } : {}, function () {
        beautifyWebshims($(containerId));
    });
}

function checkExceptionFor(option) {
    var isOption = $.QueryString[option];
    if (typeof (isOption) != 'undefined' && isOption != null) {
        isOption = parseBoolean(isOption);
        if (isOption) {
            toastr.success('Object ' + option + ' successfully');
        }
        else {
            // To find another method
            var exception = $('#actionError').data('exception');
            toastr.error(exception);
        }
    }
}

(function ($) {
    $.QueryString = (function (a) {
        if (a == '') return {};
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);

function whichTransitionEvent() {
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
    }

    for (t in transitions) {
        if (el.style[t] !== undefined) {
            return transitions[t];
        }
    }
}

window.onload = function () {
    if ($.webshims) {
        $.webshims.setOptions('forms', {
            customDatalist: "auto"
        });
        $.webshims.polyfill('forms');
    }
};

document.onreadystatechange = function (e) {
    if (document.readyState === 'interactive') {
        if (!(typeof sessionStorage.navbarCollapsed === 'undefined')) {
            if (JSON.parse(sessionStorage.navbarCollapsed)) {
                $('.navbar-primary .nav-label').css('transition', 'none').css('display', 'none');
                $('.navbar-primary').css('transition', 'none');
                $('.body-content').css('transition', 'none');

                $('.navbar-primary').addClass('collapsed');
                var iSelector = $('.btn-expand-collapse').find('span:first');
                iSelector.removeClass('glyphicon-menu-left');
                iSelector.addClass('glyphicon-menu-right');
            }
        }
    }
};

$(window).load(function () {
    if (!(typeof sessionStorage.navbarCollapsed === 'undefined')) {
        $('.navbar-primary .nav-label').css('transition', '0.3s');
        $('.navbar-primary').css('transition', '0.3s');
        $('.body-content').css('transition', '0.3s');
    }
});

$(document).ready(function () {

    $('.btn-expand-collapse').click(function (e) {
        var iSelector = $(this).find('span:first');
        if ($('.navbar-primary').hasClass('collapsed')) {
            iSelector.removeClass('glyphicon-menu-right');
            iSelector.addClass('glyphicon-menu-left');
            $('.navbar-primary').one(transitionEvent,
                function (e) {
                    if (!$('.navbar-primary').hasClass('collapsed')) {
                        $('.navbar-primary .nav-label').fadeIn(300).css('display', 'inline');//show('slow');
                    }
                });
            sessionStorage.navbarCollapsed = false;
        }
        else {
            iSelector.removeClass('glyphicon-menu-left');
            iSelector.addClass('glyphicon-menu-right');
            $('.navbar-primary .nav-label').css('display', 'none');
            sessionStorage.navbarCollapsed = true;
        }

        $('.navbar-primary').toggleClass('collapsed');
    });

    $('.navbar-primary-menu .one-toggle').on('click', function (e) {

        var clickedPanel = this;

        $('.navbar-primary-menu .one-toggle').each(function () {
            if (this !== clickedPanel && !$(this).hasClass('collapsed')) {
                $(this).trigger('click');
            }
        });

    });

    $('#smallScreenModal').on('hidden.bs.modal', function () {
        var height = $(window).height();
        var width = $(window).width();
        var small = height < 290 || width < 490;
        if (small) {
            $('#smallScreenModal').modal('show');
        }
    });

    var transitionEvent = whichTransitionEvent();

    //Configure datetimepicker with bootstrap
    
    $(".datePicker").datetimepicker({
        format: 'DD-MM-YYYY HH:mm',
        stepping: 5
    });
    $(".datePicker").on("dp.show", function (e) {
        $(".day").on('click', function () {
            $("a[data-action='togglePicker']").trigger('click');
        });
    });

    $(".datePicker").on("dp.change", function (e) {
        $(".day").on('click', function () {
            $("a[data-action='togglePicker']").trigger('click');
        });
    });
    /*
    //Configure datetimepicker with combodate
    $(".datePicker").combodate({
        maxYear: (new Date()).getFullYear() + 1,
        format: 'DD-MM-YYYY HH:mm',
        minuteStep: 5,
        customClass: 'soflow'
    });*/
});

$(window).resize(function me () {
    var height = $(window).height();
    var width = $(window).width();
    var small = height < 290 || width < 490;
    if (small) {
        $('#smallScreenModal').modal('show');
    }
    else if ($('#smallScreenModal').is(':visible')){

        $('#smallScreenModal').modal('hide');
    }
    return me;
}());



function Login() {
    $('#loginInput').submit();
}
function Register() {
    $('#registerInput').submit();
}

function ChangePassword() {
    $('#changePasswordInput').submit();
}

function ForgotPassword() {
    $('#forgotPasswordInput').submit();
}