import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { useEffect, useState } from 'react';

export type SwitchButtonProps = {
  children: ReactNode[];
  onChose?: (
    chosen: number,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  chosen?: number;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function SwitchButton({
  children,
  className,
  onChose,
  chosen,
  ...props
}: SwitchButtonProps) {
  const [_chosen, setChosen] = useState(0);

  useEffect(() => {
    setChosen(chosen ?? 0);
  }, [chosen]);

  return (
    <div
      className={`relative grid w-max items-center overflow-hidden rounded-lg border border-borderMain bg-transparent text-fontMain ${
        className ?? ''
      }`}
      style={{ gridTemplateColumns: `repeat(${children.length},1fr)` }}
    >
      {children.map((child, idx) => {
        return (
          <button
            key={idx}
            className={`z-10 px-1 py-2`}
            onClick={(event) => {
              setChosen(idx);
              if (onChose) onChose(idx, event);
            }}
            {...props}
          >
            {child}
          </button>
        );
      })}
      <div
        className={`absolute left-0 h-full bg-backgroundMain duration-200`}
        style={{
          width: `${100 / children.length}%`,
          left: `${(100 / children.length) * _chosen}%`,
        }}
      ></div>
    </div>
  );
}
