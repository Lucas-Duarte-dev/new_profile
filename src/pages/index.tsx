
import React, { useState } from "react";
import styles from "../domain/styles/app.module.scss";
import {CardProfile} from "../domain/components/CardProfile";

export default function Home() {

  return (
    <div className={styles.container}>
      <CardProfile />
    </div>
  );
}
