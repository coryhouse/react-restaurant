import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <>
      <h1>About</h1>
      <p>This Restaurant management app uses React and json-server</p>
    </>
  );
}
