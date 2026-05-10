"use client";
import { useState } from "react";
import { jpN5 } from "../data/jpN5";
type VocabItem = {
  japanese: string;
  pronounce: string;
  english: string;
  bangle: string;
  kanji: string;
  english_pronounce?: string;
};

export default function Flitter() {
  const [lessonVocab, setLessonVocab] = useState<VocabItem[]>([]);
  const [sliderActiveVocab, setSliderActiveVocab] = useState(0);
  const [isBangla, setIsBangla] = useState(true);
  const [isShowCheckJapanese, setIsShowCheckJapanese] = useState(false);
  const [typeKey, setTypeKey] = useState("");

  const handleClick = (data: VocabItem[]) => {
    setLessonVocab(data);
  };

  function shuffle() {
    // Use the spread operator to avoid mutating the original array
    const shuffled = [...lessonVocab];

    for (let i = shuffled.length - 1; i > 0; i--) {
      // Generate a random index between 0 and i
      const j = Math.floor(Math.random() * (i + 1));

      // Swap elements using destructuring assignment
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setLessonVocab(shuffled);
  }

  const handelPOPUPFun = (url: string) => {
    window.open(url, "_blank", "width=500,height=700");
  };

  const handelCheck = () => {
    setIsShowCheckJapanese(true);
  };

  return (
    <>
      <div className="flex overflow-auto w-full p-2 gap-2">
        {jpN5?.map((word, index) => (
          <div key={index} className="">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleClick(word.lessonVocabList)}
            >
              <p className="text-lg font-bold">{word.lesson}</p>
            </button>
          </div>
        ))}
      </div>
      <div className="flex w-full p-2 gap-2">
        <div className="flex overflow-auto  gap-2 items-center">
          <button
            className="bg-black p-2 text-white rounded"
            onClick={() =>
              handelPOPUPFun(
                `https://www.japandict.com/?s=${lessonVocab[sliderActiveVocab]?.japanese}&lang=eng`,
              )
            }
          >
            japandict
          </button>
          <button
            className="bg-black p-2 text-white rounded"
            onClick={() =>
              handelPOPUPFun(
                `https://takoboto.jp/?q=${encodeURIComponent(lessonVocab[sliderActiveVocab]?.japanese)}`,
              )
            }
          >
            takoboto
          </button>
          <button
            className="bg-black p-2 text-white rounded"
            onClick={() =>
              handelPOPUPFun(
                `https://jisho.org/search/${encodeURIComponent(lessonVocab[sliderActiveVocab]?.japanese)}`,
              )
            }
          >
            jisho
          </button>
          <button
            className="bg-black p-2 text-white rounded"
            onClick={() => shuffle()}
          >
            shuffle
          </button>
          <button
            className="bg-black p-2 text-white rounded"
            onClick={() => setIsBangla(!isBangla)}
          >
            Bangla-Japanese
          </button>
        </div>
      </div>

      <div className="mt-14">
        <div className="flex justify-center items-center p-2">
          <div className="border border-gray-300 rounded p-2  md:w-2/3">
            <div className="mb-2 flex flex-col justify-center items-center">
              <div className="flex flex-row gap-2 justify-end items-end w-full px-4">
                <button
                  className="bg-[#333] text-white font-bold p-1 rounded"
                  onClick={() => handelCheck()}
                >
                  Check
                </button>
              </div>
              <input
                type="text"
                value={typeKey}
                onChange={(e) => setTypeKey(e.target.value)}
                className="border border-gray-300 rounded p-1 w-full m-2 text-[#000000]"
              />
              {isShowCheckJapanese && (
                <p
                  className={`px-1 text-[18px] text-[#000000] text-start w-full ${typeKey.trim().toLowerCase() === lessonVocab[sliderActiveVocab]?.japanese.toLowerCase() ? "text-green-500" : "text-red-500"}`}
                >
                  {lessonVocab[sliderActiveVocab]?.japanese}
                </p>
              )}
            </div>

            <div className="">
              <p className="text-lg text-[#000000]">
                ({lessonVocab[sliderActiveVocab]?.english || "---"})
              </p>
              <p className="text-[14px] text-[#000000]">
                {lessonVocab[sliderActiveVocab]?.bangle || "---"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center w-full p-2 mb-9 gap-3">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setSliderActiveVocab((prev) => Math.max(0, prev - 1));
              setTypeKey("");
              setIsShowCheckJapanese(false);
            }}
          >
            Previous
          </button>
          <p className="text-center text-[16px] text-[#000000]">
            {sliderActiveVocab + 1} / {lessonVocab.length}
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setSliderActiveVocab((prev) =>
                Math.min(lessonVocab.length - 1, prev + 1),
              );
              setTypeKey("");
              setIsShowCheckJapanese(false);
            }}
          >
            Next
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-normal items-center gap-2 p-4 mt-65">
        {lessonVocab?.map((vocab, index) => (
          <div
            key={index}
            onClick={() => {
              setSliderActiveVocab(index);
            }}
            className="flex justify-between items-center"
          >
            <div
              className={` ${sliderActiveVocab === index ? "bg-gray-300 px-1 rounded" : ""} cursor-pointer`}
            >
              {isBangla ? (
                <p className="text-[22px] font-bold text-[#000000]">
                  {vocab?.japanese},
                </p>
              ) : (
                <p className="text-[16px] text-[#000000]">{vocab?.bangle},</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="vocab-list flex flex-wrap justify-normal items-center gap-2 p-1">
        <div className=" w-full">
          <p className="text-[30px] font-bold text-[#000000]">
            {lessonVocab[sliderActiveVocab]?.japanese}
          </p>
          <p className="text-[16px] text-[#000000]">
            ( {lessonVocab[sliderActiveVocab]?.pronounce} )
          </p>
          <p className="text-lg text-[#000000] w-[20%] ">
            {lessonVocab[sliderActiveVocab]?.bangle}
          </p>
        </div>
      </div>
    </>
  );
}
