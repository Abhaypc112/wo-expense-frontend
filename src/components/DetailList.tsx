export interface DetailItem {
  label: string;
  value: string | undefined;
}

export function DetailList({ items }: { items: DetailItem[] }) {
  return (
    <dl className="details">
      {items.map(({ label, value }) => (
        <div key={label} className="detail-row">
          <dt>{label}</dt>
          <dd>{value || '—'}</dd>
        </div>
      ))}
    </dl>
  );
}
