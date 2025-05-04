// Converted to plain JSX

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion"
import useMeasure from "react-use-measure"
import { cn } from "../../lib/utils"

const springConfig = { stiffness: 200, damping: 30, bounce: 0.1 }

const ExpandableContext = createContext({
  isExpanded: false,
  toggleExpand: () => {},
  expandDirection: "vertical",
  expandBehavior: "replace",
  transitionDuration: 0.3,
  easeType: "easeInOut",
  initialDelay: 0,
})

const useExpandable = () => useContext(ExpandableContext)

const Expandable = React.forwardRef(({
  children,
  expanded,
  onToggle,
  transitionDuration = 0.3,
  easeType = "easeInOut",
  expandDirection = "vertical",
  expandBehavior = "replace",
  initialDelay = 0,
  onExpandStart,
  onExpandEnd,
  onCollapseStart,
  onCollapseEnd,
  ...props
}, ref) => {
  const [isExpandedInternal, setIsExpandedInternal] = useState(false)
  const isExpanded = expanded !== undefined ? expanded : isExpandedInternal
  const toggleExpand = onToggle || (() => setIsExpandedInternal(prev => !prev))

  useEffect(() => {
    if (isExpanded) {
      onExpandStart?.()
    } else {
      onCollapseStart?.()
    }
  }, [isExpanded, onExpandStart, onCollapseStart])

  const contextValue = {
    isExpanded,
    toggleExpand,
    expandDirection,
    expandBehavior,
    transitionDuration,
    easeType,
    initialDelay,
    onExpandEnd,
    onCollapseEnd,
  }

  return (
    <ExpandableContext.Provider value={contextValue}>
      <motion.div
        ref={ref}
        initial={false}
        animate={{
          transition: {
            duration: transitionDuration,
            ease: easeType,
            delay: initialDelay,
          },
        }}
        {...props}
      >
        {typeof children === "function" ? children({ isExpanded }) : children}
      </motion.div>
    </ExpandableContext.Provider>
  )
})

