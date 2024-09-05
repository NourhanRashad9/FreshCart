import React from "react";


export default function LoadingSpinner() {
  return (
    <>
      <div className=" fixed inset-0 flex  justify-center bg-emerald-500/25 z-50 items-center min-h-screen">
        <div className="flex items-center space-x-3 spinner-container rtl:space-x-reverse animate__animated animate__flash">
         
          <div className="self-center text-2xl font-semibold pr-4 whitespace-nowrap spinner dark:text-white">
            
          </div>
        </div>
      </div>
    </>
  );
}

