import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hook/use-requeste";

const NewTask = (props) => {
  const { isLoading, error, sendRequeste: sendTaskRequest } = useHttp();
  const transformTask = (taskText  ,data) => {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    // setCreatedTask(createdTask);
    props.onAddTask(createdTask);
  };
  const enterTaskHandler = async (taskText) => {
    sendTaskRequest(
      {
        url: "https://react-http-5605a-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { text: taskText },
      },
      transformTask.bind(null, taskText)
    );
  };
  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
