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
		/**
		 * Return data from storage
		 * type {array}
		 */
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
		/**
		 * $input_username.getObj is equal to document.getElementById("t_username")
		 */
		if ($input_username.getObj)
		{
			/**
			 * Get value from input text (t_username)
			 * @type {[type]}
			 */
			let username = $input_username.getValue;

			/**
			 * Check if value is null or empty
			 * @type {[type]}
			 */
			if (username ==='' || username==null)
			{
				showToast('username');
				$input_username.focus();
			}else{
				/**
				 * Save the value of input t_username to storage browser
				 */
				_saveStorage('username',username);

				/**
				 * Prepare component t_password
				 * @type {input}
				 */
				$password_input = new input({
					id:'t_password',
					placeholder:'Password',
					type:'password'
				});

				/**
				 * Render password input
				 * @type {[type]}
				 */
				$password_input = $password_input.render();
				
				/**
				 * Set to focus
				 */
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
	/**
	 * Prepare welcome template
	 * and also set it to display none
	 * @type {String}
	 */
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

	/**
	 * Getting data from storage
	 * @type {[array]}
	 */
	let data = checkLogin();

	/**
	 * Prepare templating syntax single data 
	 * to layout_welcome
	 * @type {[type]}
	 */
	$layout_welcome = __({
	  el:"layout_welcome",
	  html:{
	  	single:{
	  		username:data.username,
	  		password:data.password
	  	}
	  }
	});

	/**
	 * and then layout_welcome ready to show
	 */
	$layout_welcome.show();

	/**
	 * Display toast
	 * @type {String}
	 */
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

/**
 * Check login
 */
if (checkLogin() != false)
{
	/**
	 * Call function welcomeLoading()
	 */
	welcomeLoading();
}else{
	showToast('username');
}


/**
 * Clear storage browser and then refresh the urL
 */
function logout()
{
	localStorage.clear();
	_refresh();
}