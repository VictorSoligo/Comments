import { FeedbackButton } from './FeedbackButton';
import { ReplyButton } from './ReplyButton';

export const Comment = () => {
  return (
    <div className="flex flex-row mb-4 last:mb-0 w-full bg-white p-6 rounded-lg">
      <div className="hidden md:block">
        <FeedbackButton />
      </div>

      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <img
              className="rounded-full mr-4"
              src="https://avatars.githubusercontent.com/u/54515535?v=4"
              height={30}
              width={30}
            />

            <span className="text-gray-800 font-semibold mr-4">
              VictorSoligo
            </span>

            <span className="text-gray-500">2 weeks ago</span>
          </div>

          <div className="hidden md:flex">
            <ReplyButton />
          </div>
        </div>

        <div className="text-gray-500">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus
          consequatur ullam laudantium eaque repudiandae nisi excepturi nobis
          asperiores illo recusandae aliquam consectetur inventore, culpa sed
        </div>

        <div className="flex md:hidden items-center justify-between mt-4">
          <FeedbackButton />

          <ReplyButton />
        </div>
      </div>
    </div>
  );
};
