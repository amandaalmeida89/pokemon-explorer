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

export type PokemonTypes = {
  type: {
    name: string
  }
}

export type AbilitiesResponse = {
  abilities: PokemonAbility[],
  types: PokemonTypes[],
  id: number
}

export type PokemonDetails = {
  image?: string,
  abilities?: PokemonAbility[],
  types?: PokemonTypes[]
}
