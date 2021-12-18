
import React, { useState } from "react";
import styles from "../styles/app.module.scss";
import {CardProfile} from "../components/CardProfile";

export default function Home() {

  return (
    <div className={styles.container}>
      <CardProfile />
    </div>
  );
}
