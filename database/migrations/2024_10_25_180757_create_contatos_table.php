<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContatosTable extends Migration
{
    public function up()
    {
        Schema::create('contatos', function (Blueprint $table) {
            $table->id(); // ID auto increment
            $table->string('nome');
            $table->integer('idade');
            $table->string('telefone');
            $table->string('cep');
            $table->string('rua');
            $table->string('numero');
            $table->string('complemento')->nullable(); // Campo opcional
            $table->string('cidade');
            $table->string('estado', 2); // Estado deve ser uma string de 2 caracteres
            $table->timestamps(); // Campos created_at e updated_at, se quiser manter timestamps
        });
    }

    public function down()
    {
        Schema::dropIfExists('contatos');
    }
}
