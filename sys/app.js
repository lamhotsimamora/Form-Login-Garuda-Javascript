function showToast(t)
{
	iziToast.show({
	    title: 'Garuda Javascript',
	    message: 'Hei, please type your <b>'+t+'</b>, and then Enter',
	    color: 'blue'
    });
}

function welcomeLoading()
{
	Garuda('btn_login').hide();
	$display.setContent('<center><img class="" src="img/loading.gif"></img></center>');
	startTimer();
}


function checkLogin()
{
	if (_getStorage('username')==null || _getStorage('password')==null)
	{
		return false;
	}else{
		return {
			username:_getStorage('username'),
			password:_getStorage('password')
		}
	}
}


function login()
{
	if (! checkLogin())
	{
		if ($input_username.getObj)
		{
			let username = $input_username.getValue;
			if (username ==='' || username==null)
			{
				showToast('username');
				$input_username.focus();
			}else{
				_saveStorage('username',username);
				$password_input = new input({
					id:'t_password',
					placeholder:'Password',
					type:'password'
				});
				$password_input = $password_input.render();
				$password_input.focus();
				showToast('password');
			}
		}
		else if ($password_input.getObj)
		{
			let password = $password_input.getValue;
			if (password==='' || password==null)
			{
				showToast('password');
				$password_input.focus();
			}else{
				_saveStorage('password',password);
				login();
		    }
	}
  }else{
  	  welcomeLoading();
  }
}


function welcomeTemplate()
{
	$display.setContent(
		'<div id="layout_welcome" style="display: none" class="card">'+
		  '<div class="card-header">'+
		    'Hi ! welcome <strong> #username# </strong>'+
		  '</div>'+
		  '<div class="card-body">'+
		    '<h5 class="card-title">You have been login</h5>'+
		    '<p class="card-text">Your password is : <strong> #password# </strong> </p><br>'+
		    '<a onclick="logout();" class="btn btn-danger btn-md" style="color: white">Let me out</a>'+
		  '</div>'+
		'</div>'
	);

	let data = checkLogin();

	$layout_welcome = __({
	  el:"layout_welcome",
	  html:{
	  	single:{
	  		username:data.username,
	  		password:data.password
	  	}
	  }
	});


	$layout_welcome.show();
	iziToast.show({
	    title: 'Welcome '+data.username+'',
	    message: 'Hi '+data.password+' ! You have been login now !',
	    color:'green'
    });
}


function startTimer()
{
	var t = 0;
	var interval ;
	interval = setInterval($=>{
		t++;
		if (t==8)
		{
			welcomeTemplate();
			clearInterval(interval);
		}
	},100);
}


if (checkLogin() != false)
{
	welcomeLoading();
}else{
	showToast('username');
}


function logout()
{
	localStorage.clear();
	_refresh();
}