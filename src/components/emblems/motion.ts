// While its paper (the `group` in RepresentativePaper) is hovered, an emblem acts out the paper.
// Hover variants never fire on touch screens, and `motion-safe` skips the motion for visitors who
// reduce it. The keyframes are in globals.css.

/** Dashes run from the start of the path to its end. */
export const flow = "motion-safe:group-hover:animate-emblem-flow";

/** An accent mark swells around its own centre. */
export const pulse = "origin-center [transform-box:fill-box] motion-safe:group-hover:animate-emblem-pulse";

/** An arrow leans the way it points. */
export const nudge = "motion-safe:group-hover:animate-emblem-nudge";
