import type { Transition, Variants } from 'motion/react';

const transition: Transition = {
  duration: 0.35,
  ease: [0.23, 1, 0.32, 1],
};

export const pageVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

export const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition },
};

export const tabContentVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition },
  exit: { opacity: 0, y: -4, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } },
};
