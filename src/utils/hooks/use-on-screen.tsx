import { useState, useEffect, useCallback, useRef } from 'react';

export default function useOnScreen(): [
  boolean,
  (node: HTMLElement | null) => void,
] {
  const [isIntersecting, setIntersecting] = useState(false);
  const [observer, setObserver] = useState<IntersectionObserver>();
  const node = useRef<HTMLElement>();

  useEffect(() => {
    setObserver(
      new IntersectionObserver(([entry]) => {
        if (entry) setIntersecting(entry.isIntersecting);
      }),
    );
    return () => observer?.disconnect();
  }, []);

  const intersectSetter: (node: HTMLElement | null) => void = useCallback(
    (newNode) => {
      if (newNode === null) return;
      if (newNode === node.current) return;

      if (node.current) {
        observer?.unobserve(node.current);
      }

      node.current = newNode;
      observer?.observe(newNode);
    },
    [observer],
  );

  return [isIntersecting, intersectSetter];
}
