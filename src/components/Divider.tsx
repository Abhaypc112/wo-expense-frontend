export function Divider({ children = 'or' }: { children?: string }) {
  return <div className="divider">{children}</div>;
}
