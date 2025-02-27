declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.svg" {
  import React from "react";
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export { ReactComponent };
  export default ReactComponent;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const constent: string;
  export default content;
}

declare module "react-dom/client";
