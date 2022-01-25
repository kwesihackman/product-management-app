import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

type ILoadingProps = {
  message?: string;
  action?: () => void;
  actionTitle?: string;
};

export const Loading = ({ message, action, actionTitle }: ILoadingProps) => {
  return (
    <div>
      <div>
        <Spinner animation="grow" variant="dark" />
      </div>
      <div>
        {message ? message : 'Loading...'}
        {action && actionTitle && (
          <button onClick={action}>{actionTitle}</button>
        )}
      </div>
    </div>
  );
};
