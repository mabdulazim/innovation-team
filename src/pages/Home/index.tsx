import { Fragment } from "react";
import PostsList from "components/Post/List";

function HomePage() {
  return (
    <Fragment>
      <h1>All Posts</h1>
      <PostsList />
    </Fragment>
  );
}
  
export default HomePage;