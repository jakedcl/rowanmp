type Props = {
  label?: string;
  note?: string;
  className?: string;
};

export function PhotoPlaceholder({
  label = "No photo",
  note,
  className = "",
}: Props) {
  return (
    <div
      className={`photo-placeholder absolute inset-0 ${className}`.trim()}
      role="img"
      aria-label={note ? `${label}. ${note}` : label}
    >
      <span className="photo-placeholder-label">{label}</span>
      {note ? <span className="photo-placeholder-note">{note}</span> : null}
    </div>
  );
}
