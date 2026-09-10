import React from 'react';

const Title = ({ title, subTitle, align }) => {
  return (
    <div className={`flex flex-col space-y-2 mb-8 ${align === "left" ? "items-start text-left" : "items-center text-center"}`}>
      <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
        {title}
      </h2>
      {subTitle && (
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
          {subTitle}
        </p>
      )}
    </div>
  );
};

export default Title;










