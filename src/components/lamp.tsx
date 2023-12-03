import { useMutation, useQuery, useConvexAuth } from 'convex/react';
import type { Doc, Id } from '../../convex/_generated/dataModel';
import { api } from '../../convex/_generated/api';

function Alert({ lampId }: { lampId: Id<'lamps'> }) {
  const addStockAlert = useMutation(api.alerts.add);
  const alert = useQuery(api.alerts.check, {
    lampId: lampId,
  });
  const removeStockAlert = useMutation(api.alerts.remove);

  return alert?._id ? (
    <button onClick={() => removeStockAlert({ alertId: alert._id })}>
      Remove Stock Alert
    </button>
  ) : (
    <button onClick={() => addStockAlert({ lampId: lampId })}>
      Add Stock Alert
    </button>
  );
}

export function Lamp({ lamp }: { lamp: Doc<'lamps'> }) {
  const { isAuthenticated } = useConvexAuth();
  const buylamp = useMutation(api.lamps.purchase);

  return (
    <li key={lamp._id}>
      <img src={lamp.image} alt={lamp.name} />
      <h2>{lamp.name}</h2>
      <p>{lamp.description}</p>
      <p className="price">{lamp.price} gold</p>
      {lamp.inventory > 0 || !isAuthenticated ? (
        <button
          onClick={() => buylamp({ _id: lamp._id })}
          disabled={lamp.inventory < 1}
          aria-live="polite"
        >
          {lamp.inventory < 1 ? 'Sold Out' : 'Buy'}
        </button>
      ) : null}

      {lamp.inventory <= 5 && lamp.inventory > 0 ? (
        <p className="low-stock-alert">only {lamp.inventory} left in stock!</p>
      ) : null}

      {lamp.inventory < 1 ? (
        <>
          <p className="low-stock-alert unavailable">Out of stock!</p>
          {isAuthenticated ? <Alert lampId={lamp._id} /> : null}
        </>
      ) : null}
    </li>
  );
}