const ANIMATION_PRESETS = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "slide-up": {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  "slide-down": {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  "slide-left": {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  "slide-right": {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  rotate: {
    initial: { opacity: 0, rotate: -10 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: -10 },
  },
  "blur-sm": {
    initial: { opacity: 0, filter: "blur(4px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(4px)" },
  },
  "blur-md": {
    initial: { opacity: 0, filter: "blur(8px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(8px)" },
  },
  "blur-lg": {
    initial: { opacity: 0, filter: "blur(16px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(16px)" },
  },
}

const getAnimationProps = (preset, animateIn, animateOut) => {
  const defaultAnimation = { initial: {}, animate: {}, exit: {} }
  const presetAnimation = preset ? ANIMATION_PRESETS[preset] : defaultAnimation
  return {
    initial: presetAnimation.initial,
    animate: presetAnimation.animate,
    exit: animateOut?.exit || presetAnimation.exit,
  }
}

const ExpandableContent = React.forwardRef(({
  children,
  preset,
  animateIn,
  animateOut,
  stagger = false,
  staggerChildren = 0.1,
  keepMounted = false,
  ...props
}, ref) => {
  const { isExpanded, transitionDuration, easeType } = useExpandable();
  const [measureRef, { height: measuredHeight }] = useMeasure();
  const animatedHeight = useMotionValue(0);
  const smoothHeight = useSpring(animatedHeight, springConfig);
  
  // Add state to track if content has been measured
  const [hasMeasured, setHasMeasured] = useState(false);
  
  useEffect(() => {
    // Only update height after content has been measured
    if (measuredHeight > 0) {
      setHasMeasured(true);
    }
    
    if (isExpanded) {
      // Force immediate height update on first expansion
      if (!hasMeasured && measuredHeight > 0) {
        animatedHeight.set(measuredHeight);
      } else {
        animatedHeight.set(measuredHeight);
      }
    } else {
      animatedHeight.set(0);
    }
  }, [isExpanded, measuredHeight, animatedHeight, hasMeasured]);

  const animationProps = getAnimationProps(preset, animateIn, animateOut);

  return (
    <motion.div
      ref={ref}
      style={{ height: smoothHeight, overflow: "hidden" }}
      transition={{ duration: transitionDuration, ease: easeType }}
      {...props}
    >
      <AnimatePresence mode="sync" initial={false}>
        {(isExpanded || keepMounted) && (
          <motion.div
            ref={measureRef}
            initial={animationProps.initial}
            animate={animationProps.animate}
            exit={animationProps.exit}
            transition={{ duration: transitionDuration, ease: easeType }}
          >
            {stagger ? (
              <motion.div
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: staggerChildren } },
                }}
                initial="hidden"
                animate="visible"
              >
                {React.Children.map(children, (child, index) => (
                  <motion.div
                    key={index}
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  >
                    {child}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              children
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

const ExpandableCard = React.forwardRef(({
  children,
  className = "",
  collapsedSize = { width: "100%" },
  expandedSize = { width: 360, height: undefined },
  hoverToExpand = false,
  expandDelay = 0,
  collapseDelay = 0,
  ...props
}, ref) => {
  const { isExpanded, toggleExpand, expandDirection } = useExpandable()
  const [measureRef, { width, height }] = useMeasure()
  const animatedWidth = useMotionValue(collapsedSize.width || 0)
  const animatedHeight = useMotionValue(collapsedSize.height || 0)
  const smoothWidth = useSpring(animatedWidth, springConfig)
  const smoothHeight = useSpring(animatedHeight, springConfig)

  useEffect(() => {
    if (isExpanded) {
      animatedWidth.set(expandedSize.width || width)
      animatedHeight.set(expandedSize.height || height)
    } else {
      animatedWidth.set(collapsedSize.width || width)
      animatedHeight.set(collapsedSize.height || height)
    }
  }, [isExpanded, collapsedSize, expandedSize, width, height, animatedWidth, animatedHeight])

  const handleHover = () => {
    if (hoverToExpand && !isExpanded) {
      setTimeout(toggleExpand, expandDelay)
    }
  }

  const handleHoverEnd = () => {
    if (hoverToExpand && isExpanded) {
      setTimeout(toggleExpand, collapseDelay)
    }
  }

  return (
    <motion.div
      ref={ref}
      className={cn("cursor-pointer", className)}
      style={{
        width: expandDirection === "vertical" ? collapsedSize.width : smoothWidth,
        height: expandDirection === "horizontal" && isExpanded ? smoothHeight : "auto",
      }}
      transition={springConfig}
      onHoverStart={handleHover}
      onHoverEnd={handleHoverEnd}
      {...props}
    >
      <div
        className={cn(
          "grid grid-cols-1 rounded-lg sm:rounded-xl md:rounded-[2rem]",
          "shadow-[inset_0_0_1px_1px_#ffffff4d] sm:shadow-[inset_0_0_2px_1px_#ffffff4d]",
          "ring-1 ring-black/5",
          "max-w-[calc(100%-1rem)] sm:max-w-[calc(100%-2rem)] md:max-w-[calc(100%-4rem)]",
          "mx-auto w-full",
          "transition-all duration-300 ease-in-out"
        )}
      >
        <div className="grid grid-cols-1 rounded-lg sm:rounded-xl md:rounded-[2rem] p-1 sm:p-1.5 md:p-2 shadow-md shadow-black/5">
          <div className="rounded-md bg-white p-2 shadow-sm ring-1 ring-gray-300">
            <div className="w-full h-full overflow-hidden">
              <div ref={measureRef} className="flex flex-col h-full">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
})
ExpandableCard.displayName = "ExpandableCard"

const ExpandableTrigger = React.forwardRef(({ children, ...props }, ref) => {
  const { toggleExpand } = useExpandable()
  return (
    <div ref={ref} onClick={toggleExpand} className="cursor-pointer" {...props}>
      {children}
    </div>
  )
})
ExpandableTrigger.displayName = "ExpandableTrigger"

const ExpandableCardHeader = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1 p-3", className)} {...props}>
    <motion.div layout className="w-full">
      {children}
    </motion.div>
  </div>
))
ExpandableCardHeader.displayName = "ExpandableCardHeader"

const ExpandableCardContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("p-3 pt-0 overflow-hidden flex-grow text-sm", className)} {...props}>
    <motion.div layout>{children}</motion.div>
  </div>
))
ExpandableCardContent.displayName = "ExpandableCardContent"

const ExpandableCardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-3 pt-0", className)} {...props} />
))
ExpandableCardFooter.displayName = "ExpandableCardFooter"

export {
  Expandable,
  useExpandable,
  ExpandableCard,
  ExpandableContent,
  ExpandableContext,
  ExpandableTrigger,
  ExpandableCardHeader,
  ExpandableCardContent,
  ExpandableCardFooter,
}
