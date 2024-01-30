export type Pokemon = {
  name: string,
  url: string
}

export type PokemonInfo = {
  name: string,
  id: number
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