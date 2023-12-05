import React, { useEffect, useRef, useState, useContext } from 'react';

import Joyride, { ACTIONS, CallBackProps } from 'react-joyride';
import { LayoutContext } from '../layout';


export const Guide = () => {
  const [steps] = useState([
    {
      target: '.guide-openTemplateMenu', // la classe de l'élément cible
      content: 'Bienvenue ! Pour commencer à envoyer ou signer des contrats, vous devez créer un template de document, ouvrez la page Template en cliquant sur ce bouton',
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      target: '.guide-addTemplateButton', // la classe de l'élément cible
      content: 'Cliquez ici pour ajouter un template.',
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      target: '.guide-boxAddTemplate', // la classe de l'élément cible
      content: 'Ajouter le nom du template.',
      disableBeacon: true,
      spotlightClicks: true,
    },
  ]);

  const {
    runTour,
    setRunTour,
    stepIndex,
    setStepIndex,
  } = useContext(LayoutContext);

  const joyrideRef = useRef<Joyride>(null);

  useEffect(() => {
    // 1. Vérifiez le stockage local
    const hasUserSeenTour = localStorage.getItem('hasUserSeenTour');

    // 2. Affichez le guide si nécessaire
    if (!hasUserSeenTour) {
      setRunTour(true);
    }
  }, []);


  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, type, status } = data;

    if (["finished", "skipped"].includes(status as string)) {
      localStorage.setItem('hasUserSeenTour', 'true');
    } 

    if (["step:after", "error:target_not_found"].includes(type as "step:after" | "error:target_not_found")) {
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
    }
  };

  return (
    <Joyride
      ref={joyrideRef}
      steps={steps}
      callback={handleJoyrideCallback}
      run={runTour}
      stepIndex={stepIndex}
      spotlightClicks={true}
    />
  );
};
