$(function(){



  let navHeight = $('.head').outerHeight();
	$(window).on('load scroll', function(){
		//ヘッダー固定
		let value = $(this).scrollTop();
		if(navHeight < value){
			$('.head').addClass('is-fixed');
		} else {
			$('.head').removeClass('is-fixed');
		}

	});


//form vallidation
  $('#contactform .required').on('blur', function(){
		var value = $(this).val();
		var name = $(this).attr('name');
		var id = $(this).attr('id');
		var type = $(this).attr('type');
		var pattern = $(this).attr('pattern');
		var str;

		if(value === ""){//未入力
			str = name + 'を入力してください。';
			$(this).next('.error').children('.invalid').text(str).css('display', 'inline-block');


		} else {//入力されている

			if(type === 'email' || type === 'tel'){
				value = value.replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(s){
					return String.fromCharCode(s.charCodeAt(0)-0xFEE0);
				});
				$(this).val(value);

				//pattern maching
				if(pattern){
					if(!value.match(pattern)){
						str = name + 'の形式が正しくありません。';
						$(this).next('.error').children('.invalid').text(str).css('display', 'inline-block');

					} else { //pattern　が合致している

						if(id === 'email2'){//email2の場合
							var mail1 = $('#email').val();
							if(value !== mail1){
								str = 'メールアドレスが一致していません。';
								$(this).next('.error').children('.invalid').text(str).css('display', 'inline-block');
							} else {
								$(this).next('.error').children('.invalid').css('display', 'none');
							}
						} else {
							$(this).next('.error').children('.invalid').css('display', 'none');
						}
					}
				} else { //pattern　が設定されていない
					$(this).next('.error').children('.invalid').css('display', 'none');
				}

			} else {//type tel email 以外
				$(this).next('.error').children('.invalid').css('display', 'none');
			}
		}
	});

  /* smooth scrole */
  $('a[href^="#"]').on('click',function(){
  	let speed = 500;
  	let href= $(this).attr("href");
  	let target = $(href == "#" || href == "" ? 'html' : href);
  	let position = target.offset().top;
  	$("html, body").animate({scrollTop:position}, speed, "swing");
  	return false;
  });

  /* device orientation change */
  $(window).on('orientationchange', function() {
    location.reload();
  });

});
