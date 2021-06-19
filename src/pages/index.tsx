import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { api } from "../services/api";

import styles from "../styles/app.module.scss";
import Divisor from "../components/Divisor";
import Modal from "../components/Modal";
import { useModal } from "../context/modalContext";

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
  };

  return {
    props: {
      user,
    },
  };
};
