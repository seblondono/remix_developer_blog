import { Link, Outlet, useLoaderData } from "remix";
import { getPosts } from "~/post";
import type { PostSummary } from "~/post";
import adminStyles from "~/styles/admin.css";

export const links = () => {
  return [{ rel: "stylesheet", href: adminStyles }];
};

export const loader = () => {
  return getPosts();
};

export default function Admin() {
  const posts = useLoaderData<PostSummary[]>();
  return (
    <div className="admin">
      <nav>
        <h1>Admin</h1>
        <ul>
          {posts.map(post => (
            <li key={post.slug}>
              <Link to={`edit/${post.slug}`}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}