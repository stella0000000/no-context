import { useEffect, useRef } from "react";

// FIX TYPES: We want this to return React.MutableRefObject<HTMLDivElement>
export function useChatScroll<T>(dep: T): any {
  const ref = useRef<HTMLDivElement>();
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);
  return ref;
}

enum SentimentTranslation {
  POSITIVE = 'positive',
  NEUTRAL = 'neutral',
  NEGATIVE = 'negative',
  MARGINALLY = 'marginally',
  MODERATELY = 'moderately',
  EXCEPTIONALLY = 'exceptionally'
}

// translate numeric sentiment score
export const translateScore = (score: number) => {
  const negative = score < 0
  const positive = score > 0
  if (positive) {
    return 'positive'
  } else if (negative) {
    return 'negative'
  } else {
    return 'neutral'
  }
}

// translate numeric sentiment magnitude
export const translateMagnitude = (magnitude: number) => {
  // 0 <= magnitude <= 1
  if (magnitude >= 0 && magnitude <=0.25 ) {
    return 'marginally'
  } else if (magnitude >= 0.75) {
    return 'very'
  } else {
    return 'moderately'
  }
}

// format sentiment text CSS
// connotations to format text highlight color
// magnitude to format text size
// return or break?
export const formatSentiment = (value: string) => {
  switch(value) {
    case SentimentTranslation.POSITIVE:
      return 'green'
    case SentimentTranslation.NEUTRAL:
      return 'yellow'
    case SentimentTranslation.NEGATIVE:
      return 'red'
    case SentimentTranslation.MARGINALLY:
      return 17
    case SentimentTranslation.MODERATELY:
      return
    case SentimentTranslation.EXCEPTIONALLY:
      return 25
  }
}