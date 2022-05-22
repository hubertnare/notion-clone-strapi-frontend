import "../styles.css";
import { ClientContext } from "graphql-hooks";
import { useGraphQLClient } from "../lib/graphql-client";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

export default function App({ Component, pageProps }) {
  const graphQLClient = useGraphQLClient(pageProps.initialGraphQLState);

  return (
    <CssBaseline>
      <Container maxWidth="lg">
        <ClientContext.Provider value={graphQLClient}>
          <Component {...pageProps} />
        </ClientContext.Provider>
      </Container>
    </CssBaseline>
  );
};