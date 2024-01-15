export type Pokemon = {
  name: string
}

export type PokemonList = {
  count: number,
  results: Pokemon[]
}

export type PokemonAbility = {
  ability: {
    name: string
  }
}

export type AbilitiesResponse = {
  abilities: PokemonAbility[],
  id: number
}