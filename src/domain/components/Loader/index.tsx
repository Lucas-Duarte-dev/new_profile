import styles from "./styles.module.scss";

export function Loader() {
  return (
    <div className={styles.loadingContainer}>
      <img src="/icons/loading.svg" alt="Loading..." />
    </div>
  );
}
