import { LoaderFunction, useLoaderData } from "remix"
import invariant from "tiny-invariant";
import { getPost } from "~/post";

export default function PostSlug() {

  return (
    <div>
      <h1>Select a post to edit</h1>
    </div>
  );
}