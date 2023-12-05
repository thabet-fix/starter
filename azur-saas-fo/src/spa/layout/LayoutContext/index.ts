import React, { Dispatch, SetStateAction, useContext } from 'react';

type LayoutContextValue = {
  isFocusMode: boolean;
  setIsFocusMode: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  navIsOpen: boolean;
  navOnOpen: () => void;
  navOnClose: () => void;
  showSideMenu: boolean;
  setShowSideMenu: Dispatch<SetStateAction<boolean>>;
  runTour: boolean; 
  setRunTour: React.Dispatch<React.SetStateAction<boolean>>; 
  stepIndex: number; 
  setStepIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const LayoutContext = React.createContext<LayoutContextValue>({
  isFocusMode: false,
  setIsFocusMode: undefined,
  navIsOpen: false,
  navOnOpen: () => undefined,
  navOnClose: () => undefined,
  showSideMenu: true,
  setShowSideMenu: () => undefined,
  runTour: false,
  setRunTour: () => undefined,
  stepIndex: 0,
  setStepIndex: () => undefined,
});
export const useLayoutContext = () => useContext(LayoutContext);
