import {FiGithub} from "react-icons/fi";
import styles from './styles.module.scss';
type GithubUser = {
    avatar_url: string;
    bio: string;
    created_at: string;
    name: string;
    login: string;
    repos_url: string;
    location: string;
    date: string;
    html_url: string;
    public_repos: number;
};

export function CardProfile() {
    return (
        <div className={styles.profile_wrapper}>
            <div className={styles.profile_image}>
                <section>
                    <img src='/img/bg.jpg' alt='background_image' />
                </section>
                <img src='https://github.com/Lucas-Duarte-dev.png' alt='Lucas Duarte' />
            </div>
            <section className={styles.profile_info}>
                <h2>Lucas Duarte</h2>
                <a>
                    <FiGithub />
                    Lucas-Duarte-dev
                </a>
            </section>
        </div>
    );
}