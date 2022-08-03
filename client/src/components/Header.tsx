import { useAuth } from '../contexts/Auth';

export const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="flex justify-between items-center w-11/12 md:w-[65%] mb-4">
      <div className="flex items-center">
        <img
          className="rounded-full mr-4"
          src={user?.avatar_url}
          height={40}
          width={40}
        />

        <span className="font-semibold text-gray-800">{user?.login}</span>
      </div>

      <button onClick={signOut}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      </button>
    </div>
  );
};
