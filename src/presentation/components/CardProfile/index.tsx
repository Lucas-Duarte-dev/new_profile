import {FiGithub} from "react-icons/fi";
import styles from './styles.module.scss';
import {useGithub} from "../../../infra/hooks/useGithub";

type CardProfileProps = {
    avatar: string,
    login: string
}

export function CardProfile({avatar, login}: CardProfileProps) {
    return (
        <div className={styles.profile_wrapper}>
            <div className={styles.profile_image}>
                <img src={avatar} alt={login} />
            </div>
            <section className={styles.profile_info}>
                <h2>{login}</h2>
                <a>
                    <FiGithub />
                    {login}
                </a>
            </section>
        </div>
    );
}