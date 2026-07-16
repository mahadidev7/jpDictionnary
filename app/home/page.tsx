"use client";
import { useState } from "react";
import { jpN5 } from "../data/jpN5";

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
  const [text, setText] = useState("");
  const [textError, setTextError] = useState("");
  const [Toggle, setToggle] = useState(false);

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

  const ToggleHandler = () => {
    setToggle(!Toggle);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleCheck = () => {
    if (text === lessonVocab[sliderActiveVocab]?.japanese) {
      setTextError("success");
      return;
    } else {
      setTextError("error");
      return;
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-start items-center">
      <div className="flex w-full p-2 gap-2 overflow-x-auto">
        <select
          id="framework"
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
      <div className="md:grid grid-cols-5 gap-2 my-18 min-h-150 w-full p-2">
        <div className="col-span-3  w-full flex flex-col justify-center items-center">
          <div className="md:w-2/3 w-full">
            <div className=" w-full ">
              <div className="flex justify-between items-center w-full px-2">
                <p className="text-[#666] text-left">{showText}</p>
                <button
                  className="text-[#666] cursor-pointer"
                  onClick={() => closeDrowerHandler()}
                >
                  Show Details
                </button>
              </div>
              <div className="border border-gray-300 rounded-xl py-22 md:px-2 p-4 w-full bg-[#096992]">
                <div className="flex flex-col justify-end items-center">
                  {isAudio ? (
                    lessonVocab[sliderActiveVocab]?.audio ? (
                      <div className="flex flex-col justify-center items-center gap-2">
                        <iframe
                          width="auto"
                          height="100"
                          allow="autoplay; encrypted-media"
                          src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%${lessonVocab[sliderActiveVocab]?.audio}&color=%23ff5500&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false`}
                        ></iframe>
                        <input
                          className={` p-2 text-black rounded px-4 w-full mt-2 outline-none ${textError === "error" ? "bg-[#f0aaaa]" : textError === "success" ? "bg-[#9ffadf]" : "bg-[#D9D9D9]"} `}
                          type="text"
                          value={text}
                          placeholder="Enter listening word"
                          onChange={handleChange}
                          onFocus={() => setTextError("54")}
                        />
                        <button
                          onClick={handleCheck}
                          className="bg-[#D9D9D9] hover:opacity-80 text-black py-2 px-4 rounded w-full"
                        >
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
            </div>
          </div>
        </div>
        <div className="w-full col-span-2">
          <div className=" p-4 bg-[#D9D9D9] w-full rounded-lg">
            <div className="border border-gray-300 rounded-xl p-4 w-full">
              <button
                className="bg-amber-700 p-2 rounded mb-8"
                onClick={() => ToggleHandler()}
              >
                {Toggle ? "close" : 'open'}
              </button>
              {Toggle && (
                <div className="flex flex-col gap-3">
                  <p
                    className="text-[18px] text-[#000000] border-b-2 border-gray-200"
                    onClick={() => showTextHandler("japanese")}
                  >
                    japanese: {lessonVocab[sliderActiveVocab]?.japanese}
                  </p>
                  <p
                    className="text-[16px] text-[#000000] border-b border-gray-200"
                    onClick={() => showTextHandler("pronounce")}
                  >
                    Bangla Pronounce:{" "}
                    {lessonVocab[sliderActiveVocab]?.pronounce}
                  </p>
                  <p
                    className="text-lg text-[#000000] border-b border-gray-200"
                    onClick={() => showTextHandler("english")}
                  >
                    English Pronounce :{" "}
                    {lessonVocab[sliderActiveVocab]?.english || "---"}
                  </p>
                  <p
                    className="text-[14px] text-[#000000] border-b border-gray-200"
                    onClick={() => showTextHandler("bangle")}
                  >
                    Bangla : {lessonVocab[sliderActiveVocab]?.bangle || "---"}
                  </p>
                  <p
                    className="text-[25px] text-[#000000] border-b border-gray-200"
                    onClick={() => showTextHandler("kanji")}
                  >
                    Kanji: {lessonVocab[sliderActiveVocab]?.kanji || "---"}
                  </p>
                  <p
                    className="text-[16px] text-[#000000] border-b border-gray-200"
                    onClick={() => audioHandler("audio")}
                  >
                    listening ID:{" "}
                    {lessonVocab[sliderActiveVocab]?.audio || "---"}
                  </p>
                  <iframe
                    width="auto"
                    height="100"
                    allow="autoplay; encrypted-media"
                    src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%${lessonVocab[sliderActiveVocab]?.audio}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false`}
                  ></iframe>
                  <button
                    className="mt-8 text-black cursor-pointer border p-2 rounded"
                    onClick={() => closeDrowerHandler()}
                  >
                    close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* footer  */}
      <div className="bg-[#034a53] w-full overflow-hidden">
        <div className="flex justify-center items-center gap-2 flex-col mt-28 p-3">
          <a
            href="https://mahadidev7.vercel.app/"
            target="_blank"
            className="text-lg italic capitalize"
          >
            Created By @mahadidev7
          </a>
          <p className="text-center md:w-3/5 w-full text-[16px]">
            This website was built with care for everyone learning Japanese. We
            hope it makes your studies easier and more enjoyable. Thank you for
            being part of our community, and please keep us in your prayers.
          </p>
          <div className=" rounded-full flex p-2 md:justify-between justify-center gap-2 md:gap-0 items-center mt-4 flex-wrap bg-black">
            <p className="text-[18px] px-9 pl-5 text-white">
              Free counseling form
            </p>
            <a
              href="https://forms.gle/X3BGRT5xHmX8Gj669"
              target="_blank"
              className="text-center text-black text-[18px] bg-white text-p_primary p-6 py-2 rounded-full"
            >
              Lets Go
            </a>
          </div>
        </div>
        <div className="flex justify-center items-center gap-9 flex-wrap my-10">
          <a
            href="https://twitter.com/mahadidev7"
            target="_blank"
            className="text-[18px] capitalize italic underline"
          >
            twitter
          </a>
          <a
            href="https://www.linkedin.com/in/mahadidev7/"
            target="_blank"
            className="text-[18px] capitalize italic underline"
          >
            linkedin
          </a>
          <a
            href="https://github.com/mahadidev7"
            target="_blank"
            className="text-[18px] capitalize italic underline"
          >
            github
          </a>
        </div>
        <div className="border-t border-borderGray ">
          <div className="flex justify-center items-center relative">
            <div className="md:w-[1440px] w-full undefined">
              <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="lg:col-span-2 lg:border-r border-borderGray  py-4 lg:pr-6">
                  <div className="md:flex justify-between items-center flex-wrap gap-2 px-2">
                    <div className="flex justify-between items-center md:items-start py-2 flex-col flex-wrap">
                      <p className="text-[16px] capitalize">Phone Number</p>
                      <p className="text-[18px] text-secondary className=">
                        +880 181 221 7803
                      </p>
                    </div>
                    <div className="flex justify-between items-center md:items-start py-2 flex-col flex-wrap">
                      <p className="text-[16px] capitalize">Email Address</p>
                      <p className="text-[18px] text-secondary className=">
                        mahadidev7@gmail.com
                      </p>
                    </div>
                    <div className="flex justify-between items-center md:items-start py-2 flex-col flex-wrap">
                      <p className="text-[16px] capitalize">location</p>
                      <p className="text-[18px] text-secondary className=">
                        Cumilla, Bangladesh
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 pl-3 py-4 flex justify-center items-center border-y lg:border-none border-borderGray">
                  <p className="lowercase text-[18px] text-center">
                    copyright &amp; Design By @mahadidev7 - 2026
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
