let x = -500;
let xValue = 300;
window.innerWidth >= 1000 ? (x = -500) : (x = -200);
window.innerWidth >= 1000 ? (xValue = 300) : (xValue = 100);
const FeaturedContainer = {
  hidden: {
    opacity: 0,
    x: x,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      delay: 0.2,
      type: "tween",
    },
  },
};
const PreviewContainer = {
  hidden: {
    opacity: 0,
    x: xValue,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      delay: 1,
      type: "string",
      bounce: 0.2,
    },
  },
};
const hoverFeatured = {
  scale: 1.005,
  transition: {
    duration: 0.2,
    type: "tween",
  },
};
const hoverPreview = {
  scale: 1.01,
  transition: {
    duration: 0.2,
    type: "tween",
  },
};
export { FeaturedContainer, PreviewContainer, hoverFeatured, hoverPreview };
