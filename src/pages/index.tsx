import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { api } from "../services/api";
import styles from "../styles/app.module.scss";
import Divisor from "../components/Divisor";

type HomeProps = {
  user: User;
};

type User = {
  avatar_url: string;
  bio: string;
  created_at: string;
  name: string;
  login: string;
  repos_url: string;
  location: string;
  date: string;
  html_url: string;
};

export default function Home({ user }: HomeProps) {
  const [githubUser, setGithubUser] = useState<User>(user);
  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <section>
          <img src={githubUser.avatar_url} alt={githubUser.name} />
          <div>
            <h2>{githubUser.name}</h2>
            <p>Criação github: {githubUser.created_at}</p>
            <a href={githubUser.html_url} target="_blank">
              <img src="/icons/github.svg" />
              {githubUser.login}
            </a>
          </div>
        </section>
        <section>
          <p>
            <img src="/icons/calendar.svg" /> {githubUser.date}
          </p>
          <div>{githubUser.bio}</div>
        </section>
      </div>
      <Divisor />
      <div className={styles.linksContainer}>
        <section>
          <p>Alguns dos meus repositórios no github 🤓</p>
          <div>
            <a href="">Clique aqui para acessar</a>
          </div>
        </section>
        <section>
          <p>Todas as minhas redes sociais caso queira entrar em contato. 😁</p>
          <div>
            <a href="">Clique aqui para acessar</a>
          </div>
        </section>
        <section>
          <p>
            Aqui apresento um pouco sobre como decidi entrar na área de
            desenvolvimento e minhas motivações diárias 💜
          </p>
          <div>
            <a href="">Clique aqui para acessar</a>
          </div>
        </section>
        <section>
          <p>Dê seu feedback 🙏🏻</p>
          <div>
            <a href="">Clique aqui para acessar</a>
          </div>
        </section>
      </div>

      <p>
        Inspirado no tema{" "}
        <a href="https://github.com/sdras/night-owl-vscode-theme">Night Owl</a>{" "}
        💜
      </p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get(process.env.PROFILE_GITHUB);

  const user = {
    avatar_url: data.avatar_url,
    bio: data.bio,
    created_at: format(parseISO(data.created_at), "d MMM yyyy", {
      locale: ptBR,
    }),
    name: data.name,
    login: data.login,
    repos_url: data.repos_url,
    location: data.location,
    date: format(Date.now(), "d MMM yyyy", {
      locale: ptBR,
    }),
    html_url: data.html_url,
  };

  return {
    props: {
      user,
    },
  };
};
