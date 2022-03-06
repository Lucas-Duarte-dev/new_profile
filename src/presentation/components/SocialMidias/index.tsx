import styles from "./dropdown.module.scss";
import {useState} from "react";
import {MdArrowDropDown} from "react-icons/md";

export default function SocialMidias() {
  const [isActive, setIsActive] = useState(false);

  const handleActiveDropDown = () => setIsActive(!isActive);

  return (
    <div className={styles.dropdown}>
      <div onClick={() => handleActiveDropDown()}>
        <span>Redes Sociais</span>
        <MdArrowDropDown />
      </div>
      <section className={`
        ${styles.socialMedia} 
        ${isActive ? styles.dropdownActive : styles.dropdownNotActive}
      `}>
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
  );
}
