var verifyEmail = false;

$(document).ready(function () {
    verifyEmail = $.QueryString['verifyEmail'];
    window.history.replaceState({}, document.title, window.location.pathname);
    if (verifyEmail) {
        toastr.success('Verify your Email');
    }
});