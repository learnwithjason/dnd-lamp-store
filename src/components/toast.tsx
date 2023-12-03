import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export function Toast() {
  const alerts = useQuery(api.alerts.active);

  return alerts?.map((alert) => (
    <div className="toast">{alert?.lamp?.name} is back in stock!</div>
  ));
}
