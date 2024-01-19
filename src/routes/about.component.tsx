import { useUserContext } from "../UserContext";

export const component = function About() {
  const { user, setUser } = useUserContext();
  return (
    <>
      <div className="p-2">Hello {user?.name}!</div>
      <button
        className="p-2 border-2 border-gray-400"
        onClick={() => setUser(null)}
      >
        Logout
      </button>
    </>
  );
};
