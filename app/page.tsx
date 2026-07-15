"use client";
import { useState } from "react";
import { jpN5 } from "./data/jpN5";

type VocabItem = {
  japanese: string;
  pronounce: string;
  english: string;
  bangle: string;
  kanji: string;
  audio?: string;
  english_pronounce?: string;
};

export default function Home() {
  const [lessonVocab, setLessonVocab] = useState<VocabItem[]>(
    jpN5[0]?.lessonVocabList,
  );
  const [sliderActiveVocab, setSliderActiveVocab] = useState(0);
  const [isSlider, setIsSlider] = useState(true);
  const [iscloseDrower, setIsCloseDrower] = useState(false);
  const [showText, setShowText] = useState<keyof VocabItem>("japanese");
  const [isAudio, setIsAudio] = useState(false);

  const handleClick = (data: VocabItem[]) => {
    setLessonVocab(data);
    setSliderActiveVocab(0);
  };

  const handelPOPUPFun = (url: string) => {
    window.open(url, "_blank", "width=500,height=700");
  };
  const closeDrowerHandler = () => {
    setIsCloseDrower(!iscloseDrower);
  };

  const audioHandler = (audioData: keyof VocabItem) => {
    setShowText(audioData);
    setIsAudio(true);
  };

  const showTextHandler = (data: keyof VocabItem) => {
    setShowText(data);
    setIsAudio(false);
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
    setSliderActiveVocab(0);
  }

  return (
    <div className="relative w-full h-screen flex flex-col justify-start items-center">
      <div className="flex overflow-auto w-full p-2 gap-2 border-b-2 mb-4 py-9 md:py-4">
        <select
          className="bg-[#D9D9D9] p-1 text-black rounded"
          onChange={(e) => {
            const lessonIndex = Number(e.target.value);
            if (!Number.isNaN(lessonIndex)) {
              handleClick(jpN5[lessonIndex]?.lessonVocabList || []);
            }
          }}
        >
          <option value="" disabled>
            Select a lesson
          </option>
          {jpN5?.map((word, index) => (
            <option
              key={index}
              value={index}
              onClick={() => handleClick(word.lessonVocabList)}
            >
              {word.lesson}
            </option>
          ))}
        </select>
        <button
          className="bg-[#D9D9D9] p-2 text-[#555] rounded-[10px] px-4"
          onClick={() => setIsSlider(false)}
        >
          All
        </button>
        <button
          className="bg-[#D9D9D9] p-2 text-[#555] rounded-[10px] px-4"
          onClick={() => setIsSlider(true)}
        >
          slider
        </button>
        <button
          className="bg-[#D9D9D9] p-2 text-[#555] rounded-[10px] px-4"
          onClick={() =>
            handelPOPUPFun(
              `https://www.japandict.com/?s=${lessonVocab[sliderActiveVocab]?.japanese}&lang=eng`,
            )
          }
        >
          japandict
        </button>
        <button
          className="bg-[#D9D9D9] p-2 text-[#555] rounded-[10px] px-4"
          onClick={() =>
            handelPOPUPFun(
              `https://takoboto.jp/?q=${encodeURIComponent(lessonVocab[sliderActiveVocab]?.japanese)}`,
            )
          }
        >
          takoboto
        </button>
        <button
          className="bg-[#D9D9D9] p-2 text-[#555] rounded-[10px] px-4"
          onClick={() =>
            handelPOPUPFun(
              `https://jisho.org/search/${encodeURIComponent(lessonVocab[sliderActiveVocab]?.japanese)}`,
            )
          }
        >
          jisho
        </button>
        <button
          className="bg-[#D9D9D9] p-2 text-[#555] rounded-[10px] px-4"
          onClick={() => shuffle()}
        >
          shuffle
        </button>
      </div>

      {isSlider ? (
        <>
          <div className="flex flex-col justify-center items-center w-full border">
            <p className="text-[#666] text-left md:w-1/2 w-full px-2">{showText}</p>
            <div className="border border-gray-300 rounded-xl py-22 p-2 md:w-1/2 w-full bg-[#096992]">
              <div className="flex flex-col justify-end items-center">
                {isAudio ? (
                  lessonVocab[sliderActiveVocab]?.audio ? (
                    <div className="flex flex-col justify-center items-center gap-2">
                      <iframe
                        width="300"
                        height="100"
                        allow="autoplay; encrypted-media"
                        src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%${lessonVocab[sliderActiveVocab]?.audio}&color=%23ff5500&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false`}
                      ></iframe>
                      <input
                        className="bg-[#D9D9D9] p-2 text-black rounded px-4 w-full mt-2 outline-none"
                        type="text"
                        placeholder="Enter listening word"
                      />
                      <button className="bg-[#D9D9D9] hover:opacity-80 text-black py-2 px-4 rounded w-full">
                        Submit
                      </button>
                    </div>
                  ) : (
                    <p className="text-[16px]  text-red-300">
                      Audio not available
                    </p>
                  )
                ) : (
                  <p className="text-[30px] font-bold text-white">
                    {lessonVocab[sliderActiveVocab]?.[showText]}
                  </p>
                )}
              </div>
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
            <button
              className="bg-amber-700 p-2 rounded"
              onClick={() => closeDrowerHandler()}  >Show Details</button>
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
                <p className="text-[16px] text-[#000000]">
                  ( {vocab?.english_pronounce} )
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

      <div className="flex flex-wrap gap-2 justify-center items-center w-full p-2">
        <a
          href="https://mahadidev7.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#111111] my-6 text-center text-[14px]"
        >
          Created By @mahadidev7
        </a>
      </div>

      {/* drower  */}
      {iscloseDrower && (
        <div className="absolute top-0 right-0 p-4 bg-[#D9D9D9] md:w-1/3 w-full h-full">
          <div className="border border-gray-300 rounded-xl p-4 w-full">
            <div className="flex flex-col gap-3">
              <button
                className="bg-amber-700 p-2 rounded mb-8"
                onClick={() => closeDrowerHandler()}
              >
                close
              </button>
              <p
                className="text-[30px] font-bold text-[#000000] border-b-2 border-gray-200"
                onClick={() => showTextHandler("japanese")}
              >
                {lessonVocab[sliderActiveVocab]?.japanese}
              </p>
              <p
                className="text-[16px] text-[#000000] border-b border-gray-200"
                onClick={() => showTextHandler("pronounce")}
              >
                ( {lessonVocab[sliderActiveVocab]?.pronounce} )
              </p>
              <p
                className="text-lg text-[#000000] border-b border-gray-200"
                onClick={() => showTextHandler("english")}
              >
                {lessonVocab[sliderActiveVocab]?.english || "---"}
              </p>
              <p
                className="text-[14px] text-[#000000] border-b border-gray-200"
                onClick={() => showTextHandler("bangle")}
              >
                {lessonVocab[sliderActiveVocab]?.bangle || "---"}
              </p>
              <p
                className="text-[25px] text-[#000000] border-b border-gray-200"
                onClick={() => showTextHandler("kanji")}
              >
                {lessonVocab[sliderActiveVocab]?.kanji || "---"}
              </p>
              <p
                className="text-[25px] text-[#000000] border-b border-gray-200"
                onClick={() => audioHandler("audio")}
              >
                listening test: {lessonVocab[sliderActiveVocab]?.audio || "---"}
              </p>
              <iframe
                width="300"
                height="100"
                allow="autoplay; encrypted-media"
                src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%${lessonVocab[sliderActiveVocab]?.audio}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false`}
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
