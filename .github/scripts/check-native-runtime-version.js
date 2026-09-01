const { execFileSync } = require('node:child_process')
const fs = require('node:fs')

const baseSha = process.argv[2]

if (!baseSha || /^0+$/.test(baseSha)) {
  console.log('No comparison commit is available; skipping the runtime version guard.')
  process.exit(0)
}

const readJsonAtCommit = (commit, file) =>
  JSON.parse(execFileSync('git', ['show', `${commit}:${file}`], { encoding: 'utf8' }))

const dependencyVersion = (packageJson, dependency) =>
  packageJson.dependencies?.[dependency] ?? packageJson.devDependencies?.[dependency]

const nativeRuntimeDependencies = [
  '@expo/config',
  '@expo/vector-icons',
  'babel-preset-expo',
  'expo',
  'expo-font',
  'expo-splash-screen',
  'expo-updates',
  'react',
  'react-dom',
  'react-native',
  'react-native-get-random-values',
  'react-native-reanimated',
  'react-native-safe-area-context',
  'react-native-screens',
  'react-native-worklets',
]

const previousPackage = readJsonAtCommit(baseSha, 'package.json')
const currentPackage = JSON.parse(fs.readFileSync('package.json', 'utf8'))

const changedRuntimeDependencies = nativeRuntimeDependencies.filter(
  (dependency) =>
    dependencyVersion(previousPackage, dependency) !==
    dependencyVersion(currentPackage, dependency)
)

if (changedRuntimeDependencies.length === 0) {
  console.log('No native runtime dependency versions changed.')
  process.exit(0)
}

const previousApp = readJsonAtCommit(baseSha, 'app.json')
const currentApp = JSON.parse(fs.readFileSync('app.json', 'utf8'))
const previousVersion = previousApp.expo.version
const currentVersion = currentApp.expo.version

if (previousVersion === currentVersion) {
  console.error(
    `Native runtime dependencies changed (${changedRuntimeDependencies.join(', ')}), ` +
      `but the Expo app version is still ${currentVersion}.`
  )
  console.error(
    'Increase expo.version in app.json so EAS Update cannot send incompatible JavaScript to the existing native runtime.'
  )
  process.exit(1)
}

console.log(
  `Native runtime dependencies changed (${changedRuntimeDependencies.join(', ')}).`
)
console.log(`Expo app version changed from ${previousVersion} to ${currentVersion}.`)
