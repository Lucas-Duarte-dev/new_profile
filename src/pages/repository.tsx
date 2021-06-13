import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { GetServerSideProps } from "next";
import { api } from "../services/api";

export default function Repository(repos) {
  console.log(repos);
  return <div></div>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get(
    `https://api.github.com/users/${process.env.PROFILE_GITHUB}/repos`
  );

  const dontFork = data.filter((repo) => repo.fork !== true);

  const repos = dontFork.map((repo) => {
    return {
      id: repo.id,
      name: repo.name,
      language: repo.language,
      html_url: repo.html_url,
      description: repo.description !== "null" && "",
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
