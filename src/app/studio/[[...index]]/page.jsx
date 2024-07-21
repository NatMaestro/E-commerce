// studio/page.jsx
"use client";

import React from "react";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanityecommerce/sanity.config";
import Layout from "../layout";

export default function StudioPage() {
  return (
    <Layout>
      <NextStudio config={config} />
    </Layout>
  );
}
