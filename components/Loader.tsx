import React from "react";

import { DotmSquare18 } from "@/components/ui/dotm-square-18";

export const Loader = () => {
  return <main className="flex justify-center items-center h-screen bg-background">
    <div className="scale-50 sm:scale-75 md:scale-100">
      <DotmSquare18 size={32} dotSize={4} speed={1.2} bloom color="#01c78c" />
    </div>
  </main>;
};

export default Loader;
