export const AddCommentForm = () => {
  return (
    <div className="mt-4 flex w-11/12 md:w-3/5 bg-white p-6 rounded-lg">
      <div>
        <img
          className="rounded-full mr-4"
          src="https://avatars.githubusercontent.com/u/54515535?v=4"
          height={40}
          width={40}
        />
      </div>

      <div className="w-full mx-4">
        <textarea
          placeholder="Add a comment"
          className="p-2 w-full text-md placeholder-gray-500 text-gray-500 border border-gray-200 bg-transparent rounded-lg resize-none focus:border-indigo-700 outline-none"
        ></textarea>
      </div>

      <div>
        <button className="py-2 px-5 bg-indigo-700 rounded-md uppercase text-white text-sm font-semibold hover:bg-indigo-500 transition-colors">
          Send
        </button>
      </div>
    </div>
  );
};