const container = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: { type: "tween", duration: 0.4 },
  },
};
const containerInner = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.4,
      delay: 0.1,
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};
const item = {
  hidden: {
    y: -20,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "tween", duration: 0.2 },
  },
};
const hover = {
  scale: 1.05,
  transition: {
    duration: 0.2,
    type: "tween",
  },
};

export { container, containerInner, item, hover };
