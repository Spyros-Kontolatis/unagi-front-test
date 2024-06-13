import React, { useState } from 'react';

import { fetchCollection } from '../lib/collection';
import { format } from 'date-fns';
import constructImageUrl from '../lib/constructImageUrl';
import BaseCard from '../components/BaseCard';

export const Collection = () => {
  const [loading, setLoading] = useState(false);
  const collection = fetchCollection();
  const card = collection[0];

  return (
    <BaseCard
      imageUrl={constructImageUrl(card.id)}
      title={`${card.player.firstname} ${card.player.lastname}`}
      subtitle={format(card.player.birthday, 'PP')}
      action={{
        label: 'BUY',
        handler: () => {},
      }}
      loading={loading}
      size="sm"
    />
  );
};
