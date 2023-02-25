import { FC, Fragment } from 'react';

import cl from './highlight.module.scss';

interface HighlightProps {
  text: string;
  highlight: string;
}

export const Highlight: FC<HighlightProps> = ({ text, highlight }) => {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

  return (
    <Fragment>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span data-test-id='highlight-matches' key={part + String(index)} className={cl.highlight}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </Fragment>
  );
};
