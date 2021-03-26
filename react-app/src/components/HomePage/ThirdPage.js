import React from 'react';
import Text from '../../assets2/thirdpagtxt.png'

export function ThirdPage() {
    return (
      <>
        <div className="relative w-full h-screen bg-rose">
          <img
            src={Text}
            alt="who"
            className="absolute h-20 bottom-24 right-0"
          />
          {/* <div className="relative z-50 bg-white bottom-10">
            <button className="absolute right-8 z-50 text-white bg-white-700 hover:bg-gray-100 font-semibold py-2 px-4 border border-gray-400 rounded shadow ">
              Get started
            </button>
          </div> */}
        </div>
      </>
    );
}