JourneyLog frontend module
==========================

This package provides the frontend to the JourneyLog software. The backend package can be found
[here](https://github.com/soulweaver91/journeylog-be).

Requirements
------------

- A recent version of Node.js
- A [Font Awesome 5 Pro](https://fontawesome.com/plans) license. Download their `pro-solid-svg-icons` package, extract
  the `package` folder inside that archive to `src/proprietary`, and rename it to match the archive name sans the
  version number (i.e. `fortawesome-pro-solid-svg-icons`). You might be able to substitute it with a free FA icon
  package with some work, but I haven't tried that out, so no guarantees there.
- `npm install`

Development
-----------

Quick guide:
- Create `.env.development` and `.env.production`, define `REACT_APP_API_URL` (API root URL) and `REACT_APP_URL_PREFIX`
  (deployment location subdirectory the files go to)
- Edit `homepage` in `package.json` to match your `REACT_APP_URL_PREFIX`
- `npm start`
- Start editing
  
Long guide: see `README-CRA.md`.

Deployment
----------

- `npm run build`
- Copy the entirety of `build/` to the target location
