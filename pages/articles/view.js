import { Paper, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import * as dayjs from "dayjs";
import useSWR from "swr";
import { API } from "../../constants";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useArticles = () => {
  const { data, error } = useSWR(`${API}/articles`, fetcher);

  return {
    articles: data,
    isLoading: !error && !data,
    isError: error,
  };
};

const ViewArticles = () => {
  const { articles, isLoading, isError } = useArticles();
  const router = useRouter();
  const goToCreate = () => router.push("/articles/create");
  if (isError) return <p className="error">Failed to load articles</p>;
  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={goToCreate}
        className="switch-button"
      >
        <Link href="/articles/create">Create article</Link>
      </Button>
      <div className="view__container">
        <div className="articles__list">
          {articles?.length ? (
            articles.map((article, i) => (
              <Paper
                key={i}
                className="article__item"
                width={20}
                elevation={16}
              >
                <div>
                  <h2>{article.title}</h2>
                  <div>{article.body}</div>
                </div>
                <div className="article__additional-info">
                  <div>
                    <strong>Email: </strong>
                    <span>{article.email}</span>
                  </div>
                  <div>
                    <strong>Date: </strong>
                    <span>{dayjs(article.date).format("DD.MM.YY, HH:mm")}</span>
                  </div>
                </div>
              </Paper>
            ))
          ) : isLoading ? (
            <div className="lds-hourglass" />
          ) : (
            <div className="no-articles-container">
              <h1>No articles yet</h1>
              <Button onClick={goToCreate} variant="contained">
                Create a new one
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewArticles;
