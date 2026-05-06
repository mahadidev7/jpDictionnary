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
  const [isSlider, setIsSlider] = useState(true);

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
          <button
            className="bg-black p-2 text-white rounded"
            onClick={() => shuffle()}
          >
            shuffle
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-normal items-center gap-2 p-4">
        {lessonVocab?.map((vocab, index) => (
          <div
            key={index}
            onClick={() => {
              setSliderActiveVocab(index);
            }}
            className="flex justify-between items-center"
          >
            <div className="">
              <p className="text-[22px] font-bold text-[#000000]">
                {vocab?.japanese},
              </p>
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
