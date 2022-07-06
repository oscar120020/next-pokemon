import { useState } from "react";

import { Button, Card, Container, Grid, Text } from "@nextui-org/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { Layout } from "../../components/layouts";
import {
  capitalize,
  getPokemonInfo,
  pokemonExist,
  toggleFavorites,
} from "../../helpers";
import { Pokemon } from "../../interfaces";
import confetti from "canvas-confetti";

interface Props {
  pokemon: Pokemon;
}

const PokemonInfo = ({ pokemon }: Props) => {
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
    <Layout
      title={capitalize(pokemon.name)}
      image={pokemon.sprites.other?.home.front_default}
    >
      <Grid.Container gap={2} css={{ marginTop: "5px" }}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: "25px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "/images/no-image.png"
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
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
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
                  src={pokemon.sprites.front_default || "/images/no-image.png"}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default || "/images/no-image.png"}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny || "/images/no-image.png"}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny || "/images/no-image.png"}
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
  const pokemon151 = [...Array(151)].map((_, index) => `${index + 1}`);

  return {
    paths: pokemon151.map((id) => ({ params: { id } })),
    fallback: "blocking", // false or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const pokemon = await getPokemonInfo(id);

  if (!pokemon) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      pokemon,
    },
    revalidate: 86400,
  };
};

export default PokemonInfo;
