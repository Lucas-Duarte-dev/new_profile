import "../domain/styles/global.scss";
import styles from "../domain/styles/containerApp.module.scss";
import ModalContextProvider from "../domain/context/modalContext";

function MyApp({ Component, pageProps }) {
  return (
    <ModalContextProvider>
      <div className={styles.containerApp}>
        <Component {...pageProps} />
      </div>
    </ModalContextProvider>
  );
}

export default MyApp;
