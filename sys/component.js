$display = __({
  el:"display_form"
});

class input
{
	constructor(d)
	{
		if (d)
			this.id = d.id ? d.id : '';
		  	this.pc = d.placeholder ? d.placeholder : '';
		  	this.t = d.type ? d.type : '';
	}

	render()
	{
		$display.setContent(
				'<div class="input-group mb-3">'+
				  '<div class="input-group-prepend">'+
				    '<span class="input-group-text">'+this.pc+'</span>'+
				  '</div>'+
				  '<input type="'+this.t+'" onkeypress="enterLogin(event);" class="form-control" id="'+this.id+'" aria-label="'+this.pc+'">'+
				'</div>'
		);
		return __({
			el:this.id
		});
	}
}

$input_username = new input({
	id:'t_username',
	placeholder:'Username',
	type:'text'
});


$input_username = $input_username.render();

$input_username.focus();

