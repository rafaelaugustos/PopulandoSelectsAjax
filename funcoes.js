$(function(){

	// Pais
	function pais(){
		$.ajax({
			type: 'GET',
			url: 'funcoes.php',
			data: {
				acao: 'pais'
			},
			dataType: 'json',
			success: function(data){
				console.log(data);
				
				for(i = 0; i < data.qtd; i++){
					$('select[name=pais]').append('<option value="'+data.id[i]+'">'+data.pais[i]+'</option>');
				}
			}
		});
	}
	pais();

	// Estado
	function estado(pais){
		$.ajax({
			type: 'GET',
			url: 'funcoes.php',
			data: {
				acao: 'estado',
				id: pais
			},
			dataType: 'json',
			beforeSend: function(){
				$('select[name=estado]').html('<option>Carregando...</option>');
			},
			success: function(data){
				$('select[name=estado]').html('');
				$('select[name=estado]').append('<option>Selecione o estado</option>');
				for(i = 0; i < data.qtd; i++){
					$('select[name=estado]').append('<option value="'+data.id[i]+'">'+data.estado[i]+'</option>');
				}
			}
		});
	}


	// Cidade
	function cidade(estado){
		$.ajax({
			type: 'GET',
			url: 'funcoes.php',
			data: {
				acao: 'cidade',
				id: estado
			},
			dataType: 'json',
			beforeSend: function(){
				$('select[name=cidade]').html('<option>Carregando...</option>');
			},
			success: function(data){
				$('select[name=cidade]').html('');
				$('select[name=cidade]').append('<option>Selecione a cidade</option>');
				for(i = 0; i < data.qtd; i++){
					$('select[name=cidade]').append('<option value="'+data.id[i]+'">'+data.cidade[i]+'</option>');
				}
			}
		});
	}


	$('select[name=pais]').change(function(){
		$('select[name=cidade]').val($("select[name=cidade] option:first-child").val());
		var id = $(this).val();
		estado(id);
	});

	$('select[name=estado]').change(function(){
		var idEstado = $(this).val();
		cidade(idEstado);
	});
});