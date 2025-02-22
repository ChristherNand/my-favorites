import React, { useRef } from 'react';
import './Board.css';

import { KEY_CODES } from '../../../contans';
import Colors from '../../../utils/Colors';
import iBoard from '../../../interfaces/iBoard';
import { iTag } from '../../../interfaces';

const { ENTER } = KEY_CODES;

const BoardTags: React.FC<iBoard<iTag>> = ({
  className,
  Component,
  setOptions,
  options = [],
  isWrap = false,
  placeHolder = '',
}) => {
  const inputOptions = useRef<HTMLInputElement>(null);

  const addOption = (
    event: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const element = event.target as HTMLInputElement;

    if ((event as any).keyCode === ENTER && element.value !== '') {
      setOptions({ name: element.value, color: Colors.getRamdom() });
      if (inputOptions?.current) {
        inputOptions.current.value = '';
      }
    }
  };

  return (
    <div className={`board ${className} --flex ${isWrap ? '--wrap' : ''}`}>
      <input placeholder={placeHolder} onKeyDown={addOption} ref={inputOptions} data-test="input" />
      <div className="contOptions" data-test="container">
        {options.map((option, index) => (
          <Component key={`${index}-${className}`} {...option} data-test="element" />
        ))}
      </div>
    </div>
  );
};

export default BoardTags;
