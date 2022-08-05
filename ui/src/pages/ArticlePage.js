import React from "react";
import ArticleList from "../components/ArticleList";
import articleContent from "./article-content";
import NotFoundPage from "./NotFoundPage";
import { useParams } from "react-router-dom";

const ArticlePage = () => {
  const { name } = useParams();
  const article = articleContent.find((article) => article.name === name);

  if (!article) return <NotFoundPage />;

  const otherArticles = articleContent.filter(
    (article) => article.name !== name
  );
  return (
    <>
      <h1>{article.title}</h1>
      {article.content.map((paragraph, key) => (
        <p key={key}>{paragraph}</p>
      ))}
      <h3>Other articles:</h3>
      <ArticleList articles={otherArticles} />
    </>
  );
};

export default ArticlePage;
