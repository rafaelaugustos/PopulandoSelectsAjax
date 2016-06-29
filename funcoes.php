<?php

require("config.php");

$retorno = array();

if($_GET['acao'] == 'pais'){
	$sql = $pdo->prepare("SELECT * FROM pais");
	$sql->execute();	
	$n = 0;
	$retorno['qtd'] = $sql->rowCount();
	while($ln = $sql->fetchObject()){
		$retorno['pais'][$n] = $ln->pais;
		$retorno['id'][$n] 	 = $ln->id;
		$n++;
	}	
}

if($_GET['acao'] == 'estado'){
	$id = $_GET['id'];
	$sql = $pdo->prepare("SELECT * FROM estado WHERE id_pais = :id");
	$sql->bindValue(":id", $id, PDO::PARAM_INT);
	$sql->execute();
	$n = 0;
	$retorno['qtd'] = $sql->rowCount();

	while($ln = $sql->fetchObject()){
		$retorno['estado'][$n] = $ln->estado;
		$retorno['id'][$n] 	   = $ln->id;
		$n++;
	}	
}

if($_GET['acao'] == 'cidade'){
	$id = $_GET['id'];
	$sql = $pdo->prepare("SELECT * FROM cidade WHERE id_estado = :id");
	$sql->bindValue(":id", $id, PDO::PARAM_INT);
	$sql->execute();
	$n = 0;
	$retorno['qtd'] = $sql->rowCount();

	while($ln = $sql->fetchObject()){
		$retorno['cidade'][$n] = $ln->cidade;
		$retorno['id'][$n] 	   = $ln->id;
		$n++;
	}	
}


die(json_encode($retorno));