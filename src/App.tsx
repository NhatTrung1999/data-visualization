import { useState } from 'react';
import { IoMenu } from 'react-icons/io5';

const App = () => {
  const [openSidebar, setOpenSidebar] = useState(true);

  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <div className=" flex h-screen">
      {/* sidebar */}
      {openSidebar ? (
        <div className="w-sm overflow-y-auto">
          <div className="bg-blue-500 h-[70px] text-2xl font-bold flex justify-center items-center text-white">
            LYV
          </div>
          <div className="p-2 flex flex-col gap-2">
            <div>
              <div className="text-lg font-bold text-blue-300">SQL Editor</div>
              <textarea
                className="border w-full rounded-md outline-none border-blue-300 p-2 text-gray-400 font-semibold text-lg"
                rows={5}
              ></textarea>
            </div>
            <button className="bg-blue-400 w-full text-white font-bold py-2 text-base rounded-md cursor-pointer">
              Query
            </button>
            <div>
              <div className="text-lg font-bold text-blue-300">Columns</div>
              <div className="h-40 border rounded-md border-blue-300"></div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-300">Type Report</div>
              <select className="w-full border border-blue-300 py-1.5 rounded-md px-1 font-semibold text-gray-500 outline-none">
                <option value="">Choose option</option>
                <option value="">Sum</option>
                <option value="">Average</option>
                <option value="">Max</option>
                <option value="">Min</option>
                <option value="">Top N</option>
              </select>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-300">Type Map</div>
              <select className="w-full border border-blue-300 py-1.5 rounded-md px-1 font-semibold text-gray-500 outline-none">
                <option value="">Choose option</option>
                <option value="">Column</option>
                <option value="">Line</option>
                <option value="">Pie</option>
                <option value="">Scatter plot</option>
              </select>
            </div>
            <button className="bg-blue-400 w-full text-white font-bold py-2 text-base rounded-md cursor-pointer">
              Create Report
            </button>
          </div>
        </div>
      ) : null}

      {/* content */}
      <div className="flex-1 flex flex-col">
        <div className="bg-[#efefef] h-[70px] text-3xl text-gray-500 font-bold flex justify-center items-center relative">
          <div
            className="absolute left-5 text-gray-500 cursor-pointer"
            onClick={handleOpenSidebar}
          >
            <IoMenu className="size-8" />
          </div>
          Data Visualization
        </div>
        <div className="bg-gray-300 flex-1 p-2 overflow-y-auto">
          <div className="w-full h-100 bg-white"></div>
          <div className="w-full h-100 bg-white"></div>
          <div className="w-full h-100 bg-white"></div>
          <div className="w-full h-100 bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default App;
