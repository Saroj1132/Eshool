//if email is already exist

$(document).ready(()=>{
    $("#studregemail").on("blur", ()=>{
        var studregemail= $("#studregemail").val();
        $.ajax({
            url:"/checkmail",
            method:"POST",
            data:{
                studregemail:studregemail
            },
            success: ((res)=>{
                if(res != 0){
                    $("#vmsg2").html('<small style="color:red;">Email id already exist !</small>')
                    $("#signup").attr("disabled", true)
                    console.log("d")
                }else if(res == 0){
                    $("#vmsg2").html('<small style="color:green;">Thank You Go !</small>')
                    $("#signup").attr("disabled", false)
    
                }
            })
        })
    })
})

//Student Registration


function studreg(){
    event.preventDefault();
    var reg= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    var studregemail= $("#studregemail").val();
    var studregpassword=$("#studregpassword").val()
    var studregname=$("#studregname").val()

    if(studregname.trim() ==""){
        $("#vmsg1").html('<small style="color:red;">Please Enter Your Name !</small>')   
        $("#studregname").focus()
        return false
    }else if(studregemail.trim() == ""){
        $("#vmsg2").html('<small style="color:red;">Please Enter Your Email !</small>')   
        $("#studregemail").focus()
        return false
    }else if(studregemail.trim() != "" &&  !reg.test(studregemail)){
        $("#vmsg2").html('<small style="color:red;">Please Enter Valid Email !</small>')   
        $("#studregemail").focus()
        return false
    }else if(studregpassword.trim() == ""){
        $("#vmsg3").html('<small style="color:red;">Please Enter Your Password !</small>')   
        $("#studregpassword").focus()
        return false
    }else{
        $.ajax({
            url:"http://localhost:3000/StudentRegistraion",
            method:"POST",
            data:{
                studregemail:studregemail,
                studregpassword:studregpassword,
                studregname:studregname
            }
        }).done((res)=>{
            if(res){
                $("#messagereg").html("<span class='alert-success'>Registartion Successfully !!</span>")
                console.log('id from ajax call is', res);
            }else{
                console.log(res);
            }
        })
    }

    

}

// Student Login 

function studlogin(){
    event.preventDefault();
    var reg= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    var studlogemail= $("#studlogemail").val();
    var studlogpassword=$("#studlogpassword").val()

    if(studlogemail.trim() == ""){
        $("#smsg1").html('<small style="color:red;">Please Enter Your Email !</small>')   
        $("#studlogemail").focus()
        return false
    }else if(studlogemail.trim() != "" &&  !reg.test(studlogemail)){
        $("#smsg1").html('<small style="color:red;">Please Enter Valid Email !</small>')   
        $("#studlogemail").focus()
        return false
    }else if(studlogpassword.trim() == ""){
        $("#smsg2").html('<small style="color:red;">Please Enter Your Password !</small>')   
        $("#studlogpassword").focus()
        return false
    }else{
        $.ajax({
            url:"http://localhost:3000/Studentlogin",
            method:"POST",
            data:{
                studlogemail:studlogemail,
                studlogpassword:studlogpassword
            }
        }).done((res)=>{
            if(res != 0){
                console.log('id from ajax call is', res);
                window.location.href="/"
            }else if(res == 0){
                console.log(res);
            }
        })
    }

    
}

function adminlogin(){
    event.preventDefault();
    var reg= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    var adminlogemail= $("#adminlogemail").val();
    var adminlogpassword=$("#adminlogpassword").val()

    if(adminlogemail.trim() == ""){
        $("#amsg1").html('<small style="color:red;">Please Enter Your Email !</small>')   
        $("#adminlogemail").focus()
        return false
    }else if(adminlogemail.trim() != "" &&  !reg.test(adminlogemail)){
        $("#amsg1").html('<small style="color:red;">Please Enter Valid Email !</small>')   
        $("#adminlogemail").focus()
        return false
    }else if(adminlogpassword.trim() == ""){
        $("#amsg2").html('<small style="color:red;">Please Enter Your Password !</small>')   
        $("#adminlogpassword").focus()
        return false
    }else{
        $.ajax({
            url:"http://localhost:3000/adminlogin",
            method:"POST",
            data:{
                adminlogemail:adminlogemail,
                adminlogpassword:adminlogpassword
            }
        }).done((res)=>{
            if(res != 0){
                console.log('id from ajax call is', res);
                window.location.href="/admin"
            }else if(res == 0){
                console.log(res);
            }
        })
    }

    
}