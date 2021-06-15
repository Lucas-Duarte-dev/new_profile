import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { GetServerSideProps } from "next";
import { api } from "../services/api";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentValue, setCurrentValue] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [element, setElement] = useState<HTMLTextAreaElement[]>();
  const inputRef = useRef<HTMLInputElement[]>(null);

  return (
    <div>
      <header>
        <Link href="/">
          <img src="/icons/left_arrow.svg" />
        </Link>
      </header>
      <div>
        {repos.map((repo, index) => {
          return (
            <div key={repo.id}>
              <header>
                <Image
                  height={40}
                  width={40}
                  objectFit="cover"
                  src={repo.owner.avatar_url}
                  alt={repo.owner.login}
                />
                <span>{repo.owner.login}</span>
              </header>
              <section>
                <h2>{repo.name}</h2>
                <p>{repo.description}</p>
                <span>{repo.language}</span>
                <div>
                  <input type="text" value={repo.html_url} id={repo.id} />

                  <CopyToClipboard
                    text={currentValue}
                    onCopy={() => setCopySuccess(true)}
                  >
                    <button onClick={() => setCurrentValue(repo.html_url)}>
                      Copiar
                    </button>
                  </CopyToClipboard>
                </div>
              </section>
              <span>{repo.created_at}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get(
    `https://api.github.com/users/${process.env.PROFILE_GITHUB}/repos`
  );

  const withoutForks = data.filter((repo) => repo.fork !== true).reverse();

  const repos = withoutForks.map((repo) => {
    return {
      id: repo.id,
      name: repo.name,
      language: repo.language,
      html_url: repo.html_url,
      description: repo.description !== "null" && repo.description,
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
