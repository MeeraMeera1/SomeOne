import React from "react";
import FirstBoy from "../../assets2/cutemessboy2.svg";
import Text from "../../assets2/secpagtxt.svg";
import PText from "../../assets2/paragraph.png"; 
import SecBoy from "../../assets2/bluboysecpag.svg"
import YellG from "../../assets2/yellowgirlsecpag.svg"
import Fav from "../../assets2/cutegirl.svg";
import Bub from "../../assets2/Cutemessagebub.svg";

export function SecondPage() {
    return (
      <div className="relative w-full h-screen bg-orange">
        <img src={FirstBoy} alt="callme" className="absolute top-20" />
        <div className="relative top-20">
          <img
            src={Text}
            alt="whacha"
            className="absolute left-64 top-96 w-1/2 "
          />
        </div>
        <img src={PText} alt="par" className="absolute w-1/2 left-52 top-8" />
        <div className="relative right-40">
          <img src={SecBoy} alt="blu" className="absolute right-24 top-14" />
        </div>
        <img src={YellG} alt="yel" className="absolute h-64 right-12 top-6" />
        <div className="relative top-40 right-14">
          <img
            src={Bub}
            alt="bub"
            className="absolute right-24 z-10 top-20 h-20"
          />
        </div>
        <img src={Fav} alt="sc" className="absolute right-8 h-4/6 bottom-8" />
      </div>
    );
}