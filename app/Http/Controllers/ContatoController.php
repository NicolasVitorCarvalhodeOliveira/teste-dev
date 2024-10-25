<?php

namespace App\Http\Controllers;

use App\Models\Contato;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;


class ContatoController extends Controller
{
    // Função para exibir a lista de contatos
    public function index()
    {
        try {
            return Contato::all();
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id) {
        $c = Contato::find($id);
        if (!$c){
            return response()->json(['message' => 'Contato não encontrado'], 404);
        }

        $fields = [
            'nome' => 'required|string|max:255',
            'idade' => 'required|integer',
            'telefone' => 'required|string',
            'cep' => 'required|string',
            'rua' => 'required|string',
            'numero' => 'required|string',
            'complemento' => 'nullable|string',
            'cidade' => 'required|string',
            'estado' => 'required|string|size:2',
        ];

        try {
            $vr = $request->validate($fields);
            $c->fill($vr);
            $c->save();
            return response()->json(['message' => 'Contato atualizado com sucesso!', 'data' => $c], 201);
        } catch (ValidationException $e) {
            $errors = $e->validator->errors();
            return response()->json(['message' => 'Erro de validação', 'errors' => $errors], 422);
        }
        

    }
    

    public function destroy($id)
    {
        try {
            $contato = Contato::findOrFail($id);
            $contato->delete();
            return response()->json(['message' => 'Contato deletado com sucesso!', 'data' => $contato], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    
    
    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:100',
            'idade' => 'required|integer',
            'telefone' => 'required|string|max:20',
            'cep' => 'required|string|max:10',
            'rua' => 'required|string|max:150',
            'numero' => 'required|string|max:10',
            'complemento' => 'nullable|string|max:50',
            'cidade' => 'required|string|max:100',
            'estado' => 'required|string|max:2',
        ]);

        $contato = Contato::create($request->all());
        return response()->json($contato, 201);
    }

    // Outras funções para editar e excluir contatos podem ser adicionadas aqui
}

