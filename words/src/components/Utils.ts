import React from 'react'

// FIX TYPES: We want this to return React.MutableRefObject<HTMLDivElement>
export function useChatScroll<T>(dep: T): any {
  const ref = React.useRef<HTMLDivElement>();
  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);
  return ref;
}
