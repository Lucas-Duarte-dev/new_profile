import "../presentation/styles/global.scss";
import styles from "../presentation/styles/containerApp.module.scss";
import {QueryClientProvider} from "react-query";
import {queryClient} from "../infra/services/queryClient";

function MyApp({ Component, pageProps }) {
  return (
      <QueryClientProvider client={queryClient}>
          <div className={styles.containerApp}>
            <Component {...pageProps} />
          </div>
      </QueryClientProvider>
  );
}

export default MyApp;
