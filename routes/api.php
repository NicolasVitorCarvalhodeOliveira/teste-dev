<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContatoController;

Route::get('/contatos', [ContatoController::class, 'index']);
Route::post('/contatos', [ContatoController::class, 'store']);
Route::put('/contatos/{id}', [ContatoController::class, 'update']);
Route::delete('/contatos/{id}', [ContatoController::class, 'destroy']); // Rota para deletar o contato