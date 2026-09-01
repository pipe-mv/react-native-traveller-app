# Traveller App Architecture

## Overview

Traveller is an Expo and React Native application organized by feature. The structure keeps code
that changes for the same reason together while keeping application-wide configuration separate
from feature behavior.

The application uses React Navigation, NativeWind, and the Expo managed workflow. TypeScript is
being introduced gradually while existing JavaScript files continue to work alongside converted
files. Expo Router remains a possible future improvement.

## Directory structure

```text
.
├── App.js
├── assets/
└── src/
    ├── app/
    │   └── navigation/
    │       └── RootNavigator.js
    └── features/
        ├── home/
        │   └── screens/
        │       └── HomeScreen.js
        └── places/
            ├── api/
            │   └── placesApi.js
            ├── components/
            │   ├── CategorySelector.tsx
            │   ├── PlaceBookingDetails.tsx
            │   ├── PlaceCard.js
            │   └── PlaceMarketInfo.js
            └── screens/
                ├── DiscoverScreen.js
                └── PlaceDetailsScreen.js
```

## Responsibilities

### Application entry point

`App.js` is the Expo entry point. It loads required application-wide setup and renders the root
navigator. It should remain small and should not contain feature behavior.

### Application layer

`src/app` contains configuration that connects the whole application. At present,
`RootNavigator.js` owns the React Navigation container, stack navigator, safe-area provider, and
screen registration.

Navigation route names are part of the application's internal contract. Renaming a screen file
does not require renaming its route at the same time.

### Features

`src/features` contains user-facing capabilities. A feature owns the screens, components, API
functions, hooks, and models that belong to that capability.

- `home` owns the landing experience.
- `places` owns place search, category selection, result cards, and place details.

Code should remain inside its feature until another feature genuinely needs it. This prevents a
large generic shared directory from becoming difficult to understand.

### Assets

The root `assets` directory contains application images and Expo assets. It remains at the root
because Expo configuration references files there directly.

### Shared code

A `src/shared` directory should be introduced only when real cross-feature code exists. Suitable
examples include a configured HTTP client, common loading and error components, environment
configuration, or utilities used by multiple features.

## Dependency rules

The intended dependency direction is:

```text
App.js → src/app → src/features → feature API and components
```

- `App.js` may import from `src/app`.
- Application navigation may import feature screens.
- A feature may import its own API modules and components.
- Features should not import application navigation configuration.
- One feature should not directly reach into another feature's internal folders.
- Shared code must not depend on a feature.
- UI components should not call third-party APIs directly.

## Component and file naming

- Full-screen components end in `Screen`, such as `DiscoverScreen`.
- Components are named for their purpose, such as `PlaceCard`, rather than their visual container.
- API files describe the resource they access, such as `placesApi`.
- Folder and file names should describe the application domain rather than an implementation
  detail.

## Styling

NativeWind scans `App.js` and all supported source files below `src`. When source files move, the
`content` paths in `tailwind.config.js` must continue to include their new locations. After changing
those paths, restart Expo with a clean Metro cache:

```bash
npx expo start --clear
```

## State and data

- Keep short-lived interface state in the component that owns it.
- Put reusable feature behavior in a feature hook when it becomes large enough to justify one.
- Keep network requests in the feature's `api` directory.
- Avoid adding a global state library until state is genuinely shared across unrelated screens.
- Translate third-party API responses into application-owned models before allowing those models
  to spread throughout the UI.

API credentials must not be committed. Mobile bundles cannot safely conceal confidential API
keys, so confidential third-party requests should eventually pass through a controlled backend.

## Testing and verification

Before preparing a pull request:

1. Run the TypeScript check with `npm run typecheck`.
2. Run the automated test suite when tests are introduced.
3. Export the production bundles for Android, iOS, and web.
4. Test the main navigation and place-search flow on a simulator or physical device.

The current production export command is:

```bash
npx expo export --platform all --output-dir <temporary-directory> --clear
```

Generated export output must not be committed.

## Incremental roadmap

Architecture improvements should be implemented in small, behavior-preserving pull requests:

1. Extract place-loading behavior from `DiscoverScreen` into a feature hook.
2. Add application-owned place models and isolate third-party response details in the API layer.
3. Add loading, empty, and error components when they are reused.
4. Introduce tests around API transformations and feature behavior.
5. Continue introducing TypeScript gradually without combining it with unrelated behavior changes.
6. Evaluate Expo Router in a dedicated navigation migration if typed routes, universal links, and
   shareable place URLs become priorities.

Do not add architectural layers or dependencies only because they may be useful someday. Add them
when the application has a concrete requirement they solve.
