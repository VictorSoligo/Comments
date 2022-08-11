import { useAuth } from '../contexts/Auth';

export const LoginCard = () => {
  const { signInUrl } = useAuth();

  return (
    <div className="flex mb-4">
      <a
        href={signInUrl}
        className="text-white bg-[#333] py-2 px-5 rounded-md font-semibold"
      >
        Login with Github
      </a>
    </div>
  );
};
