
import React, { useState } from "react";
import styles from "../presentation/styles/app.module.scss";
import {CardProfile} from "../presentation/components/CardProfile";
import {useGithub} from "../infra/hooks/useGithub";
import {Loader} from "../presentation/components/Loader";
import SocialMidias from "../presentation/components/SocialMidias";

export default function Home() {
  const {data, isLoading} = useGithub();

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={styles.container}>
      <h1>Olá, eu sou o {data.name}</h1>

      <CardProfile login={data?.login} avatar={data?.avatar_url}/>
      <SocialMidias />
    </div>
  );
}
