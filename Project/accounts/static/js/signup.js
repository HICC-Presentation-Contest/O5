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
