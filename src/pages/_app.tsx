import "../styles/global.scss";
import styles from "../styles/containerApp.module.scss";
function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.containerApp}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
