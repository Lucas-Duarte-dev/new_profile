import { createContext, ReactNode, useContext, useState } from "react";

type ModalContextData = {
  isActive: boolean;
  handleOpenModal(): void;
};

type ModalContextProps = {
  children: ReactNode;
};

export const ModalContext = createContext({} as ModalContextData);

export default function ModalContextProvider({ children }: ModalContextProps) {
  const [isActive, setIsActive] = useState(false);

  function handleOpenModal() {
    setIsActive(!isActive);
  }

  return (
    <ModalContext.Provider value={{ isActive, handleOpenModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  return useContext(ModalContext);
};
