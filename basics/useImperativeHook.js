/**
 * useImperativeHandle Hook
 * 
 * Purpose:
 * - Allows child components to expose specific functions/values to parent components
 * - Gives more control over what is exposed through ref
 * - Helps maintain encapsulation while still allowing parent-child communication
 * 
 * Use cases:
 * 1. Exposing specific DOM methods (focus, scroll etc)
 * 2. Exposing custom methods to parent
 * 3. When you want to limit what parent can access
 * 
 * Syntax:
 * useImperativeHandle(ref, createHandle, [dependencies])
 */

// Example: Video Player with Play/Pause/Reset controls exposed to parent
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';

// Child Component - Video Player
const VideoPlayer = forwardRef((props, ref) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Expose specific methods to parent
  useImperativeHandle(ref, () => ({
    play: () => {
      videoRef.current.play();
      setIsPlaying(true);
      console.log("isPlaying", isPlaying);
    },
    pause: () => {
      videoRef.current.pause();
      setIsPlaying(false);
      console.log("isPlaying", isPlaying);
    },
    reset: () => {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
      setIsPlaying(false);
      console.log("isPlaying", isPlaying);
      console.log("currentTime", videoRef.current.currentTime);
    }
  }));

  return (
    <video 
      ref={videoRef}
      src={props.videoUrl} 
      style={{ width: '100%', maxWidth: '500px' }}
    />
  );
});

// Parent Component
const VideoController = () => {
  // Create ref to access child methods
  const videoPlayerRef = useRef(null);

  const handlePlay = () => {
    videoPlayerRef.current.play();
  };

  const handlePause = () => {
    videoPlayerRef.current.pause();
  };

  const handleReset = () => {
    videoPlayerRef.current.reset();
  };

  return (
    <div>
      <VideoPlayer 
        ref={videoPlayerRef}
        videoUrl="https://example.com/sample-video.mp4"
      />
      
      <div style={{ marginTop: '10px' }}>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default VideoController;

/**
 * Key Points:
 * 
 * 1. forwardRef is required to use refs with functional components
 * 
 * 2. useImperativeHandle takes 3 arguments:
 *    - ref from parent
 *    - callback returning object with exposed methods
 *    - dependencies array (optional)
 * 
 * 3. Only exposed methods will be available to parent
 *    Parent can't access other methods/state directly
 * 
 * 4. This pattern should be used sparingly
 *    Prefer prop-based communication when possible
 * 
 * 5. Great for cases where prop-based solutions would be cumbersome
 *    (like managing focus, scroll positions, or media playback)
 */
