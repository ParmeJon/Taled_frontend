import React from 'react';
import NewFriendshipForm from './NewFriendshipForm';

const FriendshipsArea = ({
  requestfeed: { id, title, friendships },
}) => {
  return (
    <div className="friendshipsArea">
      <h2>{title}</h2>
      <ul>{orderedFriendships(friendships)}</ul>
      <NewFriendshipForm requestfeed_id={id} />
    </div>
  );
};

export default FriendshipsArea;

// helpers

const orderedFriendships = friendships => {
  const sortedFriendships = friendships.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );
  return sortedFriendships.map(friendship => {
    return <li key={friendship.id}>{`${friendship.approve_status}`}</li>;
  });
};
