import { useState } from "react";

import { Button, Card, Container, Grid, Text } from "@nextui-org/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { capitalize, getPokemonInfo, pokemonExist, toggleFavorites } from "../../helpers";
import { Pokemon, PokemonsResponse } from "../../interfaces";
import confetti from "canvas-confetti";
import styles from '../../styles/name.module.css'

interface Props {
    pokemon: Pokemon
}

const PokemonNamePage = ({ pokemon }: Props) => {
  const [isInFavorites, setIsInFavorites] = useState(pokemonExist(pokemon.id));

  const onToggleFavorite = () => {
    toggleFavorites(pokemon.id);
    setIsInFavorites(!isInFavorites);

    if (isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 150,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };

  return (
    <Layout title={capitalize(pokemon.name)}>
      <Grid.Container gap={2} css={{ marginTop: "5px" }}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: "25px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "no-image.png"
                }
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header className={styles.card_header}>
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button
                onClick={onToggleFavorite}
                color="gradient"
                ghost={!isInFavorites}
              >
                {isInFavorites ? "Quitar de favoritos" : "Guardar en favoritos"}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text h3>Sprites:</Text>
              <Container display="flex" direction="row" justify="space-between">
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonsResponse>("/pokemon?limit=151");

  return {
    paths: data.results.map(({ name }) => ({ params: { name } })),
    fallback: false, // false or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  const pokemon = await getPokemonInfo(name)

  return {
    props: {
      pokemon
    },
  };
};

export default PokemonNamePage;