<?php

namespace Database\Factories;

use App\Models\Contato;
use Illuminate\Database\Eloquent\Factories\Factory;

class ContatoFactory extends Factory
{
    protected $model = Contato::class;

    public function definition(): array
    {
        // Definindo a localidade brasileira para o Faker
        $this->faker->locale = 'pt_BR';

        return [
            'nome' => $this->faker->name(),
            'idade' => $this->faker->numberBetween(18, 80),
            'telefone' => $this->faker->phoneNumber(), // Gera número de telefone brasileiro
            'cep' => $this->faker->postcode(), // Gera CEP no formato brasileiro
            'rua' => $this->faker->streetName(),
            'numero' => $this->faker->buildingNumber(),
            'complemento' => $this->faker->secondaryAddress(),
            'cidade' => $this->faker->city(),
            'estado' => $this->faker->stateAbbr(), // Gera sigla de estado do Brasil
        ];
    }
}
