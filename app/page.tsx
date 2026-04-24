"use client";
import { useState } from "react";
import { jpN5 } from "./data/jpN5";

type VocabItem = {
  japanese: string;
  pronounce: string;
  english: string;
  bangle: string;
  kanji: string;
};

export default function Home() {
  const [lessonVocab, setLessonVocab] = useState<VocabItem[]>([]);
  const [sliderActiveVocab, setSliderActiveVocab] = useState(0);
  const [isSlider, setIsSlider] = useState(true);

  const handleClick = (data: VocabItem[]) => {
    setLessonVocab(data);
  };

  const handelPOPUPFun = (url: string) => {
    window.open(url, "_blank", "width=500,height=700");
  };

  return (
    <>
      <div className="flex flex-wrap w-full p-2 gap-2">
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

      <div className="flex flex-wrap w-full p-2 gap-2">
        <button
          className="bg-black p-2 text-white rounded"
          onClick={() => setIsSlider(false)}
        >
          All
        </button>
        <button
          className="bg-black p-2 text-white rounded"
          onClick={() => setIsSlider(true)}
        >
          slider
        </button>
        <div className="flex flex-wrap gap-2 justify-end items-center">
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
        </div>
      </div>

      {isSlider ? (
        <>
          <div className="flex justify-center items-center w-full p-2">
            <div className="border border-gray-300 rounded p-2 min-w-full">
              <div className="mb-2 flex justify-center items-end">
                <p className="text-center text-[30px] font-bold text-[#000000]">
                  {lessonVocab[sliderActiveVocab]?.japanese}
                </p>
                <p className="text-center text-[16px] text-[#000000]">
                  ( {lessonVocab[sliderActiveVocab]?.pronounce} )
                </p>
              </div>

              <p className="text-center text-lg text-[#000000]">
                {lessonVocab[sliderActiveVocab]?.english}
              </p>
              <p className="text-center text-[14px] text-[#000000]">
                {lessonVocab[sliderActiveVocab]?.bangle}
              </p>
              <p className="text-center text-[14px] text-[#000000]">
                {lessonVocab[sliderActiveVocab]?.kanji}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center w-full p-2 mb-9 gap-3">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() =>
                setSliderActiveVocab((prev) => Math.max(0, prev - 1))
              }
            >
              Previous
            </button>
            <p className="text-center text-[16px] text-[#000000]">
              {sliderActiveVocab + 1} / {lessonVocab.length}
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() =>
                setSliderActiveVocab((prev) =>
                  Math.min(lessonVocab.length - 1, prev + 1),
                )
              }
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="vocab-list flex flex-wrap justify-normal items-center gap-2 p-1">
          {lessonVocab?.map((vocab, index) => (
            <div
              key={index}
              onClick={() => {
                setSliderActiveVocab(index);
              }}
              className="border-b border-gray-300 rounded p-2 w-full flex flex-row justify-between items-center"
            >
              <div className="w-[20%] ">
                <p className="text-[30px] font-bold text-[#000000]">
                  {vocab?.japanese}
                </p>
                <p className="text-[16px] text-[#000000]">
                  ( {vocab?.pronounce} )
                </p>
              </div>
              <p className="text-[14px] text-[#000000] w-[20%]">
                {vocab?.kanji}
              </p>
              <p className="text-lg text-[#000000] w-[20%] ">
                {vocab?.english}
              </p>
              <p className="text-[14px] text-[#000000] w-[20%]">
                {vocab?.bangle}, [{index + 1}]
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
