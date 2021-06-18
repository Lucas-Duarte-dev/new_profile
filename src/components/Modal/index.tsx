import { useModal } from "../../context/modalContext";
import styles from "./modal.module.scss";

export default function Modal() {
  const { isActive, handleOpenModal } = useModal();

  return (
    <div className={isActive ? styles.modalActive : styles.modalNotActive}>
      <div>
        <header>
          <h1>Redes Sociais</h1>
          <div onClick={handleOpenModal}>
            <img src="/icons/close.svg" alt="close" />
          </div>
        </header>
        <section>
          <div>
            <a href="">
              <img src="" alt="social" />
              <span>Whatsapp</span>
            </a>
          </div>
          <div>
            <a href="">
              <img src="" alt="social" />
              <span>Facebook</span>
            </a>
          </div>
          <div>
            <a href="">
              <img src="" alt="social" />
              <span>Instagram</span>
            </a>
          </div>
          <div>
            <a href="">
              <img src="" alt="social" />
              <span>Linkedin</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
