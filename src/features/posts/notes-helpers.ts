import { initialDistortions, Distortion } from "./notesSlice";
export const getUIDistortions = (backDistortions: string[]) => {
  return initialDistortions.map((dist) => {
    if (backDistortions.includes(dist.val)) {
      dist.checked = true;
    }
    return dist;
  });
};

export const getBackDistortions = (uiDistortions: Distortion[]) => {
  return uiDistortions
    .filter((dist) => dist.checked === true)
    .map((dist) => dist.val);
};
