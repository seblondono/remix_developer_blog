import { ActionFunction, Form, LoaderFunction, redirect, useActionData, useLoaderData, useTransition } from "remix";
import { createPost, getPost, Post } from "~/post";
import invariant from "tiny-invariant";
import { useMemo } from "react";

export const loader: LoaderFunction = async ({ params }) => {
  // await new Promise(res => setTimeout(res, 1000));
  invariant(params.slug, "expected params.slug");
  return getPost(params.slug);
}

type PostError = {
  title?: boolean;
  slug?: boolean;
  markdown?: boolean;
};

export const action: ActionFunction = async ({ request }) => {
  await new Promise(res => setTimeout(res, 1000));

  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");

  const errors: PostError = {};
  if (!title) errors.title = true;
  if (!slug) errors.slug = true;
  if (!markdown) errors.markdown = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  invariant(typeof title === "string");
  invariant(typeof slug === "string");
  invariant(typeof markdown === "string");

  await createPost({ title, slug, markdown });

  return redirect("/admin");
};

export default function EditPost() {
  const post = useLoaderData<Post>();
  const errors = useActionData();
  const transition = useTransition();

  return (
    <Form method="post">
      <p>
        <label>
          Post Title:{" "}
          {errors?.title ? (
            <em>Title is required</em>
          ) : null}
          <input key={`title-${post.slug}`} type="text" name="title" defaultValue={post.title} />
        </label>
      </p>
      <p>
        <label>
          Post Slug:{" "}
          {errors?.slug ? <em>Slug is required</em> : null}
          <input key={`slug-${post.slug}`} type="text" name="slug" defaultValue={post.slug} />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown:</label>{" "}
        {errors?.markdown ? (
          <em>Markdown is required</em>
        ) : null}
        <br />
        <textarea key={`markdown-${post.slug}`} rows={20} cols={120} name="markdown" defaultValue={post.markdown} />
      </p>
      <p>
      <button type="submit">
          {transition.submission
            ? "Editing..."
            : "Editing Post"}
        </button>
      </p>
    </Form>
  );
}
