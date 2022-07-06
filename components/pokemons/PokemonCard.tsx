import { Card, Grid, Row, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";
import { SmallPokemon } from "../../interfaces";

export const PokemonCard = ({ id, image, name }: SmallPokemon) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/name/${name}`);
  };

  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={id}>
      <Card
        isHoverable
        isPressable
        css={{ padding: "5px" }}
        onClick={handleClick}
      >
        <Card.Body>
          <Card.Image src={image || "/images/no-image.png"} width={"100%"} height={150} />
        </Card.Body>
        <Card.Footer>
          <Row justify="space-between">
            <Text transform="capitalize">{name}</Text>
            <Text># {id}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
