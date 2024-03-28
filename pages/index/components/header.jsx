import React from 'react';


function Header() {
  const style = {
    textShadow: '-1px -1px 5px black, 1px -1px 5px black, -1px 1px 5px black, 1px 1px 5px black',
  };


  return (
    <div className='header font-bold text-5xl m-5'>
      <h1 className='text-[#c6d9ec]' style={style}>
        S11巴豆龍杯衝分賽
      </h1>
    </div>
  );
}

export default Header;
