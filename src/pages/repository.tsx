import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { GetServerSideProps } from "next";
import { api } from "../../infra/services/api";
import Link from "next/link";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import styles from "../styles/repository.module.scss";
import { Loader } from "../components/Loader";

type RepositoryProps = {
  repos: Repos[];
};

type Repos = {
  id: string;
  name: string;
  language: string;
  html_url: string;
  description: string;
  created_at: string;
  clone_url: string;
  owner: User;
};

type User = {
  login: string;
  avatar_url: string;
};

export default function Repository({ repos }: RepositoryProps) {
  if (!repos) {
    return <Loader />;
  }

  const [textCopy, setTextCopy] = useState("");

  return (
    <div className={styles.repos_container}>
      <header>
        <Link href="/">
          <img src="/icons/left_arrow.svg" />
        </Link>
      </header>
      <div>
        {repos.map((repo) => {
          return (
            <div key={repo.id} className={styles.repos}>
              <section>
                <div>
                  <span>{repo.name}</span>
                  <span>{repo.created_at}</span>
                </div>
                <span>{repo.language}</span>
                <p>Faça um clone deste projeto com o link abaixo</p>
                <div>
                  <input type="text" value={repo.html_url} disabled />

                  <CopyToClipboard
                    text={repo.html_url}
                    onCopy={(text) => {
                      setTextCopy(text);
                    }}
                  >
                    <button
                      className={
                        repo.html_url === textCopy ? styles.copied : ""
                      }
                      onClick={() => !false}
                    >
                      {repo.html_url === textCopy ? "Copiado" : "Copiar"}
                    </button>
                  </CopyToClipboard>
                </div>
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get(`${process.env.PROFILE_GITHUB}/repos`);

  const withoutForks = data.filter((repo) => repo.fork !== true);

  const sliceRepos = withoutForks.slice(0, 10);

  const repos = sliceRepos.map((repo) => {
    return {
      id: repo.id,
      name: repo.name,
      language: repo.language,
      html_url: repo.html_url,
      created_at: format(parseISO(repo.created_at), "d MMM yy", {
        locale: ptBR,
      }),
      clone_url: repo.clone_url,
      owner: {
        login: repo.owner.login,
        avatar_url: repo.owner.avatar_url,
      },
    };
  });

  return {
    props: {
      repos,
    },
  };
};
