import { TextField, Button, TextareaAutosize } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import { useForm } from "react-hook-form";
import { API } from "../../constants";

const CreateArticle = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const goToView = () => router.push("/articles/view");
  const onSubmit = (data) =>
    axios
      .post(`${API}/articles`, { ...data, date: new Date() })
      .then(() => goToView())
      .catch(() => window.alert("Failed to create article"));

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        className="switch-button"
        onClick={goToView}
      >
        View articles
      </Button>
      <div className="create__container">
        <h1>Create Article</h1>
        <form className="create__form" onSubmit={handleSubmit(onSubmit)}>
          <TextField {...register("title")} label="Title" />
          <TextareaAutosize
            minRows={5}
            maxRows={10}
            style={{ resize: "none" }}
            placeholder="Enter your article here"
            {...register("body")}
          />
          <TextField {...register("email")} type="email" placeholder="Email" />
          <Button type="submit" variant="outlined">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateArticle;
