<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Contato extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'contatos'; // Nome da tabela
    protected $fillable = ['nome', 'idade', 'telefone', 'cep', 'rua', 'numero', 'complemento', 'cidade', 'estado']; // Campos que podem ser preenchidos
}
