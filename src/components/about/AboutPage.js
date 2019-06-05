import React from "react";
import { Trans } from "react-i18next";

const AboutPage = () => (
  <div>
    <Trans i18nKey="title">
      <h2>About</h2>
    </Trans>
    <Trans i18nKey="intro">
      <p>This is the About page.</p>
    </Trans>
  </div>
);

export default AboutPage;
