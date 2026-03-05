import { Variants } from 'framer-motion';

/**
 * Fades an element in while sliding it up from y+30.
 * Used as the standard entrance animation on all service pages.
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

/**
 * Wraps a group of children and staggers their entrance animations.
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

/**
 * Infinite up-and-down float animation.
 * Applied to tool/technology logo icons.
 */
export const bubbleAnimation: Variants = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};
