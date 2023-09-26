import React from 'react';
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          letterSpacing: '-.02em',
          fontWeight: 700,
          background: 'white',
        }}
      >
        <div
          style={{
            left: 42,
            top: 42,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
          }}
        ></div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '20px 50px',
            margin: '10px 42px',
            fontSize: 40,
            width: '70vw',
            textAlign: 'center',
            backgroundColor: 'black',
            color: 'white',
            lineHeight: 1.4,
          }}
        >
          台服SET9.5分組衝分賽
        </div>
        <div
          style={{
            fontSize: 50,
          }}
        >
          X
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '20px 50px',
            margin: '10px 42px',
            fontSize: 40,
            width: '70vw',
            textAlign: 'center',
            backgroundColor: 'black',
            color: 'white',
            lineHeight: 1.4,
          }}
        >
          台服TFT天梯前五十排名
        </div>
      </div>
    ),

    {
      width: 800,
      height: 400,
      debug: false,
      fonts: [
        {
          name: "Grotesk",
          data: groteskRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Grotesk",
          data: groteskSemibold,
          style: "normal",
          weight: 600,
        },
      ],
    }
  );
}
