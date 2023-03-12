Seeing comes before words. It is seeing which establishes our place in the surrounding world; we explain that world with words. Paintings are often reproduced with words around them. It is hard to define exactly how the words [change] the image but undoubtedly they [do]. The image illustrates the sentence. - Ways of Seeing, John Berger

## No Context
No Context is an experimental site inviting users to enter a search. The Reddit API fetches an image connected to that search. Provided an image, users are asked to write about what they see. Thereafter, sentiment analysis is performed on the user's input, and the post's top comments. A link to the image's post is provided for users to understand the intended story behind the image.

<img width="600" alt="Screen Shot 2022-12-19 at 14 17 51 " src="https://user-images.githubusercontent.com/112890821/208502886-be282cc5-14ee-4ac7-800a-425572877c13.png">

## Technologies
- TypeScript
- React
- Node.js
- Express
- Google NLP API
- Reddit API
- Styled Components
- This Express app was structured to be hosted on serverless Vercel.

## Functionalities
- Numeric sentiment scores / magnitudes are translated to human friendly words.
```javascript
enum SentimentTranslation {
  POSITIVE = 'positive',
  NEUTRAL = 'neutral',
  NEGATIVE = 'negative',
  MARGINALLY = 'marginally',
  MODERATELY = 'moderately',
  VERY = 'very'
}

// translate numeric sentiment score
export const translateScore = (score: number) => {
  const negative = score < 0
  const positive = score > 0
  if (positive) {
    return SentimentTranslation.POSITIVE + ' 🙂'
  } else if (negative) {
    return SentimentTranslation.NEGATIVE + ' 🙁'
  } else {
    return SentimentTranslation.NEUTRAL + ' 😐'
  }
}

// translate numeric sentiment magnitude
export const translateMagnitude = (magnitude: number) => {
  // 0 <= magnitude <= 1
  if (magnitude >= 0 && magnitude <=0.25 ) {
    return SentimentTranslation.MARGINALLY
  } else if (magnitude >= 0.75) {
    return SentimentTranslation.VERY
  } else {
    return SentimentTranslation.MODERATELY
  }
}
```

## Future considerations
- Replace Reddit API with Stable Diffusion? Guess that prompt!
- Play with `filter: blur()`?

```
Joyfully built with Martin Grym.
```
