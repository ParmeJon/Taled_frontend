import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';

const Cable = ({ requestfeeds, handleReceivedFriendship }) => {
  return (
    <Fragment>
      {requestfeeds.map(requestfeed => {
        return (
          <ActionCable
            key={requestfeed.id}
            channel={{ channel: 'FriendshipsChannel', requestfeed: requestfeed.id }}
            onReceived={handleReceivedFriendship}
          />
        );
      })}
    </Fragment>
  );
};

export default Cable;
