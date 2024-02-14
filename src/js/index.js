import { gameElement, returnButtonElement } from "./dom";
import { handleGameClick, handleReturnButtonClick } from "./game-functions";




gameElement.addEventListener('click', handleGameClick);
returnButtonElement.addEventListener('click', handleReturnButtonClick);
