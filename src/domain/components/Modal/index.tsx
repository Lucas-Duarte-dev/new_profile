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
          <a
            href="https://api.whatsapp.com/send?phone=5511958482979"
            target="_blank"
          >
            <img src="/icons/whatsapp.svg" alt="whatsapp" />
            <span>Whatsapp</span>
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=100026467400756"
            target="_blank"
          >
            <img src="/icons/facebook.svg" alt="facebook" />
            <span>Facebook</span>
          </a>

          <a href="https://www.instagram.com/lucas_duar32/" target="_blank">
            <img src="/icons/instagram.svg" alt="instagram" />
            <span>Instagram</span>
          </a>

          <a
            href="https://www.linkedin.com/in/lucas-duarte-ab65051b7/"
            target="_blank"
          >
            <img src="/icons/linkedin.svg" alt="linkedin" />
            <span>Linkedin</span>
          </a>
        </section>
      </div>
    </div>
  );
}
