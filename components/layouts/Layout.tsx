import Head from "next/head";
import { Navbar } from "../ui";

interface Props {
  children: JSX.Element | JSX.Element[];
  title?: string;
  image?: string;
}

const origin = typeof window === "undefined" ? "" : window.location.origin;

export const Layout = ({ children, title, image }: Props) => {

  return (
    <>
      <Head>
        <title>{title || "Pokemon App"}</title>
        <meta name="author" content="Oscar Martinez" />
        <meta name="description" content={`Info sobre pokemon ${title}`} />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
        <meta property="og:title" content={title ? `Información sobre ${title}` : "Pokémon List"} />
        <meta
          property="og:description"
          content={title ? title : "Muestra informacion de los primeros 151 pokemones"}
        />
        <meta property="og:image" content={image ? image : `${origin}/images/banner.png`} />
      </Head>

      <Navbar />

      <main
        style={{
          padding: "10px 20px",
        }}
      >
        {children}
      </main>
    </>
  );
};
