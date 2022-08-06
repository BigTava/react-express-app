import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import ArticleList from "../components/ArticleList";
import articleContent from "./article-content";
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../components/CommentList";
import UpvotesSection from "../components/upvoteSection";
import AddCommentForm from "../components/AddCommentForm";

const ArticlePage = () => {
  const { name } = useParams();
  const article = articleContent.find((article) => article.name === name);

  const [articleInfo, setArticleInfo] = React.useState({
    upvotes: 0,
    comments: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/articles/${name}`);
      const body = await result.json();
      setArticleInfo(body);
    };
    fetchData();
  }, [name]);

  if (!article) return <NotFoundPage />;

  const otherArticles = articleContent.filter(
    (article) => article.name !== name
  );
  return (
    <>
      <h1>{article.title}</h1>
      <UpvotesSection
        articleName={name}
        upvotes={articleInfo.upvotes}
        setArticleInfo={setArticleInfo}
      />
      {article.content.map((paragraph, key) => (
        <p key={key}>{paragraph}</p>
      ))}
      <CommentsList comments={articleInfo.comments} />
      <AddCommentForm articleName={name} setArticleInfo={setArticleInfo} />
      <h3>Other articles:</h3>
      <ArticleList articles={otherArticles} />
    </>
  );
};

export default ArticlePage;
