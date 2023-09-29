import { type InputHTMLAttributes, useReducer } from 'react';

export type InputProps = {
  animate?: boolean;
} & InputHTMLAttributes<HTMLElement>;

const InputReducer = (state: InputState, value: string): InputState => {
  if (value) return InputState.Active;
  return InputState.Inactive;
};

const enum InputState {
  Initial,
  Active,
  Inactive,
}

export default function Input({
  className,
  placeholder,
  animate,
  ...props
}: InputProps) {
  const [animatePlaceholder, dispatch] = useReducer(
    InputReducer,
    InputState.Initial,
  );

  return (
    <div
      className={`input_wrapper flex flex-col ${
        animate ? 'pt-6' : ''
      } relative ${className ?? ''}`}
    >
      {animate && (
        <span
          className={`input_placeholder ${
            animatePlaceholder !== InputState.Initial
              ? animatePlaceholder === InputState.Active
                ? 'animate'
                : 'deanimate'
              : ''
          } absolute left-2 top-8 text-gray-200 text-opacity-50`}
        >
          {placeholder}
        </span>
      )}
      <input
        type="text"
        className={`bg-backgroundMain border-borderMain h-10 rounded-md border bg-opacity-20 px-2 text-gray-200 duration-500 hover:border-gray-400 focus-visible:border-gray-400 focus-visible:outline-none`}
        placeholder={animate ? undefined : placeholder}
        onChange={(e) => dispatch(e.currentTarget.value)}
        {...props}
      />

      <style jsx>{`
        .input_wrapper .input_placeholder.animate {
          animation: 0.5s forwards hover-up;
        }

        .input_wrapper .input_placeholder.deanimate {
          animation: 0.5s forwards hover-down;
        }

        @keyframes hover-up {
          0% {
            left: 0.5rem;
            top: 2rem;
            color: transparent;
          }

          100% {
            left: 0;
            top: 0;
            color: var(--fnt-m);
          }
        }

        @keyframes hover-down {
          0% {
            left: 0;
            top: 0;
          }

          100% {
            left: 0.5rem;
            top: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
