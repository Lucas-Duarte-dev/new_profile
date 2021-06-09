import { GetServerSideProps } from "next";
import { useState } from "react";
import { api } from "../services/api";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

type HomeProps = {
  user: User;
};

type User = {
  avatar_url: string;
  bio: string;
  created_at: string;
  name: string;
  repos_url: string;
  location: string;
};

export default function Home({ user }: HomeProps) {
  const [githubUser, setGithubUser] = useState<User>(user);

  console.log(githubUser);

  return (
    <div>
      <section></section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = (await api.get("Lucas-Duarte-dev")).data;

  const user = {
    avatar_url: data.avatar_url,
    bio: data.bio,
    created_at: format(parseISO(data.created_at), "d MMM yyyy", {
      locale: ptBR,
    }),
    name: data.name,
    repos_url: data.repos_url,
    location: data.location,
  };

  return {
    props: {
      user,
    },
  };
};
