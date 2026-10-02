import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/** Decorative study-room frame around the record wall (CSS only). */
export function StudyRoom({ children }: Props) {
  return (
    <section className="study-room" aria-label="Record wall">
      <div className="study-room-glow" aria-hidden />
      <div className="study-room-window" aria-hidden>
        <div className="study-room-window-pane" />
        <div className="study-room-ivy" />
      </div>
      <div className="study-room-art study-room-art-a" aria-hidden />
      <div className="study-room-art study-room-art-b" aria-hidden />

      <div className="study-room-stage">{children}</div>

      <div className="study-desk" aria-hidden>
        <div className="study-desk-surface">
          <div className="study-vinyl-stack" />
          <div className="study-lamp" />
          <div className="study-turntable">
            <div className="study-platter" />
            <div className="study-arm" />
          </div>
          <div className="study-books">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}
