import { useCallback, useRef, useState } from "react";
import { ParticipantView, useCallStateHooks } from "@stream-io/video-react-sdk";

const MIN_LOCAL_WIDTH = 140;
const MAX_LOCAL_WIDTH = 480;
const DEFAULT_LOCAL_WIDTH = 192; 

const CustomCallLayout = () => {
  const { useParticipants, useLocalParticipant } = useCallStateHooks();
  const participants = useParticipants();
  const localParticipant = useLocalParticipant();

  const remoteParticipant = localParticipant
    ? participants.find((p) => p.sessionId !== localParticipant.sessionId)
    : undefined;

  const [localWidth, setLocalWidth] = useState(DEFAULT_LOCAL_WIDTH);
  const dragState = useRef(null); 

  const handleResizeStart = useCallback(
    (e) => {
      e.preventDefault();
      dragState.current = {
        startX: e.clientX,
        startY: e.clientY,
        startWidth: localWidth,
      };

      const handleMouseMove = (moveEvent) => {
        if (!dragState.current) return;
        const deltaX = dragState.current.startX - moveEvent.clientX;
        const deltaY = dragState.current.startY - moveEvent.clientY;
        const delta = Math.max(deltaX, deltaY);
        const newWidth = Math.min(
          MAX_LOCAL_WIDTH,
          Math.max(MIN_LOCAL_WIDTH, dragState.current.startWidth + delta)
        );
        setLocalWidth(newWidth);
      };

      const handleMouseUp = () => {
        dragState.current = null;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [localWidth]
  );

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black [&_video]:object-cover [&_video]:w-full [&_video]:h-full">
      <div className="relative w-full h-full max-w-4xl rounded-2xl overflow-hidden bg-neutral-900 shadow-xl">
        {remoteParticipant ? (
          <ParticipantView participant={remoteParticipant} trackType="videoTrack" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/60">
            در انتظار طرف مقابل...
          </div>
        )}
      </div>

      {localParticipant && (
        <div
          style={{ width: localWidth }}
          className="absolute bottom-6 right-6 aspect-video rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 z-10 select-none"
        >
          <ParticipantView participant={localParticipant} trackType="videoTrack" />

          <div
            onMouseDown={handleResizeStart}
            className="absolute top-0 left-0 w-5 h-5 cursor-nwse-resize z-20 flex items-start justify-start p-0.5"
            title="برای تغییر اندازه بکش"
          >
            <div className="w-2.5 h-2.5 border-t-2 border-l-2 border-white/70 rounded-tl-sm" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomCallLayout;