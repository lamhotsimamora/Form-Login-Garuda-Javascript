function enterLogin(e)
{
	if (e.keyCode==13)
	{
		login();
	}
}



Garuda('btn_login').when('click',$=>{
	login();
});