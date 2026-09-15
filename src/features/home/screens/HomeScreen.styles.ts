import { StyleSheet, useWindowDimensions } from 'react-native'

export function useHomeScreenStyles() {
  const { width, height } = useWindowDimensions()
  const isCompact = width < 390 || height < 750
  const horizontalPadding = isCompact ? 20 : 24
  const logoSize = isCompact ? 56 : 64
  const heroWidth = Math.min(width + (isCompact ? 8 : 16), 430)
  const heroHeight = Math.min(heroWidth * 0.82, height * 0.43)
  const buttonSize = isCompact ? 76 : 96
  const buttonInnerSize = isCompact ? 64 : 80

  return StyleSheet.create({
    header: {
      gap: isCompact ? 12 : 16,
      marginTop: isCompact ? 20 : 32,
      paddingHorizontal: horizontalPadding,
    },
    logoContainer: {
      width: logoSize,
      height: logoSize,
    },
    logo: {
      width: logoSize + 16,
      height: logoSize + 16,
    },
    brandTitle: {
      fontSize: isCompact ? 26 : 30,
    },
    introduction: {
      gap: isCompact ? 6 : 12,
      marginTop: isCompact ? 16 : 32,
      paddingHorizontal: horizontalPadding,
    },
    introductionTitle: {
      fontSize: isCompact ? 30 : 42,
      lineHeight: isCompact ? 36 : 48,
    },
    introductionSubtitle: {
      fontSize: isCompact ? 28 : 38,
      lineHeight: isCompact ? 34 : 44,
    },
    description: {
      fontSize: isCompact ? 14 : 16,
      lineHeight: isCompact ? 19 : 22,
    },
    tealCircle: {
      width: width * 0.8,
      height: width * 0.8,
      bottom: isCompact ? 8 : 24,
      right: -width * 0.38,
    },
    orangeCircle: {
      width,
      height: width,
      bottom: -width * 0.18,
      left: -width * 0.38,
    },
    heroWindow: {
      width: heroWidth,
      height: heroHeight,
    },
    heroImage: {
      width: heroWidth,
      height: heroWidth * (364 / 347),
    },
    button: {
      width: buttonSize,
      height: buttonSize,
      bottom: isCompact ? 12 : 32,
    },
    buttonInner: {
      width: buttonInnerSize,
      height: buttonInnerSize,
    },
    buttonText: {
      fontSize: isCompact ? 30 : 36,
    },
  })
}
