export const toggleFavorites = (id: number) => {
    let favorites: number[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    
    if(favorites.includes(id)){
        favorites = favorites.filter(val => val !== id);
    }else{
        favorites.push(id)
    }

    localStorage.setItem("favorites", JSON.stringify(favorites))
}

export const pokemonExist = (id: number): boolean => {
    if(typeof window === "undefined") return false;

    const favorites: number[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    return favorites.includes(id)
}

export const pokemons = (): number[] => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
}