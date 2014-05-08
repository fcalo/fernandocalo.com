// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
};

$(function(){	
	$("#send_contact").click(function(){
		mandatory_keys = ["email", "msg"]
		params_keys = ["name", "email", "msg"]
		
		var error = false;
		
		for(i in mandatory_keys){
			k = mandatory_keys[i];
			if ($("#" + k).val() == ""){
				$("#" + k).parent().parent().addClass("has-error");
				error = true;
			}else{
				$("#" + k).parent().parent().removeClass("has-error");
			}
		}
		if (!isValidEmailAddress($("#email").val())){
			$("#email").parent().parent().addClass("has-error");
			error = true;
		}
		
		if (!error){
			params = Object()
			for(i in params_keys){
				k = params_keys[i];
				params[k] = $("#" + k).val();
			}
			
			 $.ajax({
					data:  params,
					url:   'assets/mail.php',
					type:  'post',
					dataType: 'json',
					beforeSend: function () {
							$("#resultado").html("Procesando, espere por favor...");
					},
					success:  function (response) {
						$("#alert").html('<div class="alert alert-success"><a href="#" class="close" data-dismiss="alert">&times;</a><span></span></div>');
						$("#alert .alert span").html(response['info']);
						$("#alert .alert").removeClass("alert-success");
						$("#alert .alert").removeClass("alert-danger");
						if (response['ok']){
							$("#alert .alert").addClass("alert-success");
						}else{
							$("#alert .alert").addClass("alert-danger");
						}
						$("#alert").show();
					}
			});
		}

	});
	

	
});
