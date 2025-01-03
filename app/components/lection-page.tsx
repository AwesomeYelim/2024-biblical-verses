"use client";

import React, { useEffect, useState } from "react";
import randomIndex from "@/app/components/random-index";
import DomToImage from "dom-to-image";
import Image from "next/image";
interface Props {
  words: { [key in string]: string }[];
}

const ImgEl = ({
  name,
  size,
  style,
}: {
  name: string;
  size: { width: number; height: number };
  style?: React.CSSProperties & React.RefAttributes<HTMLImageElement>;
}) => {
  const extention = name.includes(".");
  return (
    <Image
      className={extention ? name.split(".")[0] : name}
      src={extention ? `/images/${name}` : `/images/${name}.svg`}
      alt={name}
      loading="eager"
      priority
      style={style}
      {...size}
    />
  );
};
type IS = { [x: string]: string };
export const LectionPage = ({ words }: Props): JSX.Element => {
  const [modal, setModal] = useState(false);
  const [delay, setDelay] = useState(false);
  const target = words[randomIndex(words.length)];
  const [lection, setLection] = useState<IS>({});
  const images = ["kakao", "url", "imgdown", "instagram"];

  useEffect(() => {
    if (modal) setTimeout(() => setDelay(modal), 1000);
    else setDelay(modal);
    setLection(target);
  }, [modal]);

  const saveImg = (url: string, filename: string) => {
    let link = document.createElement("a");

    document.body.appendChild(link);

    link.href = url;
    link.download = filename;
    link.click();

    document.body.removeChild(link);
  };

  const imgdown = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();

    const target = document.querySelector(".modal");

    (target as Element & { style: { top: string } }).style.top = "";
    (target as Element & { style: { left: string } }).style.left = "";
    // (target as Element & { style: { opacity: number } }).style.opacity = 1;

    const options = {
      width: target!.clientWidth,
      height: target!.clientHeight,
    };

    DomToImage.toPng(target as Element, options)
      .then((dataUrl) => {
        saveImg(dataUrl, "2025_bible_verses.png");
      })
      .catch((error) => {
        console.error("Error capturing image:", error);
      });
  };

  return (
    <div className="lection_wrap">
      <div className="letter">
        <ImgEl
          name="letter-back"
          size={{ width: 530, height: 132 }}
          style={delay ? { opacity: 0 } : {}}
        />
        {modal && (
          <div
            className="modal"
            style={{ top: "-100%", left: "25%", zIndex: delay ? 100 : 5 }}
          >
            <ImgEl name="line" size={{ width: 76, height: 104 }} />
            <ImgEl name="top_img" size={{ width: 110, height: 110 }} />

            <div className="text_area">
              <p>{lection.description}</p>
              <p>{lection.from}</p>
            </div>

            {/* <div className="sns_icon">
              {images.map((el) => {
                return (
                  <ImgEl
                    key={el}
                    name={`sns/${el}`}
                    size={{ width: 26, height: 25 }}
                  />
                )
              })}
            </div> */}
            <ImgEl name="bottom_img" size={{ width: 76, height: 104 }} />
          </div>
        )}
        <ImgEl
          name="letter-after"
          size={{ width: 530, height: 260 }}
          style={delay ? { opacity: 0 } : {}}
        />
        <ImgEl
          name="letter-cover.png"
          size={{ width: 530, height: 186 }}
          style={{
            transformOrigin: "top center",
            transform: modal ? "rotateX(-180deg)" : "",
            opacity: delay ? 0 : 1,
          }}
        />
      </div>
      {!modal && (
        <button
          className="lection-button"
          onClick={() => {
            setModal(!modal);
          }}
        >
          2025 내게 주신 하나님의 말씀
        </button>
      )}
      {modal && (
        <div className="after_img_btn">
          <button className="down_btn" onClick={imgdown}>
            <ImgEl name={`sns/imgdown`} size={{ width: 26, height: 25 }} />
          </button>
          <button className="refresh_btn" onClick={() => setModal(false)}>
            다시 할래요 !
          </button>
        </div>
      )}
    </div>
  );
};
