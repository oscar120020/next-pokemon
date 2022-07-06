import { Card, Grid } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Layout } from "../../components/layouts";
import { FavoritePokemons } from "../../components/pokemons";
import { NoFavorites } from "../../components/ui";
import { pokemons } from "../../helpers";

const FavoritesPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons(pokemons());
  }, []);

  return (
    <Layout title="Pokémons - Favoritos">
      {favoritePokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritePokemons favoritePokemons={favoritePokemons} />
      )}
    </Layout>
  );
};

export default FavoritesPage;
