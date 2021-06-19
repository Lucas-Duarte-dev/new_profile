import "../styles/global.scss";
import styles from "../styles/containerApp.module.scss";
import ModalContextProvider from "../context/modalContext";

function MyApp({ Component, pageProps, user }) {
  return (
    <ModalContextProvider>
      <div className={styles.containerApp}>
        <Component {...pageProps} />
      </div>
    </ModalContextProvider>
  );
}

export default MyApp;
