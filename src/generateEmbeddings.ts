// generateEmbeddings.js
import { chunkText } from "./utils/chunkText"; // Adjust the path as necessary

import dotenv from "dotenv";

dotenv.config();

// const { GoogleGenerativeAI } = require("@google/generative-ai");
import { GoogleGenerativeAI } from "@google/generative-ai";

const data = `
Kanugu RajeshEmail: kanugurajesh3@gmail.com
Portfolio: rajeshportfolio.me                                                 Github:  github.com/kanugurajesh
Social:  linktr.ee/kanugurajesh                             Linkedin:  linkedin.com/in/rajesh-kanugu-aba8a3254/
Education
•MVSR Engineering CollegeTelangana, IndiaBachelor of Science - Computer Science; SCGPA: 7.76                             Nov 2022 - November 2026
Skills Summary
•Languages:    Javascript, Typescript, Python, C, C++, Java, C Sharp, SQL
•Libraries, Frameworks:    React, Express, NextJS, Django, Flask, FastApi, Angular, Electron, Android, .Net
•DataBase:    MySQL, SQLite, Postgress, MongoDB
•Ui Frameworks / Tools:   Tailwind Css, Styled Components, Material Ui, Ant Design, Chakra Ui, ShadCdn Ui
•Cloud, Hosting, Tools:   Azure, Github Pages, Google Cloud, VSCode, Android Studio, Git, Firebase, Supabase, Docker
Experience
•IIT BombayLinkSoftware Developer Intern                                                     August 2023 - January 2024
◦Udaan:  Udaan, an IIT Bombay initiative, is a groundbreaking translation tool addressing language barriers in India.  As
a part-time software developer, my focus includes feature development, issue debugging, and system optimization.  I’ve
achieved a notable 25% reduction in system latency.  Udaan serves clients like Bank of Baroda and Bhashini.
◦Tech Stack:  Python, Djagon, Docker, Html, Css, Javascript, Bootstrap, MySql, Windows Server, Celery
•Via-Casia Amalfi Private LimitedLinkSoftware Developer Intern                                                            Sep 2023 - Sep 2023
◦Feature:  I developed a notification system, engineered UI components, and integrated APIs for a credibility system.
◦Tech Stack:  ReactJs, Html, Css, Javascript, SwaggerUI
•Google Developer Student Club - MVSRProject LinkFull Stack Web Developer                                                    August 2023 - November 2026
◦Yaarit:  I’m a full-stack developer at GDSC MVSR, responsible for crafting the backend of the Yaarit website—a
platform for students to learn programming and engage with peers.  Successfully cut system latency by 75%, and actively
collaborating with the tech team to create software addressing real-world challenges.
◦Tech Stack:  Python, Javascript, Typescript, React, MongoDB, Cryptography ,Html, Css
Projects
•LearnForge - An application to help students in learning by leveraging the power of LLM’S: LearnForge is a
comprehensive educational solution designed to revolutionize the learning experience for students.  Built on gamification
principles, it transforms education into an engaging and enjoyable journey.  The platform leverages cutting-edge generative AI
learning solutions to provide unparalleled support for students to excel in their academic pursuits.
Tech :Typescript, Next.JS, Tailwind, Gemini Pro, Rive, Stable Diffusion, Face Swap LLm, Resend, Python, React.JS    Link
•Mentify - An all in one solution for mental health issues:  An AI-powered clinical trial matching application which
takes basic diagnosis test and offers personalized medical path to improve mental health.  It is also powered with Chat,
Therapist etc.  To promote mental well being.
Tech :Typescript, Next.JS, React.JS, TailwindCss, Gemini Pro, Rive, Stable Diffusion, Face Swap LLm, Api, Resend    Link
•Koinx - A crypto trading dashboard:  A Frontend application for a trading platform powered with coingecko and
tradingview to provide immersive experience
Tech :Typescript, Next.JS, React.JS, TailwindCss, React.JS, CoinGecko Api, Trading View, Resend    Link
•Swap-AI - Swap your photo with your favourite avatar:  This application Swap AI is an AI powered application to
generate your fantasy avatar and then swap it with your face.
Tech :Typescript, Next.JS, React.JS, TailwindCss, React.JS, Resend, Replicate API,     Link
•Space Exploration - An App to explore space:  This app introduces you to the different celestial bodies and space crew
Tech :Html, CSS, Javascript     Link
•Advanced Chat App - A website to converse with people:  An Advanced chat application which provides a dynamic
chat experience between different users
Tech :React, MongoDB, Express, Nodejs, Typescript, Socket.io, Jwt, Tailwind Css, API     Link
Achievements
•Got 1st place in Geeks for Geeks Hack for Health hackathon which is a global level hackathon - January 2024
•Got 1st place in Appgude Hacks which is a global level hackathon - January 2024
•Got 1st place in CSI Fusion State Level Hackathon - January 2024
•Got 3rd place in Hack The Verse hackathon where over 150+ teams competed - December 2023
•Selected as GDSC Core Team Web Developer from among the hundreds of people who applied for it.  - August 2022
•I was among the honorable mentions in the xata io summer hackathon - July 2024
•Built 104 GitHub projects with 610+ stars, fostering significant learning through documentation.  - August 2023
•Shortlisted from 2000+ applicants for a startup and received part time frontend engineer offer.  - August 2023
`;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

async function run() {
  const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

  // Split the data into chunks
  const chunks = chunkText(data, 200); // Adjust chunk size as needed

  // Generate embeddings for each chunk
  const embeddings = [];
  for (const [index, chunk] of chunks.entries()) {
    const result = await model.embedContent(chunk);
    embeddings.push({
      id: `chunk-${index}`,
      values: result.embedding.values,
      metadata: {
        chunkIndex: index,
        text: chunk,
      },
    });
  }

  console.log("Generated Embeddings:", embeddings);
  return embeddings;
}

export default run;
