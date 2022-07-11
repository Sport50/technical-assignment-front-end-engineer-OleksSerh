import { Button } from "@mui/material";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const goToCreate = () => router.push("/articles/create");
  const goToView = () => router.push("/articles/view");

  return (
    <div className="home__container">
      <Button onClick={goToView} variant="contained">
        View articles
      </Button>
      <Button onClick={goToCreate} variant="outlined" color="secondary">
        Create article
      </Button>
    </div>
  );
}
