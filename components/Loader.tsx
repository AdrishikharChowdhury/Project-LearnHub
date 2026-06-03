import React from "react";

import { DotmSquare18 } from "@/components/ui/dotm-square-18";

export const Loader = () => {
  return <main className="flex justify-center items-center h-screen">
    <DotmSquare18 size={32} dotSize={4} speed={1.2} bloom />
  </main>;
};

export default Loader;
