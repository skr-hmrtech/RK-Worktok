import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from 'react-spring';
import React from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animationType?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale';
}

export default function AnimatedSection({ 
  children, 
  className = '', 
  delay = 0,
  animationType = 'fadeIn'
}: AnimatedSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px 0px',
  });

  const getAnimationConfig = () => {
    switch (animationType) {
      case 'slideUp':
        return {
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0px)' : 'translateY(50px)',
        };
      case 'slideLeft':
        return {
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateX(0px)' : 'translateX(-50px)',
        };
      case 'slideRight':
        return {
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateX(0px)' : 'translateX(50px)',
        };
      case 'scale':
        return {
          opacity: inView ? 1 : 0,
          transform: inView ? 'scale(1)' : 'scale(0.8)',
        };
      default: // fadeIn
        return {
          opacity: inView ? 1 : 0,
        };
    }
  };

  const springs = useSpring<{ opacity: number; transform: string }>({
    ...getAnimationConfig(),
    config: { tension: 280, friction: 60 },
    delay: delay,
  });

  return (
    <animated.div ref={ref} style={springs} className={className}>
      {children}
    </animated.div>
  );
}