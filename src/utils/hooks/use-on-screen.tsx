import { useState, useEffect, useCallback } from 'react';

export default function useOnScreen(): [
  boolean,
  (node: HTMLElement | null) => void,
] {
  const [isIntersecting, setIntersecting] = useState(false);
  const [observer, setObserver] = useState<IntersectionObserver>();

  useEffect(() => {
    setObserver(
      new IntersectionObserver(([entry]) => {
        if (entry) setIntersecting(entry.isIntersecting);
      }),
    );
  }, []);

  const intersectSetter: (node: HTMLElement | null) => void = useCallback(
    (node) => {
      if (node && observer) observer.observe(node);
    },
    [observer],
  );

  return [isIntersecting, intersectSetter];
}
