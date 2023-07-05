$("#id").focusout(function(){

 if($('#id').val() == ""){
    $('#check').text('아이디를 입력해주세요.');
    $('#check').css('color', '#6A24FE');

 }else{
     $('#check').hide();
 }
 });

$("#pass").focusout(function(){
 if($('#pass').val() == ""){
    $('#check').text('비밀번호를 입력해주세요');
    $('#check').css('color', '#6A24FE');
 }else{
     $('#check').hide();
 }
 });


//비밀번호 재확인 코드
$(function(){
    $("#alert-success").hide();
    $("#alert-danger").hide();
    $("input").keyup(function(){
        let pwd1 = $("#password1").val();
        let pwd2 = $("#password2").val();
        if(pwd1 !== "" || pwd2 != ""){
            if(pwd1 == pwd2){
                $("#alert-success").show();
                $("#alert-danger").hide();
                $("#submit").removeAttr("disabled");
            }
            else{
                $("#alert-success").hide();
                $("#alert-danger").show();
                $("#submit").attr("disabled", "disabled");
            }
        }
    });
});
//이메일 중복체크
var emoverChk = false;
	$("#emoverlay").click(function(){
		var email = $("#email").val();
			$.ajax({
				type:'post'
				,url:'emoverlay'
				,data:{'email' : email }
				,dataType:'JSON'
				,success:function(obj){
					console.log(obj);
					if(obj.use2 != 1){
						alert('사용할 수 있는 이메일 입니다.');
						emoverChk= true;
					}else{
						alert('이미 사용중인 이메일 입니다.');

					}
				}
				,error:function(e){
					console.log(e);
				}
			});
		});
//아이디 중복체크
 var overChk = false;
		$("#overlay").click(function(){
			var id = $("#username").val();
				$.ajax({
					type:'post'
					,url:'overlay'
					,data:{'id' : id }
					,dataType:'JSON'
					,success:function(obj){
						console.log(obj);
						if(obj.use != 1){
							alert('사용할 수 있는 아이디 입니다.');
							overChk= true;
						}else{
							alert('이미 사용중인 아이디 입니다.');

						}
					}
					,error:function(e){
						console.log(e);
					}
				});
			});