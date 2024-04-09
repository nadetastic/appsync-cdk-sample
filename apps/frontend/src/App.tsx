import { useEffect, useState } from "react";
import "./App.css";
import { amplifyClient } from "./main";
import AppSync from "./assets/appsync";

type FormDataType = { title: string; content?: string };
function App() {
  const [formData, setFormData] = useState<FormDataType>();
  const [posts, setPosts] = useState<Array<FormDataType>>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const data = await amplifyClient.graphql({
        query: `query MyQuery{
          getPost{
            id
            title
          }
        }`,
      });
      console.log(data);
      setPosts(data.data.getPost);
    } catch (e) {
      console.log(e);
    }
  };

  const addData = async () => {
    try {
      const result = await amplifyClient.graphql({
        query: `mutation MyMutation {
          createPost(input: {
            title: "${formData?.title}",
            content: "${formData?.content}"
          }) {
            id
          }
        }`,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <AppSync />
      </div>
      <h1>AppSync + CDK</h1>
      <div className="card">
        <div>
          <input
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Title"
          />
        </div>
        <div>
          <textarea
            placeholder="Content"
            onChange={(e) =>
              setFormData({
                ...formData,
                content: e.target.value,
              } as FormDataType)
            }
          ></textarea>
        </div>
        <div>
          <button onClick={addData}>Add Data</button>
        </div>
      </div>
      <hr />
      <div>POSTS</div>
      <div>
        {posts &&
          posts.length > 0 &&
          posts.map((p) => {
            return <div>- {p.title}</div>;
          })}
      </div>
      <p className="read-the-docs">
        An AppSync with CDK + React frontend sample.
      </p>
    </>
  );
}

export default App;
