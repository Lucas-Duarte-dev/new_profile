import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { api } from "../services/api";
import styles from "../styles/app.module.scss";
import Divisor from "../components/Divisor";
import Modal from "../components/Modal";
import { useModal } from "../context/modalContext";
import { Loader } from "../components/Loader";
import {
  SiTypescript,
  SiJavascript,
  SiCss3,
  SiHtml5,
  SiReact,
  SiNodeDotJs,
  SiPhp,
  SiMysql,
  SiDocker,
} from "react-icons/si";

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
  public_repos: number;
};

export default function Home({ user }: HomeProps) {
  if (!user) {
    return <Loader />;
  }

  const { handleOpenModal } = useModal();

  return (
    <div className={styles.container}>
      <div className={styles?.profileContainer}>
        <section>
          <img src={user?.avatar_url} alt={user?.name} />
          <div>
            <h2>{user?.name}</h2>
            <p>Criação github: {user?.created_at}</p>
            <a href={user?.html_url} target="_blank">
              <img src="/icons/github.svg" />
              {user?.login}
            </a>
          </div>
        </section>
        <section>
          <p>
            <img src="/icons/calendar.svg" /> {user?.date}
          </p>
          <div>{user?.bio}</div>
        </section>
      </div>
      <Divisor />
      <div className={styles.linksContainer}>
        <section>
          <p>Alguns dos meus repositórios no github 🤓</p>
          <div>
            <a href="/repository">Clique aqui para acessar</a>
          </div>
        </section>
        <section>
          <p>Todas as minhas redes sociais caso queira entrar em contato. 😁</p>
          <div onClick={handleOpenModal}>
            <a>Clique aqui para acessar</a>
          </div>
        </section>
        <section>
          <h2>Tecnologias que uso ou já usei</h2>
          <ul>
            <li>
              <SiHtml5 color="#a77dcb" />
              HTML5
            </li>
            <li>
              <SiCss3 color="#a77dcb" />
              CSS3
            </li>
            <li>
              <SiJavascript color="#a77dcb" />
              JavaScript
            </li>
            <li>
              <SiTypescript color="#a77dcb" /> TypeScript
            </li>
            <li>
              <SiReact color="#a77dcb" />
              ReactJS
            </li>
            <li>
              <SiNodeDotJs color="#a77dcb" /> NodeJS
            </li>
            <li>
              <SiPhp color="#a77dcb" /> PHP
            </li>
            <li>
              <SiMysql color="#a77dcb" /> MySQL
            </li>
            <li>
              <SiDocker color="#a77dcb" /> Docker
            </li>
          </ul>
        </section>
      </div>

      <p>
        Inspirado no tema{" "}
        <a href="https://github.com/sdras/night-owl-vscode-theme">Night Owl</a>{" "}
        💜
      </p>

      <Modal />
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
    public_repos: Number(data.public_repos),
  };

  return {
    props: {
      user,
    },
  };
};
