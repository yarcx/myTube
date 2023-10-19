import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type SidebarContextProps = {
  children: ReactNode;
};

type SidebarContextType = {
  isLargeOpen: boolean;
  isSmallOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export const useSidebarContext = () => {
  const value = useContext(SidebarContext);
  if (value === null) throw Error("Cannot use context outside of Sidebar provider");

  return value;
};
const SidebarContextProvider = ({ children }: SidebarContextProps) => {
  const [isLargeOpen, setIsLargeOpen] = useState(true);
  const [isSmallOpen, setIsSmallOpen] = useState(true);

  useEffect(() => {
    const handler = () => {
      if (!isScreenSmall()) return setIsSmallOpen(false);
    };
    window.addEventListener("resize", handler);

    return () => window.removeEventListener("resize", handler);
  }, []);

  function isScreenSmall() {
    return window.innerWidth < 1024;
  }

  function toggle() {
    if (isScreenSmall()) {
      setIsSmallOpen(!isSmallOpen);
    } else {
      setIsLargeOpen(!isLargeOpen);
    }
  }

  function close() {
    if (isScreenSmall()) {
      setIsSmallOpen(false);
    } else {
      setIsLargeOpen(false);
    }
  }

  return (
    <SidebarContext.Provider value={{ isLargeOpen, isSmallOpen, toggle, close }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContextProvider;
