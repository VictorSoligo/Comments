import { useAuth } from '../contexts/Auth';

export const LoginCard = () => {
  const { signInUrl } = useAuth();

  return (
    <div className="mb-6">
      <a
        href={signInUrl}
        className="text-white bg-[#333] py-2 px-5 rounded-md"
      >
        Login com Github
      </a>
    </div>
  );
};
