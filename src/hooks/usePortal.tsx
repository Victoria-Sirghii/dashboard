import { useEffect, useRef } from "react";

/**
 * A react hook that returns HTMLDivElement used as poral target.
 * See `HeaderComponent` for an practical example.
 *
 * It will create an new div element which will be appended
 * in your parent element selected by a provided component id.
 *
 * @param component
 * Selector of used element for portal creation
 * Note: It should be an `ebs` element.
 *
 * Ex: component `my__element` will search for id `#ebs-my__element`
 *
 * @param className
 * Optional string class passed over to created portal `div` element.
 */
const usePortal = (component: string, className?: string): HTMLDivElement => {
  const selector = component;
  const rootElemRef = useRef(document.createElement("div"));

  if (className) {
    rootElemRef.current.className = className;
  }

  useEffect(() => {
    const parentElem = document.querySelector(selector);

    if (parentElem) {
      parentElem.appendChild(rootElemRef.current);
    } else {
      console.warn(`Element with id: \`${selector}\` was not found`);
    }

    // Remove existend component on unmount
    return (): void => {
      // rootElemRef is not an React Element
      // eslint-disable-next-line
      rootElemRef.current.remove();
    };
  }, [selector]);

  return rootElemRef.current;
};

export default usePortal;
